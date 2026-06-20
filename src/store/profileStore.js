import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useProfileStore = create(
  persist(
    (set) => ({
      id:           null,
      name:         null,
      email:        null,
      role:         null,
      gender:       null,
      photoProfile: null,
      isAdmin:      false,
      createdAt:    null,
      updatedAt:    null,

      setProfile: (profile) => set({
        id:           profile.id,
        name:         profile.name,
        email:        profile.email,
        role:         profile.role,
        gender:       profile.gender,
        photoProfile: profile.photoProfile,
        isAdmin:      profile.role === 'admin',
        createdAt:    profile.created_at,
        updatedAt:    profile.updated_at,
      }),

      clearProfile: () => set({
        id: null, name: null, email: null,
        role: null, gender: null, photoProfile: null,
        isAdmin: false, createdAt: null, updatedAt: null,
      }),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        id:           state.id,
        name:         state.name,
        role:         state.role,
        photoProfile: state.photoProfile,
        isAdmin:      state.isAdmin,
      }),
    }
  )
)
