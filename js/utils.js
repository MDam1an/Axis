// ─────────────────────────────────────────────
//  AXIS — Utilities compartilhadas
// ─────────────────────────────────────────────

// ── Toast ──
export function toast(message, type = 'default') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = message;
  container.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(6px)'; t.style.transition = '0.2s'; }, 2600);
  setTimeout(() => t.remove(), 2900);
}

// ── Modal ──
export function openModal(id) {
  document.getElementById(id)?.classList.add('open');
}

export function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
}

export function bindModalClose() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay')?.classList.remove('open');
    });
  });
}

// ── Data formatada ──
export function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
}

export function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

export function daysBetween(a, b) {
  const ms = Math.abs(new Date(b) - new Date(a));
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

// ── Atualiza topbar ──
export function setTopbarDate() {
  const el = document.getElementById('topbarDate');
  if (el) el.textContent = formatDate(new Date());
}

// ── Sidebar active link ──
export function setActiveSidebarLink() {
  const page = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    if (item.dataset.page === page) item.classList.add('active');
    item.addEventListener('click', () => {
      window.location.href = item.dataset.page;
    });
  });
}
