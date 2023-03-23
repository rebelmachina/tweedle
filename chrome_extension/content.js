var regex_str;
var is_active = false;
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === 'filter_tweets') {
    regex_str = message.regex;
    is_active = message.isActive;
  }
});

var lastScrollPos = window.pageYOffset;
var windowHeight = window.innerHeight;
setInterval(function () {
  var currentScrollPos = window.pageYOffset;
  if (Math.abs(currentScrollPos - lastScrollPos) > (windowHeight / 2)) {
    chrome.runtime.sendMessage({ type: 'scroll_detected' });
    lastScrollPos = currentScrollPos;

    if (is_active) {
      var tweetElements = document.querySelectorAll("[data-testid='tweetText']");
      var regex = new RegExp(regex_str);
      Array.prototype.forEach.call(tweetElements, function (element) {
        if (regex.test(element.textContent)) {
          element.parentElement.parentElement.parentElement.style.display = 'none';
        }
      });
    }
  }
}, 100);
