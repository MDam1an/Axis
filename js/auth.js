import { auth, db } from './firebase-config.js';
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export function getCurrentUser() {
  return new Promise(resolve => {
    const unsub = onAuthStateChanged(auth, user => { unsub(); resolve(user); });
  });
}

export function requireAuth(callback) {
  onAuthStateChanged(auth, user => {
    if (!user) { window.location.href = 'index.html'; return; }
    const av = document.getElementById('sidebarAvatar');
    const nm = document.getElementById('sidebarUserName');
    if (av) av.textContent = (user.displayName || user.email || 'U')[0].toUpperCase();
    if (nm) nm.textContent = user.displayName || user.email || '';
    if (callback) callback(user);
  });
}

export function redirectIfLoggedIn() {
  onAuthStateChanged(auth, user => {
    if (user) window.location.href = 'dashboard.html';
  });
}

export async function register(name, email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });
  await setDoc(doc(db, 'users', cred.user.uid), { name, email, createdAt: serverTimestamp() });
  return cred.user;
}

export async function login(email, password) {
  return (await signInWithEmailAndPassword(auth, email, password)).user;
}

export async function logout() {
  await signOut(auth);
  window.location.href = 'index.html';
}
