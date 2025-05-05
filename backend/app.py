from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "")
    headers = {
        "Authorization": f"Bearer {os.getenv('HF_TOKEN')}"
    }
    data = {
        "inputs": user_message
    }

    try:
        response = requests.post(
            "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
            headers=headers,
            json=data
        )
        result = response.json()
        reply = result[0]['generated_text'] if isinstance(result, list) else "Sorry, no reply."
    except Exception as e:
        reply = "Error talking to AI."

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run()