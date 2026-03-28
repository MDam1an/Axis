export function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

export function daysBetween(a, b) {
  if (!a || !b) return 0;
  return Math.max(0, Math.floor((new Date(b+'T00:00:00') - new Date(a+'T00:00:00')) / 86400000));
}

export function fmt(v) {
  return Number(v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function toast(msg, type = '') {
  let c = document.getElementById('toastContainer');
  if (!c) { c = document.createElement('div'); c.id = 'toastContainer'; c.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:8px'; document.body.appendChild(c); }
  const t = document.createElement('div');
  const bg = type === 'success' ? '#1A8C5B' : type === 'error' ? '#C0392B' : '#1A1916';
  t.style.cssText = `background:${bg};color:#fff;padding:11px 16px;border-radius:8px;font-size:.875rem;box-shadow:0 4px 16px rgba(0,0,0,.15);animation:fadeIn .25s ease;max-width:280px;font-family:'DM Sans',sans-serif`;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = '.2s'; }, 2600);
  setTimeout(() => t.remove(), 2900);
}

export function openModal(id) { document.getElementById(id)?.classList.add('open'); }
export function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

export function setupModals() {
  document.querySelectorAll('.modal-overlay').forEach(o => {
    o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); });
  });
  document.querySelectorAll('.modal-close').forEach(b => {
    b.addEventListener('click', () => b.closest('.modal-overlay')?.classList.remove('open'));
  });
}

export function setTopbarDate() {
  const el = document.getElementById('topbarDate');
  if (el) el.textContent = new Date().toLocaleDateString('pt-BR', { day:'2-digit', month:'long', year:'numeric' });
}
