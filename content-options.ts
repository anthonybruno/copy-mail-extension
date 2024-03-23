// Saves options to chrome.storage
const saveOptions = () => {
  const colorEl = document.getElementById('color');
  const displayEl = document.getElementById('display');
  const colorVal = (colorEl as HTMLInputElement)?.value;
  const displayVal = (displayEl as HTMLInputElement).checked;

  chrome.storage.local.set({ color: colorVal, display: displayVal }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    if (status) status.textContent = 'Saved!';
    setTimeout(() => {
      if (status) status.textContent = '';
    }, 750);
  });
};

// Restores select box and checkbox state using the preferences
const restoreOptions = () => {
  const colorEl = document.getElementById('color');
  const displayEl = document.getElementById('display');
  let colorVal = (colorEl as HTMLInputElement)?.value;
  let displayVal = (displayEl as HTMLInputElement).checked;

  chrome.storage.local.get({ color: 'dark', display: true }, (items: any) => {
    colorVal = items.color;
    displayVal = items.display;
  });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save')?.addEventListener('click', saveOptions);
