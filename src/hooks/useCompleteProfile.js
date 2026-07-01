import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "../store/profileStore";
import { useToastStore } from "../store/toastStore";
import { completeProfile, uploadPhotoProfile } from "../services/profileService";
import { ROUTES } from "../utils/constants";

/**
 * hooks/useCompleteProfile.js — State + logic for the Complete Profile page.
 *
 * API Flow:
 *  - If photo file is selected AND all fields filled:
 *      → Calls POST /profile/photo AND PUT /profile/complete-profile in parallel.
 *      → The photo URL from the upload response is included in the complete-profile body.
 *  - If only name + gender filled (no photo):
 *      → Calls ONLY PUT /profile/complete-profile.
 *
 * Returns all state and handlers needed by CompleteProfilePage.
 */
export function useCompleteProfile() {
  const navigate = useNavigate();

  // ─── Form Fields ──────────────────────────────────────────────────
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  // The selected File object (null if no photo chosen)
  const [photoFile, setPhotoFile] = useState(null);
  // Local object-URL for previewing the selected image
  const [photoPreview, setPhotoPreview] = useState(null);

  // ─── UI State ─────────────────────────────────────────────────────
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // Ref to the hidden <input type="file"> so the avatar circle can open it
  const fileInputRef = useRef(null);

  // ─── Photo Selection Handler ───────────────────────────────────────
  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Revoke previous preview URL to avoid memory leaks
    if (photoPreview) URL.revokeObjectURL(photoPreview);

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    // Clear any previous photo error
    setErrors((prev) => ({ ...prev, photo: "" }));
  }

  function handleAvatarClick() {
    fileInputRef.current?.click();
  }

  // ─── Field Change Handlers ─────────────────────────────────────────
  function onNameChange(e) {
    setName(e.target.value);
    setErrors((prev) => ({ ...prev, name: "" }));
    setServerError("");
  }

  function onGenderChange(e) {
    setGender(e.target.value);
    setErrors((prev) => ({ ...prev, gender: "" }));
    setServerError("");
  }

  // ─── Client-Side Validation ────────────────────────────────────────
  function validate() {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!gender) {
      newErrors.gender = "Please select a gender.";
    }

    return newErrors;
  }

  // ─── Submit Handler ────────────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      let photoUrl = null;

      if (photoFile) {
        // ── Branch A: Photo selected → upload in parallel with profile update ──
        const [uploadResult, profileResult] = await Promise.all([
          uploadPhotoProfile(photoFile),
          completeProfile({
            name: name.trim(),
            gender,
          }),
        ]);

        // Extract uploaded photo URL from upload response (adjust key if backend differs)
        photoUrl =
          uploadResult?.data?.photoProfile ??
          uploadResult?.data?.photo_profile ??
          uploadResult?.data?.url ??
          null;

        // Merge photo URL into the profile store update
        const updatedProfile = profileResult?.data ?? {};
        if (photoUrl) updatedProfile.photoProfile = photoUrl;

        useProfileStore.getState().setProfile(updatedProfile);
      } else {
        // ── Branch B: No photo → only call complete-profile ──
        const { data: updatedProfile } = await completeProfile({
          name: name.trim(),
          gender,
        });
        useProfileStore.getState().setProfile(updatedProfile);
      }

      const { isAdmin } = useProfileStore.getState();
      useToastStore
        .getState()
        .addToast("Profile completed successfully!", "success");

      navigate(isAdmin ? ROUTES.ADMIN_DASHBOARD : ROUTES.HOME);
    } catch (err) {
      const msg = err.message || "Something went wrong. Please try again.";
      setServerError(msg);
      useToastStore.getState().addToast(msg, "error");
    } finally {
      setLoading(false);
    }
  }

  return {
    // Fields
    name,
    gender,
    photoFile,
    photoPreview,

    // State
    errors,
    loading,
    serverError,

    // Handlers
    handleAvatarClick,
    handlePhotoChange,
    onNameChange,
    onGenderChange,
    handleSubmit,

    // Ref
    fileInputRef,
  };
}
