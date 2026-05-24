from http.server import BaseHTTPRequestHandler
import json
import requests
import os


class handler(BaseHTTPRequestHandler):

    def do_POST(self):

        try:

            length = int(
                self.headers[
                    "Content-Length"
                ]
            )

            body = self.rfile.read(
                length
            )

            data = json.loads(
                body
            )

            msg = data.get(
                "message",
                ""
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

                            "content":
                            msg

                        }

                    ]

                }

            )

            reply = (
                r
                .json()
                ["choices"][0]
                ["message"]
                ["content"]
            )

            self.send_response(
                200
            )

            self.send_header(
                "Content-Type",
                "application/json"
            )

            self.end_headers()

            self.wfile.write(

                json.dumps({

                    "reply":
                    reply

                }).encode()

            )

        except Exception as e:

            self.send_response(
                500
            )

            self.end_headers()

            self.wfile.write(

                str(e)
                .encode()

            )
