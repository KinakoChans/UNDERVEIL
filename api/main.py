from http.server import BaseHTTPRequestHandler
import json
import requests
import os

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

class handler(BaseHTTPRequestHandler):

    def do_POST(self):

        length = int(self.headers.get('content-length'))
        body = self.rfile.read(length)
        data = json.loads(body)

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

        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()

        self.wfile.write(json.dumps({
            "reply": reply
        }).encode())
