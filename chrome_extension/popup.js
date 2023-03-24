// document.addEventListener('DOMContentLoaded', function () {
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

    chrome.runtime.sendMessage({
        type: 'filter_tweets',
        regex: regexInput.value,
        isActive: true
    });
});

removeButton.addEventListener('click', function () {

    // Clear the input field
    regexInput.value = '';

    // Clear the stored regex value
    chrome.storage.sync.set({ 'regexValue': '' });
    chrome.runtime.sendMessage({
        type: 'filter_tweets',
        regex: '',
        isActive: false
    });
});
