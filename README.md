# Focus_gmail_checker
(Hourly Gmail Pinger)

**A distraction-free Chrome extension that checks for new Gmail messages only once every configurable number of minutes.**  
Stop compulsively checking your inbox—let your email come to you on your schedule.

---

## ✨ Features

- ⏰ Periodic email checking (default: every 60 minutes).
- 🔕 Detects unread Gmail messages via the Atom feed.
- 🔔 Changes the extension icon if new mail is found.
- 🛠️ Options page to customize the checking interval.
- 🧘 Works silently in the background—no tab popups.

---

## 📥 Installation

1. Clone or download this repository:

   ```bash
   git clone https://github.com/your-username/hourly-gmail-pinger.git
   ```

2. Open Chrome and go to `chrome://extensions/`.

3. Enable **Developer Mode** (top right).

4. Click **"Load unpacked"**, then select the extension folder.

5. Make sure you're logged into Gmail in the same browser session.

---

## ⚙️ Usage

- The extension icon will stay neutral if no unread messages are found.
- If there are new unread emails, the icon will change to alert you.
- Click the extension icon to open Gmail.
- To adjust how often the inbox is checked:
  1. Right-click the extension icon → Click **Options**.
  2. Enter your preferred interval in minutes.
  3. Save your changes—it will update instantly.

---

## 🛠 Developer Notes

- Manifest V3 compliant.
- Uses `chrome.alarms`, `chrome.tabs`, and `chrome.storage` for scheduling and state.
- Fetches Gmail's Atom feed from `https://mail.google.com/mail/feed/atom` with user session cookies.

---

## 🛡️ Privacy

This extension does **not** collect, store, or transmit any personal data. All operations happen locally in your browser.

---

## 📄 License

MIT License. Use it freely, fork it boldly.
