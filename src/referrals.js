const KEY = 'labs-referrer';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function captureReferral() {
  const code = new URL(window.location.href).searchParams.get('ref');
  if (!code || !UUID.test(code)) return;
  try {
    if (!localStorage.getItem(KEY)) localStorage.setItem(KEY, code.toLowerCase());
  } catch { /* The referral in the current URL remains available. */ }
}

export function pendingReferral() {
  let code;
  try { code = localStorage.getItem(KEY); } catch { /* Storage may be disabled. */ }
  code ||= new URL(window.location.href).searchParams.get('ref');
  return code && UUID.test(code) ? code.toLowerCase() : null;
}

export function referralLink(userId) {
  const url = new URL(import.meta.env.BASE_URL, window.location.origin);
  url.searchParams.set('ref', userId);
  return url.href;
}
