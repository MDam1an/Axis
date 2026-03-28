/**
 * shell.js — monta sidebar + hamburger + topbar em qualquer página
 * Uso: import { initShell } from './shell.js'; initShell('NomePagina', callback);
 */
import { requireAuth, logout } from './auth.js';
import { setTopbarDate } from './utils.js';

const SIDEBAR_HTML = `
<aside class="sidebar" id="sidebar">
  <div class="sidebar-logo">
    <div class="logo-mark">Ax<span>i</span>s</div>
    <button class="sidebar-close" id="sidebarClose" title="Fechar">✕</button>
  </div>
  <div class="sidebar-user">
    <div class="user-avatar" id="sidebarAvatar">?</div>
    <span class="user-name" id="sidebarUserName">Carregando…</span>
  </div>

  <div class="nav-label">Principal</div>
  <a class="nav-item" href="dashboard.html" data-p="dashboard.html">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
    <span>Dashboard</span>
  </a>

  <div class="nav-label">Controle</div>
  <a class="nav-item" href="vicios.html" data-p="vicios.html">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    <span>Vícios</span>
  </a>
  <a class="nav-item" href="habitos.html" data-p="habitos.html">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
    <span>Hábitos</span>
  </a>
  <a class="nav-item" href="metas.html" data-p="metas.html">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
    <span>Metas</span>
  </a>
  <a class="nav-item" href="desejos.html" data-p="desejos.html">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
    <span>Desejos</span>
  </a>
  <a class="nav-item" href="financas.html" data-p="financas.html">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
    <span>Finanças</span>
  </a>

  <div class="nav-label">Social</div>
  <a class="nav-item" href="nos.html" data-p="nos.html">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
    <span>Nós</span>
  </a>

  <div class="sidebar-footer">
    <button class="btn-logout" id="logoutBtn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      <span>Sair</span>
    </button>
  </div>
</aside>
<div class="sidebar-overlay" id="sidebarOverlay"></div>`;

export function initShell(pageTitle, onUser) {
  // 1. Injeta sidebar
  const mount = document.getElementById('sidebarMount');
  if (mount) mount.innerHTML = SIDEBAR_HTML;

  // 2. Topbar
  const titleEl = document.getElementById('topbarTitle');
  if (titleEl) titleEl.textContent = pageTitle;
  setTopbarDate();

  // 3. Marca link ativo
  const current = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.nav-item[data-p]').forEach(a => {
    if (a.dataset.p === current) a.classList.add('active');
  });

  // 4. Hamburger / drawer
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebarOverlay');
  const closeBtn = document.getElementById('sidebarClose');
  const hamBtn   = document.getElementById('hamburgerBtn');

  function openDrawer()  { sidebar?.classList.add('open');  overlay?.classList.add('open'); }
  function closeDrawer() { sidebar?.classList.remove('open'); overlay?.classList.remove('open'); }

  hamBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  // Fechar drawer ao navegar (mobile)
  document.querySelectorAll('.nav-item').forEach(a => {
    a.addEventListener('click', closeDrawer);
  });

  // 5. Logout
  document.getElementById('logoutBtn')?.addEventListener('click', logout);

  // 6. Auth — chama onUser(user) quando autenticado
  requireAuth(onUser);
}
