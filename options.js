const intervalInput = document.getElementById("interval");
const notifySelect = document.getElementById("notify");
const saveButton = document.getElementById("save");

chrome.storage.local.get(["interval", "notify"], ({ interval, notify }) => {
  intervalInput.value = interval ?? 60;
  notifySelect.value = notify ?? "ON";
});

saveButton.addEventListener("click", () => {
  const interval = parseInt(intervalInput.value);
  const notify = notifySelect.value;

  if (!isNaN(interval) && interval > 0) {
    chrome.storage.local.set({ interval, notify });
    chrome.runtime.sendMessage({ type: "update-alarm", interval });
    alert("Settings saved!");
  } else {
    alert("Please enter a valid number greater than 0.");
  }
});
