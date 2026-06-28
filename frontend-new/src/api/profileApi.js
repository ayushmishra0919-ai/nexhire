import axiosInstance from "./axiosInstance";

/**
 * NexHire — Profile API Service
 * Encapsulates all HTTP calls related to the profile resource.
 */

/* ─── GET /api/profile ───────────────────────────────────────────────────── */
export const fetchProfile = async () => {
  const { data } = await axiosInstance.get("/profile");
  return data; // { success, data: profile }
};

/* ─── PUT /api/profile ───────────────────────────────────────────────────── */
export const updateProfile = async (payload) => {
  const { data } = await axiosInstance.put("/profile", payload);
  return data;
};

/* ─── POST /api/profile/upload-photo ────────────────────────────────────── */
export const uploadProfilePhoto = async (file) => {
  const formData = new FormData();
  formData.append("profileImage", file);

  const { data } = await axiosInstance.post("/profile/upload-photo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data; // { success, data: { profileImage, profileCompletion } }
};

/* ─── POST /api/profile/upload-resume ───────────────────────────────────── */
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const { data } = await axiosInstance.post("/profile/upload-resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data; // { success, data: { resume, profileCompletion } }
};

/* ─── DELETE /api/profile ────────────────────────────────────────────────── */
export const deleteProfile = async () => {
  const { data } = await axiosInstance.delete("/profile");
  return data;
};