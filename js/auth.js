import { auth, db } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── Verifica autenticação em páginas protegidas ──
export function requireAuth() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = 'index.html';
    } else {
      updateSidebarUser(user);
    }
  });
}

// ── Redireciona se já logado (para a página de login) ──
export function redirectIfLoggedIn() {
  onAuthStateChanged(auth, (user) => {
    if (user) window.location.href = 'dashboard.html';
  });
}

// ── Registro ──
export async function register(name, email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });
  await setDoc(doc(db, 'users', cred.user.uid), {
    name,
    email,
    createdAt: serverTimestamp()
  });
  return cred.user;
}

// ── Login ──
export async function login(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

// ── Logout ──
export async function logout() {
  await signOut(auth);
  window.location.href = 'index.html';
}

// ── Retorna usuário atual ──
export function getCurrentUser() {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      resolve(user);
    });
  });
}

// ── Atualiza nome/avatar na sidebar ──
function updateSidebarUser(user) {
  const el = document.getElementById('sidebarUserName');
  const av = document.getElementById('sidebarAvatar');
  if (el) el.textContent = user.displayName || user.email;
  if (av) av.textContent = (user.displayName || user.email || 'U')[0].toUpperCase();
}

// ── Bind do botão de logout ──
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);
});
