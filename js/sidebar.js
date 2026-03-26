// ── Sidebar HTML compartilhada (agora com toggle + mobile support) ──
export function renderSidebar() {
  return `
  <aside class="sidebar">
    <div class="sidebar-logo">
      <div class="logo-mark">Ax<span>i</span>s</div>
      <button id="sidebarToggle" class="sidebar-toggle" title="Recolher/Expandir">‹</button>
    </div>
    <div class="sidebar-user">
      <div class="user-avatar" id="sidebarAvatar">?</div>
      <span class="user-name" id="sidebarUserName">Carregando...</span>
    </div>

    <span class="nav-section">Principal</span>
    <a class="nav-item" data-page="dashboard.html" href="dashboard.html">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
      <span>Dashboard</span>
    </a>

    <span class="nav-section">Controle</span>
    <a class="nav-item" data-page="vicios.html" href="vicios.html">…</a>
    <a class="nav-item" data-page="habitos.html" href="habitos.html">…</a>
    <a class="nav-item" data-page="metas.html" href="metas.html">…</a>
    <a class="nav-item" data-page="desejos.html" href="desejos.html">…</a>
    <a class="nav-item" data-page="financas.html" href="financas.html">…</a>

    <span class="nav-section">Social</span>
    <a class="nav-item" data-page="nos.html" href="nos.html">…</a>

    <div class="sidebar-footer">
      <button class="nav-item btn-ghost" id="logoutBtn" style="width:100%; border:none; background:none;">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">…</svg>
        <span>Sair</span>
      </button>
    </div>
  </aside>`;
}

export function initSidebar() {
  const mount = document.getElementById('sidebarMount');
  if (!mount) return;
  mount.innerHTML = renderSidebar();
  setActivePage();
  setupSidebarToggle();
  setupMobileHamburger();
}

function setupSidebarToggle() {
  const toggle = document.getElementById('sidebarToggle');
  const shell = document.querySelector('.app-shell');
  if (!toggle || !shell) return;

  toggle.addEventListener('click', () => {
    shell.classList.toggle('sidebar-collapsed');
    toggle.textContent = shell.classList.contains('sidebar-collapsed') ? '›' : '‹';
    localStorage.setItem('sidebarCollapsed', shell.classList.contains('sidebar-collapsed'));
  });

  if (localStorage.getItem('sidebarCollapsed') === 'true') {
    shell.classList.add('sidebar-collapsed');
    toggle.textContent = '›';
  }
}

function setupMobileHamburger() {
  const ham = document.getElementById('mobileHamburger');
  const shell = document.querySelector('.app-shell');
  if (!ham || !shell) return;
  ham.addEventListener('click', () => shell.classList.toggle('sidebar-open'));
}

export function setActivePage() {
  const page = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    if (item.getAttribute('data-page') === page) item.classList.add('active');
  });
}
