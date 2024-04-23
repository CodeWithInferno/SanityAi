from flask import Flask, request, jsonify
from flask_cors import CORS
from g4f.client import Client

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/image', methods=['POST'])
def generate_image():
    prompt = request.json.get('message')
    client = Client(browser_executable_path='/usr/bin/chromium-browser')
    response = client.images.generate(model="gpt-4", prompt=prompt)
    image_url = response.data[0].url
    return jsonify({'imageUrl': image_url})

if __name__ == '__main__':
    app.run(debug=True, port=5001)