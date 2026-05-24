from flask import request, jsonify
import requests
import os

OPENROUTER_API_KEY = os.getenv(
    "OPENROUTER_API_KEY"
)

@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    msg = data.get("message","")

    try:

        r = requests.post(

            "https://openrouter.ai/api/v1/chat/completions",

            headers={

                "Authorization":
                f"Bearer {OPENROUTER_API_KEY}",

                "Content-Type":
                "application/json"

            },

            json={

                "model":
                "qwen/qwen3-coder:free",

                "messages":[

                    {
                        "role":"system",

                        "content":
                        """
You are EMELY.

Speak naturally.
Retro underground atmosphere.
Short responses.
"""
                    },

                    {
                        "role":"user",
                        "content":msg
                    }

                ]

            }

        )

        data = r.json()

        reply = (
            data["choices"][0]
            ["message"]
            ["content"]
        )

        return jsonify({
            "reply": reply
        })

    except Exception:

        return jsonify({

            "reply":
            "[ SYSTEM ] Connection failed"

        })
