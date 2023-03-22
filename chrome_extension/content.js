var regex_str;
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === 'filter_tweets') {
    regex_str = message.regex;
  }
});

var lastScrollPos = window.pageYOffset;
var windowHeight = window.innerHeight;
setInterval(function () {
  var currentScrollPos = window.pageYOffset;
  if (Math.abs(currentScrollPos - lastScrollPos) > (windowHeight / 2)) {
    chrome.runtime.sendMessage({ type: 'scroll_detected' });
    lastScrollPos = currentScrollPos;

    var tweetElements = document.querySelectorAll("[data-testid='tweetText']");
    var regex = new RegExp(regex_str);
    Array.prototype.forEach.call(tweetElements, function (element) {
      if (regex.test(element.textContent)) {
        element.parentElement.parentElement.parentElement.style.display = 'none';
      }
    });
  }
}, 100);
