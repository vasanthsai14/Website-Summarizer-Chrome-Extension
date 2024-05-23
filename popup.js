// document.getElementById('summarize-btn').addEventListener('click', () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       if (chrome.runtime.lastError) {
//         console.error(chrome.runtime.lastError.message);
//         document.getElementById('summary').innerText = 'Error: ' + chrome.runtime.lastError.message;
//         return;
//       }
  
//       if (tabs.length > 0) {
//         chrome.scripting.executeScript(
//           {
//             target: { tabId: tabs[0].id },
//             func: getContentToSummarize
//           },
//           (results) => {
//             if (chrome.runtime.lastError) {
//               console.error(chrome.runtime.lastError.message);
//               document.getElementById('summary').innerText = 'Error: ' + chrome.runtime.lastError.message;
//               return;
//             }
  
//             if (results && results.length > 0 && results[0].result) {
//               const text = results[0].result;
//               summarizeText(text);
//             } else {
//               document.getElementById('summary').innerText = 'No content available to summarize.';
//             }
//           }
//         );
//       }
//     });
//   });
  
//   function getContentToSummarize() {
//     const text = document.body.innerText;
//     return text.replace(/\s+/g, ' ').trim();
//   }
  
//   function summarizeText(text) {
//     const loadingElement = document.getElementById('loading');
//     const summaryElement = document.getElementById('summary');
//     loadingElement.style.display = 'block';
//     summaryElement.innerText = '';
  
//     fetch('http://127.0.0.1:5000/summary?text=' + encodeURIComponent(text))
//       .then(response => response.json())
//       .then(data => {
//         loadingElement.style.display = 'none';
//         if (data.error) {
//           summaryElement.innerText = 'Error: ' + data.error;
//         } else {
//           summaryElement.innerText = data[0].summary_text;
//         }
//       })
//       .catch(error => {
//         loadingElement.style.display = 'none';
//         summaryElement.innerText = 'Error: ' + error.message;
//       });
//   }


//   # API_URL = "https://api-inference.huggingface.co/models/google/pegasus-large"
//   # API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
//   # from flask import Flask, request, jsonify
//   # import requests
  
//   # app = Flask(__name__)
  
//   # # Replace with your Hugging Face API token
//   # HUGGING_FACE_API_KEY = "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"
//   # # API_URL = "https://api-inference.huggingface.co/models/google/pegasus-large"
//   # # API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
  
//   # headers = {
//   #     "Authorization": f"Bearer {HUGGING_FACE_API_KEY}"
//   # }
  
//   # def query(payload):
//   #     response = requests.post(API_URL, headers=headers, json=payload)
//   #     return response.json()
  
//   # @app.route('/summary', methods=['GET'])
//   # def summary_api():
//   #     # For simplicity, we assume the text to summarize is passed directly in the URL query string.
//   #     # In a real application, you would need to fetch and process the webpage content.
//   #     text = request.args.get('text', '')
//   #     if not text:
//   #         return jsonify({'error': 'No text provided'}), 400
      
//   #     # Call Hugging Face API to summarize the text
//   #     summary = query({"inputs": text})
//   #     return jsonify(summary), 200
  
//   # if __name__ == '__main__':
//   #     app.run()  
  


document.getElementById('summarize-btn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            document.getElementById('summary').innerText = 'Error: ' + chrome.runtime.lastError.message;
            return;
        }

        if (tabs.length > 0) {
            chrome.scripting.executeScript(
                {
                    target: { tabId: tabs[0].id },
                    func: getContentToSummarize
                },
                (results) => {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError.message);
                        document.getElementById('summary').innerText = 'Error: ' + chrome.runtime.lastError.message;
                        return;
                    }

                    if (results && results.length > 0 && results[0].result) {
                        const text = results[0].result;
                        summarizeText(text);
                    } else {
                        document.getElementById('summary').innerText = 'No content available to summarize.';
                    }
                }
            );
        }
    });
});

function getContentToSummarize() {
    const article = document.querySelector('article');
    if (article) {
        const text = article.innerText;
        return text.replace(/\s+/g, ' ').trim();
    }
    return document.body.innerText.replace(/\s+/g, ' ').trim();
}


function summarizeText(text) {
    const loadingElement = document.getElementById('loading');
    const summaryElement = document.getElementById('summary');
    loadingElement.style.display = 'block';
    summaryElement.innerText = '';

    chrome.runtime.sendMessage({ action: "summarize", text: text }, (response) => {
        loadingElement.style.display = 'none';
        if (response.error) {
            summaryElement.innerText = 'Error: ' + response.error;
        } else {
            summaryElement.innerText = response.summary;
        }
    });
}

