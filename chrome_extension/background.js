chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'filter_tweets') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs[0].url.startsWith('https://twitter.com')) {
                chrome.scripting.executeScript({
                    target: {tabId: tabs[0].id},
                    files: ['content.js']
                }, () => {
                    // Send the message to the content script after it's injected
                    chrome.tabs.sendMessage(tabs[0].id, message);
                });
            }
        });
    }
});
