import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// HOW TO FILL THESE IN:
// Firebase Console → Project Settings → Your apps → Web app (create one if none)
// Copy the firebaseConfig snippet and paste the 3 missing values below.
const firebaseConfig = {
  apiKey:            "REPLACE_WITH_YOUR_API_KEY",         // e.g. "AIzaSyXXXXXX"
  authDomain:        "group-4-44664.firebaseapp.com",
  projectId:         "group-4-44664",
  storageBucket:     "group-4-44664.firebasestorage.app",
  messagingSenderId: "REPLACE_WITH_YOUR_MESSAGING_SENDER_ID", // e.g. "123456789012"
  appId:             "REPLACE_WITH_YOUR_APP_ID"           // e.g. "1:123456789012:web:abc123"
};

const incomplete = Object.entries(firebaseConfig)
  .filter(([, v]) => v.startsWith('REPLACE_'))
  .map(([k]) => k);

if (incomplete.length) {
  document.body.innerHTML = `
    <div style="font-family:sans-serif;max-width:600px;margin:4rem auto;padding:2rem;
                border:2px solid #dc2626;border-radius:8px;background:#fef2f2;color:#7f1d1d">
      <h2 style="margin:0 0 1rem">⚠️ Firebase chưa được cấu hình</h2>
      <p>Các giá trị sau còn là placeholder trong <code>shared/firebase.js</code>:</p>
      <ul>${incomplete.map(k => `<li><code>${k}</code></li>`).join('')}</ul>
      <p>Vào <strong>Firebase Console → Project Settings → Your apps → Web app</strong>
         để lấy giá trị thực.</p>
    </div>`;
  throw new Error(`Firebase config missing: ${incomplete.join(', ')}`);
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
