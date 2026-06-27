const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { uploadPhoto, uploadResume } = require("../middleware/uploadMiddleware");
const {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  uploadProfilePhoto,
  uploadResume: uploadResumeController,
} = require("../controllers/profileController");

/**
 * NexHire — Profile Routes
 * All routes are protected by JWT middleware.
 */

// Core CRUD
router.get("/",    protect, getProfile);
router.post("/",   protect, createProfile);
router.put("/",    protect, updateProfile);
router.delete("/", protect, deleteProfile);

// File uploads
router.post("/upload-photo",  protect, uploadPhoto,  uploadProfilePhoto);
router.post("/upload-resume", protect, uploadResume, uploadResumeController);

module.exports = router;