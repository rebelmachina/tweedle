document.addEventListener('DOMContentLoaded', function () {
    var regexInput = document.getElementById('regex-input');

    var excludeButton = document.getElementById('filter-button');
    var removeButton = document.getElementById('remove-button');


    // Retrieve the last stored regex value and is_active flag, if any
    chrome.storage.sync.get(['regexValue', 'isActive'], function (result) {
        regexInput.value = result.regexValue || '';
    });

    regexInput.addEventListener('input', function () {
        // Store the current regex value whenever it changes
        chrome.storage.sync.set({ 'regexValue': regexInput.value });
    });

    excludeButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'filter_tweets', regex: regexInput.value, isActive: true });
        });
    });

    removeButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'filter_tweets', regex: regexInput.value, isActive: false });
        });
    });
});
