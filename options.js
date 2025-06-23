const input = document.getElementById("interval");
const save = document.getElementById("save");

chrome.storage.local.get(["interval"], ({ interval }) => {
  input.value = interval ?? 60;
});

save.addEventListener("click", () => {
  const value = parseInt(input.value);
  if (!isNaN(value) && value > 0) {
    chrome.storage.local.set({ interval: value });
    chrome.runtime.sendMessage({ type: "update-alarm", interval: value });
    alert("Saved! The extension will now check every " + value + " minutes.");
  }
});
