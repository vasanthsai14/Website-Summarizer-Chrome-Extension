// Function to extract text content from the webpage
function extractText() {
    const textContent = document.body.innerText;
    return textContent.trim();
}

// Send extracted text to the background script for summarization
function sendTextToBackground(text) {
    chrome.runtime.sendMessage({ action: "summarize", text: text });
}

// Extract text content and send it to the background script when the page is fully loaded
window.onload = function() {
    const text = extractText();
    if (text) {
        sendTextToBackground(text);
    }
};
