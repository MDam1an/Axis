// ─────────────────────────────────────────────────────────
//  AXIS — Firebase Configuration
// ─────────────────────────────────────────────────────────

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJ54Y6YoQUDXDPzrd3YU7ahKJZt7vGtMo",
  authDomain: "axis-4ba81.firebaseapp.com",
  projectId: "axis-4ba81",
  storageBucket: "axis-4ba81.firebasestorage.app",
  messagingSenderId: "907491466084",
  appId: "1:907491466084:web:c925fa6b2881792e44b871",
  measurementId: "G-503XKGEZ4Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
