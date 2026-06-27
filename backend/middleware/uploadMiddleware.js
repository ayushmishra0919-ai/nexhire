const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * NexHire — Multer Upload Middleware
 * Handles profile photo and resume uploads with validation.
 */

/* ─── Ensure upload directories exist ────────────────────────────────────── */
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

ensureDir(path.join(__dirname, "../uploads/profiles"));
ensureDir(path.join(__dirname, "../uploads/resumes"));

/* ─── Storage engine ─────────────────────────────────────────────────────── */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profileImage") {
      cb(null, path.join(__dirname, "../uploads/profiles"));
    } else if (file.fieldname === "resume") {
      cb(null, path.join(__dirname, "../uploads/resumes"));
    } else {
      cb(new Error("Unknown file field"), null);
    }
  },

  filename: (req, file, cb) => {
    // Format: userId_timestamp.ext  — prevents name collisions
    const userId = req.user?.id || "unknown";
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = `${userId}_${Date.now()}${ext}`;
    cb(null, filename);
  },
});

/* ─── File filter ────────────────────────────────────────────────────────── */
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "profileImage") {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Profile image must be JPEG, JPG, PNG, or WEBP."), false);
    }
  } else if (file.fieldname === "resume") {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Resume must be a PDF file."), false);
    }
  } else {
    cb(new Error("Unsupported file field."), false);
  }
};

/* ─── Multer instances ───────────────────────────────────────────────────── */
const uploadPhoto = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
}).single("profileImage");

const uploadResume = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
}).single("resume");

/* ─── Wrapper to convert multer callback to promise ─────────────────────── */
const handleUpload = (uploader) => (req, res, next) => {
  uploader(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File too large. Max size exceeded.",
        });
      }
      return res.status(400).json({ success: false, message: err.message });
    }
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

module.exports = {
  uploadPhoto: handleUpload(uploadPhoto),
  uploadResume: handleUpload(uploadResume),
};