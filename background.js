const GMAIL_FEED = "https://mail.google.com/mail/feed/atom";
const ICON_DEFAULT = "icons/default.png";
const ICON_ALERT = "icons/alert.png";

async function checkEmail() {
  try {
    const response = await fetch(GMAIL_FEED, { credentials: "include" });
    const text = await response.text();
    const unreadCount = (text.match(/<entry>/g) || []).length;

    const iconPath = unreadCount > 0 ? ICON_ALERT : ICON_DEFAULT;
    chrome.action.setIcon({ path: iconPath });

    chrome.storage.local.set({ unreadCount });
  } catch (err) {
    console.error("Email check failed:", err);
  }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("gmailCheck", { delayInMinutes: 0, periodInMinutes: 1 });
  checkEmail();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "gmailCheck") {
    checkEmail();
  }
});

chrome.tabs.create({
  url: "https://mail.google.com/mail/feed/atom",
  active: false
});


chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: "https://mail.google.com" });
});
