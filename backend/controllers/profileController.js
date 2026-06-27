const Profile = require("../models/Profile");
const fs = require("fs");
const path = require("path");

/**
 * NexHire — Profile Controller
 * All business logic for profile CRUD and file uploads.
 */

/* ─── Helper: delete old file from disk ──────────────────────────────────── */
const deleteFile = (filePath) => {
  if (!filePath) return;
  const absolute = path.join(__dirname, "../", filePath);
  if (fs.existsSync(absolute)) {
    fs.unlink(absolute, (err) => {
      if (err) console.error("File delete error:", err.message);
    });
  }
};

/* ─── Helper: build public URL path from filename ────────────────────────── */
const buildPath = (folder, filename) =>
  filename ? `uploads/${folder}/${filename}` : "";

/* ══════════════════════════════════════════════════════════════════════════
   GET /api/profile
   Returns the authenticated user's profile.
   Creates a blank profile document if one doesn't exist yet.
══════════════════════════════════════════════════════════════════════════ */
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    let profile = await Profile.findOne({ userId });

    // Auto-create a blank profile on first visit
    if (!profile) {
      profile = await Profile.create({
        userId,
        email: req.user.email || "",
        fullName: req.user.name || "",
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("getProfile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile. Please try again.",
    });
  }
};

/* ══════════════════════════════════════════════════════════════════════════
   POST /api/profile
   Creates a new profile for the authenticated user.
   Returns 409 if profile already exists.
══════════════════════════════════════════════════════════════════════════ */
const createProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const exists = await Profile.findOne({ userId });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Profile already exists. Use PUT to update.",
      });
    }

    const {
      fullName, email, phone, role, location, about,
      github, linkedin, portfolio, skills,
      experience, education, certifications, projects,
    } = req.body;

    const profile = await Profile.create({
      userId,
      fullName: fullName || "",
      email: email || req.user.email || "",
      phone: phone || "",
      role: role || "",
      location: location || "",
      about: about || "",
      github: github || "",
      linkedin: linkedin || "",
      portfolio: portfolio || "",
      skills: Array.isArray(skills) ? skills : [],
      experience: Array.isArray(experience) ? experience : [],
      education: Array.isArray(education) ? education : [],
      certifications: Array.isArray(certifications) ? certifications : [],
      projects: Array.isArray(projects) ? projects : [],
    });

    return res.status(201).json({
      success: true,
      message: "Profile created successfully.",
      data: profile,
    });
  } catch (error) {
    console.error("createProfile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create profile.",
    });
  }
};

/* ══════════════════════════════════════════════════════════════════════════
   PUT /api/profile
   Updates the authenticated user's profile.
   Auto-creates if not found (upsert behaviour).
══════════════════════════════════════════════════════════════════════════ */
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      fullName, email, phone, role, location, about,
      github, linkedin, portfolio, skills,
      experience, education, certifications, projects,
    } = req.body;

    // Build update payload — only include provided fields
    const updateData = {};
    if (fullName  !== undefined) updateData.fullName  = fullName.trim();
    if (email     !== undefined) updateData.email     = email.trim().toLowerCase();
    if (phone     !== undefined) updateData.phone     = phone.trim();
    if (role      !== undefined) updateData.role      = role.trim();
    if (location  !== undefined) updateData.location  = location.trim();
    if (about     !== undefined) updateData.about     = about.trim();
    if (github    !== undefined) updateData.github    = github.trim();
    if (linkedin  !== undefined) updateData.linkedin  = linkedin.trim();
    if (portfolio !== undefined) updateData.portfolio = portfolio.trim();

    if (skills !== undefined) {
      updateData.skills = Array.isArray(skills)
        ? skills.map((s) => s.trim()).filter(Boolean)
        : [];
    }
    if (experience     !== undefined) updateData.experience     = Array.isArray(experience)     ? experience     : [];
    if (education      !== undefined) updateData.education      = Array.isArray(education)      ? education      : [];
    if (certifications !== undefined) updateData.certifications = Array.isArray(certifications) ? certifications : [];
    if (projects       !== undefined) updateData.projects       = Array.isArray(projects)       ? projects       : [];

    // findOneAndUpdate with upsert so it works even if profile was deleted
    let profile = await Profile.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, upsert: true, runValidators: true }
    );

    // Recalculate completion after update
    profile.profileCompletion = profile.calculateCompletion();
    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: profile,
    });
  } catch (error) {
    console.error("updateProfile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile.",
    });
  }
};

/* ══════════════════════════════════════════════════════════════════════════
   DELETE /api/profile
   Permanently deletes the profile and all associated uploaded files.
══════════════════════════════════════════════════════════════════════════ */
const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
      });
    }

    // Clean up uploaded files
    deleteFile(profile.profileImage);
    deleteFile(profile.resume);

    await Profile.deleteOne({ userId });

    return res.status(200).json({
      success: true,
      message: "Profile deleted successfully.",
    });
  } catch (error) {
    console.error("deleteProfile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete profile.",
    });
  }
};

/* ══════════════════════════════════════════════════════════════════════════
   POST /api/profile/upload-photo
   Uploads a new profile photo and removes the previous one.
══════════════════════════════════════════════════════════════════════════ */
const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file received.",
      });
    }

    const userId = req.user.id;
    const newPath = buildPath("profiles", req.file.filename);

    // Delete old photo if it exists
    const existing = await Profile.findOne({ userId });
    if (existing?.profileImage) {
      deleteFile(existing.profileImage);
    }

    // Upsert profile with new photo path
    const profile = await Profile.findOneAndUpdate(
      { userId },
      { $set: { profileImage: newPath } },
      { new: true, upsert: true }
    );

    // Recalc completion
    profile.profileCompletion = profile.calculateCompletion();
    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Profile photo uploaded successfully.",
      data: {
        profileImage: newPath,
        profileCompletion: profile.profileCompletion,
      },
    });
  } catch (error) {
    console.error("uploadProfilePhoto error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to upload profile photo.",
    });
  }
};

/* ══════════════════════════════════════════════════════════════════════════
   POST /api/profile/upload-resume
   Uploads a new resume PDF and removes the previous one.
══════════════════════════════════════════════════════════════════════════ */
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume file received.",
      });
    }

    const userId = req.user.id;
    const newPath = buildPath("resumes", req.file.filename);

    // Delete old resume if it exists
    const existing = await Profile.findOne({ userId });
    if (existing?.resume) {
      deleteFile(existing.resume);
    }

    const profile = await Profile.findOneAndUpdate(
      { userId },
      { $set: { resume: newPath } },
      { new: true, upsert: true }
    );

    profile.profileCompletion = profile.calculateCompletion();
    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully.",
      data: {
        resume: newPath,
        profileCompletion: profile.profileCompletion,
      },
    });
  } catch (error) {
    console.error("uploadResume error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to upload resume.",
    });
  }
};

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  uploadProfilePhoto,
  uploadResume,
};