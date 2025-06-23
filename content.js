chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "parse-feed") {
    const count = (document.documentElement.innerHTML.match(/<entry>/g) || []).length;
    chrome.runtime.sendMessage({ type: "unread-count", count });
  }
});
