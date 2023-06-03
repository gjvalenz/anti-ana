// code adapted from Omicron18
// github: nitter-extension/background.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === 'redirect') {
            chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
                chrome.tabs.update({url: 'https://www.google.com/search?q=anorexia+help'});
            });
        }
    }
);