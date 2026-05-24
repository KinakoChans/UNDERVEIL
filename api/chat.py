from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

@app.route("/", methods=["POST"])

def handler():

    msg = (
        request
        .json
        .get(
            "message",
            ""
        )
    )

    r = requests.post(

        "https://openrouter.ai/api/v1/chat/completions",

        headers={

            "Authorization":
            f"Bearer {os.getenv('OPENROUTER_API_KEY')}",

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
                    "You are EMELY."

                },

                {

                    "role":"user",

                    "content":msg

                }

            ]

        }

    )

    data =
    r.json()

    return jsonify({

        "reply":
        data["choices"][0]["message"]["content"]

    })

app = app
