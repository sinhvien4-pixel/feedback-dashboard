require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const path     = require("path");
const express  = require("express");
const cors     = require("cors");
const admin    = require("firebase-admin");

// FIREBASE_SERVICE_ACCOUNT = toàn bộ service account JSON trên 1 dòng (dùng cho Vercel)
// Fallback: các biến riêng lẻ FIREBASE_PROJECT_ID / CLIENT_EMAIL / PRIVATE_KEY
const credential = process.env.FIREBASE_SERVICE_ACCOUNT
  ? admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
  : admin.credential.cert({
      projectId:   process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey:  (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    });

admin.initializeApp({ credential });

const db         = admin.firestore();
const COLLECTION = "feedback";

const app = express();
app.use(cors());
app.use(express.json());

// POST /api/feedback — lưu phản hồi mới
app.post("/api/feedback", async (req, res) => {
  try {
    const { name, location, rating, comment } = req.body;
    if (!rating || !comment) {
      return res.status(400).json({ error: "rating và comment là bắt buộc" });
    }
    const doc = await db.collection(COLLECTION).add({
      name:        name || null,
      location:    location || null,
      rating,
      comment,
      submittedAt: new Date().toISOString(),
    });
    res.status(201).json({ id: doc.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Không thể lưu phản hồi" });
  }
});

// GET /api/feedback — lấy toàn bộ phản hồi
app.get("/api/feedback", async (req, res) => {
  try {
    const snapshot = await db
      .collection(COLLECTION)
      .orderBy("submittedAt", "desc")
      .get();
    const entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Không thể tải dữ liệu" });
  }
});

// Serve static files (HTML, CSS, JS) — must be AFTER API routes
app.use(express.static(path.join(__dirname)));

// Fallback: redirect root to submit page
app.get("/", (req, res) => res.redirect("/pages/submit.html"));

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
    console.log(`→ Submit : http://localhost:${PORT}/pages/submit.html`);
    console.log(`→ Admin  : http://localhost:${PORT}/pages/admin.html`);
    console.log(`→ Login  : http://localhost:${PORT}/pages/login.html`);
  });
}

module.exports = app;
