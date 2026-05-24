from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

OPENROUTER_API_KEY = os.getenv(
    "OPENROUTER_API_KEY"
)

@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json()

        msg = data.get(
            "message",
            ""
        )

        response = requests.post(

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

                        "content":"""
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

        result =
        response.json()

        reply = (
            result
            .get(
                "choices",
                [{}]
            )[0]
            .get(
                "message",
                {}
            )
            .get(
                "content",
                "...signal lost..."
            )
        )

        return jsonify({

            "reply":
            reply

        })

    except Exception as e:

        return jsonify({

            "reply":
            str(e)

        })


if __name__ == "__main__":
    app.run()
