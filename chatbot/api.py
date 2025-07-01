import requests
import os
groq_api_key = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

def get_groq_response(message):
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json",
    }

    data = {
    "model": "llama3-8b-8192",  # or other valid model
    "messages": [
        {"role": "user", "content": message}
    ],
    "temperature": 0.7
}


    response = requests.post(GROQ_API_URL, json=data, headers=headers)
    response.raise_for_status()
    return response.json()['choices'][0]['message']['content']
