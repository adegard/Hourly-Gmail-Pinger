const ICON_DEFAULT = "icons/default.png";
const ICON_ALERT = "icons/alert.png";

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("checkGmail", { delayInMinutes: 0, periodInMinutes: 30 });
});

chrome.alarms.onAlarm.addListener(() => {
  chrome.tabs.create({ url: "https://mail.google.com/mail/feed/atom", active: false }, (tab) => {
    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
      if (tabId === tab.id && info.status === "complete") {
        chrome.tabs.sendMessage(tab.id, { type: "parse-feed" });
        chrome.tabs.onUpdated.removeListener(listener);
      }
    });
  });
});

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === "unread-count") {
    const icon = msg.count > 0 ? ICON_ALERT : ICON_DEFAULT;
    chrome.action.setIcon({ path: icon });
    chrome.storage.local.set({ unreadCount: msg.count });

    if (sender.tab?.id) {
      chrome.tabs.remove(sender.tab.id);
    }
  }
});

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: "https://mail.google.com" });
});

