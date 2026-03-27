import { renderSidebar, initSidebar } from './sidebar.js';
import { setTopbarDate } from './utils.js';
import { requireAuth } from './auth.js';

export function initPage(title) {
  // Monta sidebar
  const mount = document.getElementById('sidebarMount');
  if (mount) mount.innerHTML = renderSidebar();

  // Topbar title
  const tt = document.getElementById('topbarTitle');
  if (tt) tt.textContent = title;

  setTopbarDate();
  initSidebar();
  requireAuth();
}
