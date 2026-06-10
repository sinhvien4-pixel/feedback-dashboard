import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth }       from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Lấy 3 giá trị dưới đây tại:
// Firebase Console → Project Settings → Your apps → Web app (tạo mới nếu chưa có)
const firebaseConfig = {
  apiKey:            "AIzaSyDgr2Q2wUDeybHXoBloCbgSp85aePmTVDc",
  authDomain:        "group-4-44664.firebaseapp.com",
  projectId:         "group-4-44664",
  storageBucket:     "group-4-44664.firebasestorage.app",
  messagingSenderId: "932063926188",
  appId:             "1:932063926188:web:8f340b910013c7944d4c09",
};

const incomplete = Object.entries(firebaseConfig)
  .filter(([, v]) => v.startsWith("REPLACE_"))
  .map(([k]) => k);

if (incomplete.length) {
  document.body.innerHTML = `
    <div style="font-family:sans-serif;max-width:560px;margin:4rem auto;padding:2rem;
                border:2px solid #dc2626;border-radius:8px;background:#fef2f2;color:#7f1d1d">
      <h2 style="margin:0 0 1rem">⚠️ Firebase chưa được cấu hình</h2>
      <p>Các giá trị sau còn là placeholder trong <code>shared/firebase-config.js</code>:</p>
      <ul>${incomplete.map(k => `<li><code>${k}</code></li>`).join("")}</ul>
      <p>Vào <strong>Firebase Console → Project Settings → Your apps → Web app</strong>
         để lấy giá trị thực.</p>
    </div>`;
  throw new Error(`Firebase config thiếu: ${incomplete.join(", ")}`);
}

const app = initializeApp(firebaseConfig);
export const auth          = getAuth(app);
export const ALLOWED_DOMAIN = "hsb.edu.vn";
