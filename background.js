const ICON_DEFAULT = "icons/default.png";
const ICON_ALERT = "icons/alert.png";

async function setupAlarmFromStorage() {
  const { interval } = await chrome.storage.local.get("interval");
  const delay = interval ?? 60;
  chrome.alarms.create("checkGmail", {
    delayInMinutes: delay,
    periodInMinutes: delay
  });
}

chrome.runtime.onInstalled.addListener(setupAlarmFromStorage);
chrome.runtime.onStartup.addListener(setupAlarmFromStorage);

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

  if (msg.type === "update-alarm") {
    chrome.alarms.clear("checkGmail", () => {
      chrome.alarms.create("checkGmail", {
        delayInMinutes: msg.interval,
        periodInMinutes: msg.interval
      });
    });
  }
});

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: "https://mail.google.com" });

  // Reset icon to default when Gmail is opened manually
  chrome.action.setIcon({ path: "icons/default.png" });
  chrome.storage.local.set({ unreadCount: 0 });
});
