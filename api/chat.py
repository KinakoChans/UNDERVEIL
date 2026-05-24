import json
import requests
import os

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

def handler(request):

    body = request.get_json(silent=True) or {}
    user_message = body.get("message", "")

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "qwen/qwen3-coder:free",
        "messages": [
            {
                "role": "system",
                "content": "You are EMELY UNDERVEIL AI."
            },
            {
                "role": "user",
                "content": user_message
            }
        ]
    }

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers=headers,
        json=payload
    )

    result = response.json()
    reply = result["choices"][0]["message"]["content"]

    return {
        "statusCode": 200,
        "body": json.dumps({"reply": reply})
    }
