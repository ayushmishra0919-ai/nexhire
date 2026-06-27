const mongoose = require("mongoose");

/**
 * NexHire — Profile Schema
 * Stores all user profile data linked to the authenticated user.
 */
const ExperienceSchema = new mongoose.Schema(
  {
    company: { type: String, trim: true },
    role: { type: String, trim: true },
    startDate: { type: String },
    endDate: { type: String },
    current: { type: Boolean, default: false },
    description: { type: String, trim: true },
  },
  { _id: true }
);

const EducationSchema = new mongoose.Schema(
  {
    institution: { type: String, trim: true },
    degree: { type: String, trim: true },
    field: { type: String, trim: true },
    startYear: { type: String },
    endYear: { type: String },
    grade: { type: String, trim: true },
  },
  { _id: true }
);

const CertificationSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    issuer: { type: String, trim: true },
    issueDate: { type: String },
    expiryDate: { type: String },
    credentialUrl: { type: String, trim: true },
  },
  { _id: true }
);

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    techStack: [{ type: String, trim: true }],
    liveUrl: { type: String, trim: true },
    repoUrl: { type: String, trim: true },
  },
  { _id: true }
);

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    fullName: { type: String, trim: true, default: "" },
    email: { type: String, trim: true, lowercase: true, default: "" },
    phone: { type: String, trim: true, default: "" },
    role: { type: String, trim: true, default: "" },       // e.g. "Frontend Developer"
    location: { type: String, trim: true, default: "" },
    about: { type: String, trim: true, default: "" },

    // Social / Portfolio links
    github: { type: String, trim: true, default: "" },
    linkedin: { type: String, trim: true, default: "" },
    portfolio: { type: String, trim: true, default: "" },

    // Skills stored as array of strings
    skills: [{ type: String, trim: true }],

    // File paths (relative, served as static)
    profileImage: { type: String, default: "" },
    resume: { type: String, default: "" },

    // Nested documents
    experience: [ExperienceSchema],
    education: [EducationSchema],
    certifications: [CertificationSchema],
    projects: [ProjectSchema],

    // Computed field (0–100) — recalculated on every save
    profileCompletion: { type: Number, default: 0, min: 0, max: 100 },
  },
  { timestamps: true }
);

/* ─── Helper: Calculate profile completion percentage ─────────────────────── */
ProfileSchema.methods.calculateCompletion = function () {
  const fields = [
    this.fullName,
    this.email,
    this.phone,
    this.role,
    this.location,
    this.about,
    this.github || this.linkedin || this.portfolio, // at least one social
    this.skills?.length > 0,
    this.profileImage,
    this.resume,
    this.experience?.length > 0,
    this.education?.length > 0,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
};

/* ─── Pre-save: always recalculate completion ─────────────────────────────── */
ProfileSchema.pre("save", function (next) {
  this.profileCompletion = this.calculateCompletion();
  next();
});

ProfileSchema.pre("findOneAndUpdate", async function (next) {
  // After update, trigger a recalc by fetching and re-saving if needed.
  // We handle this explicitly in the controller instead for performance.
  next();
});

module.exports = mongoose.model("Profile", ProfileSchema);