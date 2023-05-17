# -*- coding: utf-8 -*-
import sys
import os
import json
import re
import nltk
import pickle
import numpy as np
import pandas as pd
import requests
import tensorflow as tf
from nltk.corpus import stopwords
from nltk.corpus import wordnet
nltk.download('stopwords')
nltk.download('wordnet')
from itertools import groupby
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.utils import pad_sequences, to_categorical
from tensorflow.keras import Sequential
from tensorflow.keras.models import load_model, Model
from tensorflow.keras.layers import Embedding, Dense, Flatten, LSTM, GRU, GlobalAveragePooling1D, Bidirectional, Dropout, BatchNormalization, Input, Conv2D, MaxPool2D, Reshape
from tensorflow.keras.callbacks import EarlyStopping
from sklearn.model_selection import train_test_split

# load label, tokenizer with max_len, and models
label_dict = {'istj': 0, 'isfj': 1, 'infj': 2, 'intj': 3, 'istp': 4, 'isfp': 5, 'infp': 6, 'intp': 7,
              'estp': 8, 'esfp': 9, 'enfp': 10, 'entp': 11, 'estj': 12, 'esfj': 13, 'enfj': 14, 'entj': 15}
with open('pyfile/model/tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)
max_len = 4491
word_index = tokenizer.word_index
class TransformerBlock(tf.keras.layers.Layer):
    def __init__(self, embed_dim, num_heads, ff_dim, rate=0.1, **kwargs):
        super(TransformerBlock, self).__init__(**kwargs)
        self.embed_dim = embed_dim
        self.num_heads = num_heads
        self.ff_dim = ff_dim
        self.rate = rate
        self.att = tf.keras.layers.MultiHeadAttention(num_heads=num_heads, key_dim=embed_dim)
        self.ffn = tf.keras.Sequential([tf.keras.layers.Dense(ff_dim, activation="relu"), tf.keras.layers.Dense(embed_dim),])
        self.layernorm1 = tf.keras.layers.LayerNormalization(epsilon=1e-6)
        self.layernorm2 = tf.keras.layers.LayerNormalization(epsilon=1e-6)
        self.dropout1 = tf.keras.layers.Dropout(rate)
        self.dropout2 = tf.keras.layers.Dropout(rate)
    def call(self, inputs, training):
        attn_output = self.att(inputs, inputs)
        attn_output = self.dropout1(attn_output, training=training)
        out1 = self.layernorm1(inputs + attn_output)
        ffn_output = self.ffn(out1)
        ffn_output = self.dropout2(ffn_output, training=training)
        return self.layernorm2(out1 + ffn_output)
    def get_config(self):
        config = super(TransformerBlock, self).get_config()
        config.update({'embed_dim': self.embed_dim, 'num_heads': self.num_heads, 'ff_dim': self.ff_dim, 'rate': self.rate})
        return config
model = load_model('pyfile/model/model_conv_transformer_v5.h5', custom_objects={"TransformerBlock": TransformerBlock})
# model.summary()
# print("Done.")

# 모델 활용시 필요한 함수 정의
# 전처리 함수
def synonym_substitution(word):
    synsets = wordnet.synsets(word)
    if synsets:
        synonyms = [syn.lemmas()[0].name() for syn in synsets]
        substituted_words = [syn for syn in synonyms if syn != word]
        if substituted_words:
            return substituted_words[0]  # Return the first substituted word
    return None  # Return None if no synonym found

def preprocess_date(line):
    pattern = r'-{15}.*-{15}'
    return re.sub(pattern, '', line) 

def preprocess_text_v5(texts, labels=None, augmentation_ratio=0.1, max_augmented_words=3, mode='augmentation'):
    texts = texts.apply(lambda x: re.sub(r'@\w+\s?', '', x))  # remove usernames
    texts = texts.apply(lambda x: re.sub(r'https?:\/\/\S+', '', x))  # remove links
    texts = texts.apply(lambda x: x.lower())  # convert to lowercase
    if(mode=='augmentation'):
        augmented_texts = []
        augmented_labels = []
        for text, label in zip(texts, labels):
            words = text.split()
            num_augmented_words = min(int(len(words) * augmentation_ratio), max_augmented_words)
            augmented_indices = np.random.choice(len(words), num_augmented_words, replace=False)
            augmented_words = [synonym_substitution(words[i]) for i in augmented_indices]
            augmented_sentence = ' '.join([augmented_words[i % len(augmented_words)] if (i in augmented_indices and augmented_words[i % len(augmented_words)] is not None) else word for i, word in enumerate(words)])
            augmented_texts.append(augmented_sentence)
            augmented_labels.append(label)
        texts = texts.tolist() + augmented_texts
        labels = labels + augmented_labels
        texts = pd.Series(texts).apply(lambda x: re.findall(r'\b\w+\b', x))  # split into individual words
        return texts, labels
    else:
        texts = pd.Series(texts).apply(lambda x: re.findall(r'\b\w+\b', x))  # split into individual words
        return texts

# 한->영 함수
def translate_text(text, source_language='ko', target_language='en'):
    url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl={}&tl={}&dt=t&q={}'
    response = requests.get(url.format(source_language, target_language, text)).json()
    try:
        translation = response[0][0][0]
    except (IndexError, TypeError):
        print(f"Translation failed for text: {text}")
        translation = ""
    return translation

# 텍스트 -> mbti 함수
def predict_mbti(text):
    texts = preprocess_text_v5(texts=pd.Series([text]), labels=None, mode='None')
    sequences = tokenizer.texts_to_sequences(texts)
    padded_sequences = pad_sequences(sequences, maxlen=max_len)
    prediction = model.predict(padded_sequences, verbose=0)[0]
    labels = label_dict.keys()
    result = {label: prediction[idx] for idx, label in enumerate(labels)}
    return result

# 카카오톡 대화파일 -> 사용자별 mbti 함수
def predict_mbti_kakaotalk(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    os.remove(filename)
    # Remove date and time information
    pattern = r'^\d{4}-\d{2}-\d{2}, \d{1,2}:\d{2} [APap][Mm] - '
    lines = [re.sub(pattern, '', line) for line in lines]
    lines = [preprocess_date(line) for line in lines]
        
    # Get chat room name and saved date
    chat_room_name = lines[0].strip()
    saved_date = lines[1].strip()
    # print(f"Chat Room: {chat_room_name}, Saved Date: {saved_date}")

    # Group messages by user
    user_messages = {}
    current_user = None
    pattern = r'^\[(.*?)\] '  # [사용자명] 패턴
    time_pattern = r'\[(오전|오후)\s\d+:\d+\]\s'
    for line in lines[2:]:
        user_match = re.search(pattern, line)
        if user_match:
            current_user = user_match.group(1)
            if current_user not in user_messages:
                user_messages[current_user] = []
            # Add message after user name
            message = re.sub(pattern, '', line).strip()
            message = re.sub(time_pattern, '', message) 
            user_messages[current_user].append(message)
        elif current_user is not None and line.strip() != '':
            # Append message to previous user
            user_messages[current_user][-1] += ' ' + re.sub(time_pattern, '', line.strip())  

            
    # Translate and predict MBTI for each user
    mbti_results = {}
    for user, messages in user_messages.items():       
        translated_messages = [translate_text(message) for message in messages]
        prediction = predict_mbti(' '.join(translated_messages))
        top_k = sorted(prediction.items(), key=lambda x: x[1], reverse=True)[:]
        mbti_results[user] = top_k
    data = {}
    # Print MBTI results by user
    for user, results in mbti_results.items():
        data[user] = str(results)
    print(json.dumps(data))
        # print(f"{user}: {results}")
input_path = sys.argv[1]
predict_mbti_kakaotalk(input_path)