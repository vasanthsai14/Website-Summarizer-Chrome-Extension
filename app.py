# from flask import Flask, request, jsonify
# import requests

# app = Flask(__name__)

# # Replace with your Hugging Face API token
# HUGGING_FACE_API_KEY = "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"
# # API_URL = "https://api-inference.huggingface.co/models/google/pegasus-large"
# API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"

# headers = {
#     "Authorization": f"Bearer {HUGGING_FACE_API_KEY}"
# }

# def query(payload):
#     response = requests.post(API_URL, headers=headers, json=payload)
#     return response.json()

# @app.route('/summary', methods=['GET'])
# def summary_api():
#     text = request.args.get('text', '')
#     if not text:
#         return jsonify({'error': 'No text provided'}), 400
      
#     summary = query({"inputs": text})
#     return jsonify(summary), 200

# if __name__ == '__main__':
#     app.run()


# from flask import Flask, request, jsonify
# import requests

# app = Flask(__name__)

# # Replace with your Hugging Face API token
# HUGGING_FACE_API_KEY = "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"
# API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"

# headers = {
#     "Authorization": f"Bearer {HUGGING_FACE_API_KEY}"
# }

# def query(payload):
#     response = requests.post(API_URL, headers=headers, json=payload)
#     return response.json()

# @app.route('/summary', methods=['POST'])
# def summary_api():
#     data = request.get_json()
#     text = data.get('text', '')
#     if not text:
#         return jsonify({'error': 'No text provided'}), 400
      
#     summary = query({"inputs": text})
#     if 'error' in summary:
#         return jsonify({'error': summary['error']}), 500
    
#     return jsonify(summary), 200

# if __name__ == '__main__':
#     app.run()

from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Replace with your Hugging Face API token
HUGGING_FACE_API_KEY = "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"
API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"

headers = {
    "Authorization": f"Bearer {HUGGING_FACE_API_KEY}"
}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

@app.route('/summary', methods=['POST', 'GET'])
def summary_api():
    if request.method == 'POST':
        data = request.get_json()
        text = data.get('text', '')
    elif request.method == 'GET':
        text = request.args.get('text', '')

    if not text:
        return jsonify({'error': 'No text provided'}), 400
      
    summary = query({"inputs": text})
    if 'error' in summary:
        return jsonify({'error': summary['error']}), 500
    
    return jsonify(summary), 200

if __name__ == '__main__':
    app.run(debug=True)



