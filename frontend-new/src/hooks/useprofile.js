import { useState, useEffect, useCallback } from "react";
import {
  fetchProfile,
  updateProfile,
  uploadProfilePhoto,
  uploadResume,
} from "../api/profileApi";

/**
 * NexHire — useProfile Hook
 * Central hook for all profile state and operations.
 * Keeps the Profile page component clean and logic-free.
 */

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace("/api", "") ||
  "https://nexhire-z5c2.onrender.com";

const useProfile = () => {
  /* ── State ───────────────────────────────────────────────────────────── */
  const [profile, setProfile] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [saving,  setSaving]    = useState(false);
  const [photoUploading,  setPhotoUploading]  = useState(false);
  const [resumeUploading, setResumeUploading] = useState(false);

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  /* ── Toast helper ────────────────────────────────────────────────────── */
  const showToast = useCallback((message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3500);
  }, []);

  /* ── Load profile on mount ───────────────────────────────────────────── */
  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchProfile();
      if (res.success) setProfile(res.data);
    } catch (err) {
      console.error("loadProfile:", err);
      showToast("Failed to load profile. Please refresh.", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  /* ── Field change handler (supports nested paths like "experience.0.role") */
  const handleChange = useCallback((field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }, []);

  /* ── Save profile ────────────────────────────────────────────────────── */
  const handleSave = useCallback(async () => {
    if (!profile) return;

    // Basic validation
    if (!profile.fullName?.trim()) {
      showToast("Full name is required.", "error");
      return;
    }
    if (profile.email && !/\S+@\S+\.\S+/.test(profile.email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    try {
      setSaving(true);
      const res = await updateProfile({
        fullName:       profile.fullName,
        email:          profile.email,
        phone:          profile.phone,
        role:           profile.role,
        location:       profile.location,
        about:          profile.about,
        github:         profile.github,
        linkedin:       profile.linkedin,
        portfolio:      profile.portfolio,
        skills:         profile.skills,
        experience:     profile.experience,
        education:      profile.education,
        certifications: profile.certifications,
        projects:       profile.projects,
      });

      if (res.success) {
        setProfile(res.data);
        showToast("Profile saved successfully! ✅", "success");
      }
    } catch (err) {
      console.error("handleSave:", err);
      const msg = err.response?.data?.message || "Failed to save profile.";
      showToast(msg, "error");
    } finally {
      setSaving(false);
    }
  }, [profile, showToast]);

  /* ── Upload photo ────────────────────────────────────────────────────── */
  const handlePhotoUpload = useCallback(async (file) => {
    if (!file) return;

    // Immediate local preview
    const previewUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, _photoPreview: previewUrl }));

    try {
      setPhotoUploading(true);
      const res = await uploadProfilePhoto(file);
      if (res.success) {
        setProfile((prev) => ({
          ...prev,
          profileImage:     res.data.profileImage,
          profileCompletion: res.data.profileCompletion,
          _photoPreview:    null, // clear preview; use saved path
        }));
        showToast("Profile photo updated! ✅", "success");
      }
    } catch (err) {
      console.error("handlePhotoUpload:", err);
      setProfile((prev) => ({ ...prev, _photoPreview: null }));
      const msg = err.response?.data?.message || "Photo upload failed.";
      showToast(msg, "error");
    } finally {
      setPhotoUploading(false);
    }
  }, [showToast]);

  /* ── Upload resume ───────────────────────────────────────────────────── */
  const handleResumeUpload = useCallback(async (file) => {
    if (!file) return;

    try {
      setResumeUploading(true);
      const res = await uploadResume(file);
      if (res.success) {
        setProfile((prev) => ({
          ...prev,
          resume:           res.data.resume,
          profileCompletion: res.data.profileCompletion,
        }));
        showToast("Resume uploaded! ✅", "success");
      }
    } catch (err) {
      console.error("handleResumeUpload:", err);
      const msg = err.response?.data?.message || "Resume upload failed.";
      showToast(msg, "error");
    } finally {
      setResumeUploading(false);
    }
  }, [showToast]);

  /* ── Compute photo display URL ───────────────────────────────────────── */
  const photoUrl = profile?._photoPreview
    || (profile?.profileImage ? `${BASE_URL}/${profile.profileImage}` : null);

  const resumeUrl = profile?.resume
    ? `${BASE_URL}/${profile.resume}`
    : null;

  return {
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
  };
};

export default useProfile;