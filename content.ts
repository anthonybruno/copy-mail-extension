declare const chrome: any;

document.body.addEventListener('click', (e) => {
  const anchor = (e.target as HTMLElement).closest('a');
  if (anchor !== null && anchor.href.startsWith('mailto:')) {
    copyAddress(anchor.href);
    e.preventDefault();
  }
});

function getEmail(hrefAttr: string) {
  const cleanedEmail = hrefAttr.replace('mailto:', '');
  if (cleanedEmail.includes('?')) return cleanedEmail.split('?')[0];
  return cleanedEmail;
}

function copyAddress(href: string) {
  chrome.storage.local.get(['color', 'display']).then((result: any) => {
    const color = result.color || 'dark';
    const display = result.display || true;
    const emailAddress = getEmail(href);
    if (display) renderModal(href, emailAddress, color);
    navigator.clipboard.writeText(emailAddress);
  });
}

function renderModal(href: string, emailAddress: string, colorMode: string) {
  const div = document.createElement('div');
  const newContent = document.createTextNode(
    `${emailAddress} has been copied to the clipboard.`
  );
  const transition = 300;
  const duration = 2500;
  let backgroundColor = 'rgba(0, 0, 0, 0.5)';
  let textColor = 'rgba(255, 255, 255, 1)';

  if (colorMode === 'light') {
    backgroundColor = 'rgba(255, 255, 255, 0.5)';
    textColor = 'rgba(0, 0, 0, 1)';
  }

  div.style.zIndex = '999999999';
  div.style.backdropFilter = 'blur(5px)';
  div.style.backgroundColor = backgroundColor;
  div.style.color = textColor;
  div.style.borderRadius = '8px';
  div.style.position = 'fixed';
  div.style.left = '50%';
  div.style.bottom = '-10px';
  div.style.transform = 'translateX(-50%)';
  div.style.padding = '20px';
  div.style.fontFamily = 'system-ui, sans-serif';
  div.style.fontWeight = 'bold';
  div.style.opacity = '0';
  div.style.transition = `all ${transition}ms ease-in-out`;

  div.appendChild(newContent);
  document.body.appendChild(div);

  setTimeout(() => {
    div.style.bottom = '10px';
    div.style.opacity = '1';
  }, 10);

  setTimeout(() => {
    div.style.bottom = '-10px';
    div.style.opacity = '0';
  }, duration);

  setTimeout(() => {
    div.remove();
  }, duration + transition * 2);
}
