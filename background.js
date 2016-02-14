chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.executeScript({
    file: 'inject.js'
  });
});
