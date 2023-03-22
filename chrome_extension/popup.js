document.addEventListener('DOMContentLoaded', function () {
    var regexInput = document.getElementById('regex-input');

    // Retrieve the last stored regex value, if any
    chrome.storage.sync.get(['regexValue'], function (result) {
        regexInput.value = result.regexValue || '';
    });

    regexInput.addEventListener('input', function () {
        // Store the current regex value whenever it changes
        chrome.storage.sync.set({ 'regexValue': regexInput.value });
    });

    regexInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { type: 'filter_tweets', regex: regexInput.value });
            });
        }
    });
});
