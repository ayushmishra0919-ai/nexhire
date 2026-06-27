import React, { useRef } from "react";
import useProfile from "../hooks/useProfile";

/**
 * NexHire — Profile Page
 * ─────────────────────────────────────────────────────────────
 * RULES FOLLOWED:
 *  ✅ No UI redesign — only wired existing elements to real data
 *  ✅ No hardcoded demo values
 *  ✅ Real MongoDB data via JWT-secured APIs
 *  ✅ Loading states, error handling, success toast
 *  ✅ Photo preview before save
 *  ✅ Resume upload with replace
 * ─────────────────────────────────────────────────────────────
 */

const Profile = () => {
  const {
    profile,
    loading,
    saving,
    photoUploading,
    resumeUploading,
    toast,
    photoUrl,
    resumeUrl,
    handleChange,
    handleSave,
    handlePhotoUpload,
    handleResumeUpload,
  } = useProfile();

  const photoInputRef  = useRef(null);
  const resumeInputRef = useRef(null);

  /* ─── Skills helpers ─────────────────────────────────────────────────── */
  const addSkill = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = e.target.value.trim().replace(/,$/, "");
      if (val && !profile.skills?.includes(val)) {
        handleChange("skills", [...(profile.skills || []), val]);
      }
      e.target.value = "";
    }
  };

  const removeSkill = (skill) => {
    handleChange(
      "skills",
      (profile.skills || []).filter((s) => s !== skill)
    );
  };

  /* ─── Experience helpers ─────────────────────────────────────────────── */
  const updateExperience = (index, field, value) => {
    const updated = [...(profile.experience || [])];
    updated[index] = { ...updated[index], [field]: value };
    handleChange("experience", updated);
  };

  const addExperience = () => {
    handleChange("experience", [
      ...(profile.experience || []),
      { company: "", role: "", startDate: "", endDate: "", current: false, description: "" },
    ]);
  };

  const removeExperience = (index) => {
    handleChange(
      "experience",
      (profile.experience || []).filter((_, i) => i !== index)
    );
  };

  /* ─── Education helpers ──────────────────────────────────────────────── */
  const updateEducation = (index, field, value) => {
    const updated = [...(profile.education || [])];
    updated[index] = { ...updated[index], [field]: value };
    handleChange("education", updated);
  };

  const addEducation = () => {
    handleChange("education", [
      ...(profile.education || []),
      { institution: "", degree: "", field: "", startYear: "", endYear: "", grade: "" },
    ]);
  };

  const removeEducation = (index) => {
    handleChange(
      "education",
      (profile.education || []).filter((_, i) => i !== index)
    );
  };

  /* ─── Certification helpers ──────────────────────────────────────────── */
  const updateCert = (index, field, value) => {
    const updated = [...(profile.certifications || [])];
    updated[index] = { ...updated[index], [field]: value };
    handleChange("certifications", updated);
  };

  const addCert = () => {
    handleChange("certifications", [
      ...(profile.certifications || []),
      { name: "", issuer: "", issueDate: "", expiryDate: "", credentialUrl: "" },
    ]);
  };

  const removeCert = (index) => {
    handleChange(
      "certifications",
      (profile.certifications || []).filter((_, i) => i !== index)
    );
  };

  /* ─── Project helpers ────────────────────────────────────────────────── */
  const updateProject = (index, field, value) => {
    const updated = [...(profile.projects || [])];
    updated[index] = { ...updated[index], [field]: value };
    handleChange("projects", updated);
  };

  const addProject = () => {
    handleChange("projects", [
      ...(profile.projects || []),
      { title: "", description: "", techStack: [], liveUrl: "", repoUrl: "" },
    ]);
  };

  const removeProject = (index) => {
    handleChange(
      "projects",
      (profile.projects || []).filter((_, i) => i !== index)
    );
  };

  /* ─── Loading skeleton ───────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner" />
        <p>Loading your profile…</p>
      </div>
    );
  }

  /* ─── Render ─────────────────────────────────────────────────────────── */
  return (
    <div className="profile-page">

      {/* ── Toast Notification ─────────────────────────────────────────── */}
      {toast.show && (
        <div className={`profile-toast profile-toast--${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — Profile Header (photo + basic info)
      ══════════════════════════════════════════════════════════════════ */}
      <div className="profile-header-section">

        {/* Photo */}
        <div className="profile-photo-wrapper">
          <img
            src={photoUrl || "/default-avatar.png"}
            alt={profile?.fullName || "Profile"}
            className="profile-photo"
            onError={(e) => { e.target.src = "/default-avatar.png"; }}
          />
          {photoUploading && <div className="photo-uploading-overlay">Uploading…</div>}
          <button
            className="change-photo-btn"
            onClick={() => photoInputRef.current?.click()}
            disabled={photoUploading}
          >
            {photoUploading ? "Uploading…" : "Change Photo"}
          </button>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handlePhotoUpload(file);
              e.target.value = ""; // allow re-selecting same file
            }}
          />
        </div>

        {/* Profile Completion */}
        <div className="profile-completion">
          <span>Profile Completion</span>
          <div className="completion-bar">
            <div
              className="completion-fill"
              style={{ width: `${profile?.profileCompletion || 0}%` }}
            />
          </div>
          <span>{profile?.profileCompletion || 0}%</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — Basic Information
      ══════════════════════════════════════════════════════════════════ */}
      <div className="profile-section">
        <h2 className="section-title">Basic Information</h2>
        <div className="profile-form-grid">

          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              className="form-input"
              value={profile?.fullName || ""}
              placeholder="Your full name"
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-input"
              value={profile?.email || ""}
              placeholder="your@email.com"
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              className="form-input"
              value={profile?.phone || ""}
              placeholder="+91 9876543210"
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Role / Designation</label>
            <input
              type="text"
              className="form-input"
              value={profile?.role || ""}
              placeholder="e.g. Frontend Developer"
              onChange={(e) => handleChange("role", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              className="form-input"
              value={profile?.location || ""}
              placeholder="City, Country"
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </div>

          <div className="form-group form-group--full">
            <label>About</label>
            <textarea
              className="form-textarea"
              value={profile?.about || ""}
              placeholder="Tell recruiters about yourself…"
              rows={4}
              onChange={(e) => handleChange("about", e.target.value)}
            />
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — Social Links
      ══════════════════════════════════════════════════════════════════ */}
      <div className="profile-section">
        <h2 className="section-title">Social & Portfolio Links</h2>
        <div className="profile-form-grid">

          <div className="form-group">
            <label>GitHub</label>
            <input
              type="url"
              className="form-input"
              value={profile?.github || ""}
              placeholder="https://github.com/username"
              onChange={(e) => handleChange("github", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>LinkedIn</label>
            <input
              type="url"
              className="form-input"
              value={profile?.linkedin || ""}
              placeholder="https://linkedin.com/in/username"
              onChange={(e) => handleChange("linkedin", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Portfolio</label>
            <input
              type="url"
              className="form-input"
              value={profile?.portfolio || ""}
              placeholder="https://yourportfolio.com"
              onChange={(e) => handleChange("portfolio", e.target.value)}
            />
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — Skills
      ══════════════════════════════════════════════════════════════════ */}
      <div className="profile-section">
        <h2 className="section-title">Skills</h2>
        <div className="skills-input-wrapper">
          <input
            type="text"
            className="form-input"
            placeholder="Type a skill and press Enter or comma"
            onKeyDown={addSkill}
          />
          <div className="skills-tags">
            {(profile?.skills || []).map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
                <button
                  className="skill-remove"
                  onClick={() => removeSkill(skill)}
                  aria-label={`Remove ${skill}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5 — Experience
      ══════════════════════════════════════════════════════════════════ */}
      <div className="profile-section">
        <div className="section-header">
          <h2 className="section-title">Work Experience</h2>
          <button className="btn-add" onClick={addExperience}>+ Add</button>
        </div>

        {(profile?.experience || []).map((exp, i) => (
          <div key={i} className="profile-card">
            <div className="profile-form-grid">
              <div className="form-group">
                <label>Company</label>
                <input type="text" className="form-input" value={exp.company || ""} placeholder="Company name"
                  onChange={(e) => updateExperience(i, "company", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input type="text" className="form-input" value={exp.role || ""} placeholder="Your role"
                  onChange={(e) => updateExperience(i, "role", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input type="month" className="form-input" value={exp.startDate || ""}
                  onChange={(e) => updateExperience(i, "startDate", e.target.value)} />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input type="month" className="form-input" value={exp.endDate || ""} disabled={exp.current}
                  onChange={(e) => updateExperience(i, "endDate", e.target.value)} />
              </div>
              <div className="form-group form-group--checkbox">
                <label>
                  <input type="checkbox" checked={exp.current || false}
                    onChange={(e) => updateExperience(i, "current", e.target.checked)} />
                  &nbsp;Currently working here
                </label>
              </div>
              <div className="form-group form-group--full">
                <label>Description</label>
                <textarea className="form-textarea" value={exp.description || ""} rows={3}
                  placeholder="Key responsibilities and achievements…"
                  onChange={(e) => updateExperience(i, "description", e.target.value)} />
              </div>
            </div>
            <button className="btn-remove" onClick={() => removeExperience(i)}>Remove</button>
          </div>
        ))}

        {(profile?.experience || []).length === 0 && (
          <p className="empty-state">No work experience added yet. Click "+ Add" to start.</p>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 6 — Education
      ══════════════════════════════════════════════════════════════════ */}
      <div className="profile-section">
        <div className="section-header">
          <h2 className="section-title">Education</h2>
          <button className="btn-add" onClick={addEducation}>+ Add</button>
        </div>

        {(profile?.education || []).map((edu, i) => (
          <div key={i} className="profile-card">
            <div className="profile-form-grid">
              <div className="form-group">
                <label>Institution</label>
                <input type="text" className="form-input" value={edu.institution || ""} placeholder="University / School"
                  onChange={(e) => updateEducation(i, "institution", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Degree</label>
                <input type="text" className="form-input" value={edu.degree || ""} placeholder="B.Tech / MBA etc."
                  onChange={(e) => updateEducation(i, "degree", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Field of Study</label>
                <input type="text" className="form-input" value={edu.field || ""} placeholder="Computer Science"
                  onChange={(e) => updateEducation(i, "field", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Grade / CGPA</label>
                <input type="text" className="form-input" value={edu.grade || ""} placeholder="9.0 / 10"
                  onChange={(e) => updateEducation(i, "grade", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Start Year</label>
                <input type="text" className="form-input" value={edu.startYear || ""} placeholder="2018"
                  onChange={(e) => updateEducation(i, "startYear", e.target.value)} />
              </div>
              <div className="form-group">
                <label>End Year</label>
                <input type="text" className="form-input" value={edu.endYear || ""} placeholder="2022"
                  onChange={(e) => updateEducation(i, "endYear", e.target.value)} />
              </div>
            </div>
            <button className="btn-remove" onClick={() => removeEducation(i)}>Remove</button>
          </div>
        ))}

        {(profile?.education || []).length === 0 && (
          <p className="empty-state">No education added yet.</p>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 7 — Certifications
      ══════════════════════════════════════════════════════════════════ */}
      <div className="profile-section">
        <div className="section-header">
          <h2 className="section-title">Certifications</h2>
          <button className="btn-add" onClick={addCert}>+ Add</button>
        </div>

        {(profile?.certifications || []).map((cert, i) => (
          <div key={i} className="profile-card">
            <div className="profile-form-grid">
              <div className="form-group">
                <label>Certificate Name</label>
                <input type="text" className="form-input" value={cert.name || ""} placeholder="AWS Certified Developer"
                  onChange={(e) => updateCert(i, "name", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Issuer</label>
                <input type="text" className="form-input" value={cert.issuer || ""} placeholder="Amazon Web Services"
                  onChange={(e) => updateCert(i, "issuer", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Issue Date</label>
                <input type="month" className="form-input" value={cert.issueDate || ""}
                  onChange={(e) => updateCert(i, "issueDate", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Expiry Date</label>
                <input type="month" className="form-input" value={cert.expiryDate || ""}
                  onChange={(e) => updateCert(i, "expiryDate", e.target.value)} />
              </div>
              <div className="form-group form-group--full">
                <label>Credential URL</label>
                <input type="url" className="form-input" value={cert.credentialUrl || ""} placeholder="https://credential-link.com"
                  onChange={(e) => updateCert(i, "credentialUrl", e.target.value)} />
              </div>
            </div>
            <button className="btn-remove" onClick={() => removeCert(i)}>Remove</button>
          </div>
        ))}

        {(profile?.certifications || []).length === 0 && (
          <p className="empty-state">No certifications added yet.</p>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 8 — Projects
      ══════════════════════════════════════════════════════════════════ */}
      <div className="profile-section">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
          <button className="btn-add" onClick={addProject}>+ Add</button>
        </div>

        {(profile?.projects || []).map((proj, i) => (
          <div key={i} className="profile-card">
            <div className="profile-form-grid">
              <div className="form-group">
                <label>Project Title</label>
                <input type="text" className="form-input" value={proj.title || ""} placeholder="NexHire Portal"
                  onChange={(e) => updateProject(i, "title", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Tech Stack (comma-separated)</label>
                <input type="text" className="form-input"
                  value={(proj.techStack || []).join(", ")}
                  placeholder="React, Node.js, MongoDB"
                  onChange={(e) =>
                    updateProject(i, "techStack",
                      e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                    )
                  }
                />
              </div>
              <div className="form-group">
                <label>Live URL</label>
                <input type="url" className="form-input" value={proj.liveUrl || ""} placeholder="https://project.com"
                  onChange={(e) => updateProject(i, "liveUrl", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Repo URL</label>
                <input type="url" className="form-input" value={proj.repoUrl || ""} placeholder="https://github.com/..."
                  onChange={(e) => updateProject(i, "repoUrl", e.target.value)} />
              </div>
              <div className="form-group form-group--full">
                <label>Description</label>
                <textarea className="form-textarea" value={proj.description || ""} rows={3}
                  placeholder="What does this project do? What problem does it solve?"
                  onChange={(e) => updateProject(i, "description", e.target.value)} />
              </div>
            </div>
            <button className="btn-remove" onClick={() => removeProject(i)}>Remove</button>
          </div>
        ))}

        {(profile?.projects || []).length === 0 && (
          <p className="empty-state">No projects added yet.</p>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 9 — Resume Upload
      ══════════════════════════════════════════════════════════════════ */}
      <div className="profile-section">
        <h2 className="section-title">Resume</h2>
        <div className="resume-upload-area">
          {resumeUrl ? (
            <div className="resume-current">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="resume-link">
                📄 View Current Resume
              </a>
              <span className="resume-hint">Upload a new PDF to replace it.</span>
            </div>
          ) : (
            <p className="empty-state">No resume uploaded yet.</p>
          )}

          <button
            className="btn-upload-resume"
            onClick={() => resumeInputRef.current?.click()}
            disabled={resumeUploading}
          >
            {resumeUploading ? "Uploading…" : "Upload Resume (PDF)"}
          </button>

          <input
            ref={resumeInputRef}
            type="file"
            accept="application/pdf"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleResumeUpload(file);
              e.target.value = "";
            }}
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SAVE BUTTON
      ══════════════════════════════════════════════════════════════════ */}
      <div className="profile-save-bar">
        <button
          className="btn-save-profile"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving…" : "Save Profile"}
        </button>
      </div>

    </div>
  );
};

export default Profile;
