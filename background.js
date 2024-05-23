chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "summarize") {
        fetch('http://127.0.0.1:5000/summary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: request.text })
        })
        .then(response => response.json())
        .then(data => {
            const summary = data[0].summary_text;
            // Post-process the summary to clean it up
            const cleanedSummary = summary.replace(/(?:\r\n|\r|\n)/g, ' ').trim();
            sendResponse({ summary: cleanedSummary });
        })
        .catch(error => {
            sendResponse({ error: error.message });
        });
        return true; // Indicates that sendResponse will be called asynchronously
    }
});




