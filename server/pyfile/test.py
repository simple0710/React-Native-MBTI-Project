import sys

import requests

def translate_text(text, source_language='ko', target_language='en'):
    url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl={}&tl={}&dt=t&q={}'
    response = requests.get(url.format(source_language, target_language, text)).json()
    try:
        translation = response[0][0][0]
    except (IndexError, TypeError):
        # print(f"Translation failed for text: {text}")
        translation = ""
    return translation

input_string = sys.argv[1]
print(translate_text(input_string))