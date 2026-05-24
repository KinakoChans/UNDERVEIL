from flask import Flask, request, jsonify
from flask_cors import CORS

import requests
import os

app = Flask(__name__)
CORS(app)

# =========================
# OPENROUTER API KEY
# =========================

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# =========================
# CHAT ROUTE
# =========================

@app.route("/chat", methods=["POST"])
def chat():

    data = request.json

    user_message = data.get("message", "")

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "qwen/qwen3-coder:free",

        "messages": [
            {
                "role": "system",
                "content":
                "You are EMELY, a mysterious underground AI entity inside UNDERVEIL timeline."
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

    ai_reply = result["choices"][0]["message"]["content"]

    return jsonify({
        "reply": ai_reply
    })

# =========================
# RUN
# =========================

if __name__ == "__main__":
    app.run(debug=True)
