import { create } from 'zustand'

/**
 * store/uiStore.js — Global UI state
 *
 * Manages shared UI state that multiple components need to read/write
 * without prop drilling. Examples:
 * - A button in BookCard opens a modal → uiStore.openModal()
 * - A hook shows a toast after API success → uiStore.showToast()
 */
export const useUiStore = create((set) => ({
  // Modal state
  isModalOpen: false,
  modalContent: null,

  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),

  // Toast / notification state
  toast: null, // { message: string, type: 'success' | 'error' | 'info' }

  showToast: (message, type = 'success') =>
    set({ toast: { message, type } }),
  clearToast: () => set({ toast: null }),

  // Sidebar state (admin panel)
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}))
