/*
  From https://39digits.com/create-a-chrome-extension-to-hide-youtube-comments/
  Author: Christopher Hamilton
*/

// When the extension is installed or upgraded
chrome.runtime.onInstalled.addListener(function () {
  // Replace all rules
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    // With a new rule
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains 'youtube.com'
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'youtube.com' },
          })
        ],
        // And shows the extension's page action.
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});


chrome.pageAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript(null, { file: "content.js" });
});