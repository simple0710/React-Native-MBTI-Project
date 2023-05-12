# -*- coding: utf-8 -*-
import sys
import re
import nltk 
import numpy as np # done
import pandas as pd 
import requests
# import pickle5 as pickle

from nltk.corpus import stopwords
nltk.download('stopwords')
from itertools import groupby
import tensorflow as tf
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
with open('./models/tokenizer.pickle', 'rb') as handle:
    # tokenizer = pickle.load(handle)
    tokenizer = handle

max_len = 4491
word_index = tokenizer.word_index
model = load_model('./models/model_conv_net.h5')
model.summary()
# print("Done.")

# 모델 활용시 필요한 함수 정의
# 전처리 함수
def preprocess_date(line):
    pattern = r'-{15}.*-{15}'
    return re.sub(pattern, '', line) 

def preprocess_text(texts):
    stop_words = set(stopwords.words('english'))    
    texts = texts.apply(lambda x: re.sub(r'@\w+\s?', '', x)) # remove usernames
    texts = texts.apply(lambda x: re.sub(r'https?:\/\/\S+', '', x)) # remove links
    texts = texts.apply(lambda x: x.lower()) # convert to lowercase
    texts = texts.apply(lambda x: re.findall(r'\b\w+\b', x)) # split into individual words     
    # texts = texts.apply(lambda x: [word for word in x if word not in stop_words]) # remove stop words
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
    texts = preprocess_text(pd.Series([text]))
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

    # Remove date and time information
    pattern = r'^\d{4}-\d{2}-\d{2}, \d{1,2}:\d{2} [APap][Mm] - '
    lines = [re.sub(pattern, '', line) for line in lines]
    lines = [preprocess_date(line) for line in lines]
    
    # Get chat room name and saved date
    chat_room_name = lines[0].strip()
    saved_date = lines[1].strip()
    print(f"Chat Room: {chat_room_name}, Saved Date: {saved_date}")

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
            message = re.sub(time_pattern, '', message)  # Remove time information
            user_messages[current_user].append(message)
        elif current_user is not None and line.strip() != '':
            # Append message to previous user
            user_messages[current_user][-1] += ' ' + re.sub(time_pattern, '', line.strip())  # Remove time information

    # Translate and predict MBTI for each user
    mbti_results = {}
    for user, messages in user_messages.items():
        # print(f"\nProcessing messages for user: {user}")
        # print(f"Messages: {messages}")
        translated_messages = [translate_text(message) for message in messages]
        prediction = predict_mbti(' '.join(translated_messages))
        top_k = sorted(prediction.items(), key=lambda x: x[1], reverse=True)[:]
        mbti_results[user] = top_k

    # Print MBTI results by user
    for user, results in mbti_results.items():
        print(f"{user}: {results}") 

input_path = sys.argv[1]
predict_mbti_kakaotalk(f"../{input_path}")