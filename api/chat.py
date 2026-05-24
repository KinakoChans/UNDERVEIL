from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)


@app.route("/", methods=["POST"])
def handler():

    try:

        msg = request.json.get(
            "message",
            ""
        )

        response = requests.post(

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

                        "content":
                        msg

                    }

                ]

            }

        )

        data = response.json()

        reply = (
            data
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


app = app
