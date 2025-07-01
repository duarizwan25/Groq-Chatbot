import os
import requests
from dotenv import load_dotenv
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Load the .env
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("Missing API key")

@csrf_exempt
def chat_api(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            user_message = body.get("message", "")

            if not user_message:
                return JsonResponse({"error": "No message provided"}, status=400)

            headers = {
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json",
            }

            data = {
                "model": "llama3-8b-8192",
                "messages": [{"role": "user", "content": user_message}]
            }

            response = requests.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers=headers,
                json=data
            )

            if response.status_code != 200:
                return JsonResponse({
                    "error": f"Groq API error: {response.status_code}",
                    "details": response.text
                }, status=500)

            result = response.json()
            reply = result["choices"][0]["message"]["content"]
            return JsonResponse({"reply": reply})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)
