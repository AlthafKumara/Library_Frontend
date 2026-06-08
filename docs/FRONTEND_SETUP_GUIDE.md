# Frontend Web Development Setup Guide

Panduan ini berisi standar instalasi, struktur file, dan konfigurasi dasar untuk memulai project web frontend modern. Gunakan panduan ini sebagai *boilerplate* atau referensi utama (global guide) saat membuat project web baru di masa mendatang.

## 📦 1. Tech Stack & Versions

- **Framework:** React 19
- **Bundler:** Vite 8 (menggunakan Rolldown)
- **Routing:** React Router DOM (v7)
- **Server State / Data Fetching:** TanStack Query (v5)
- **Client State Management:** Zustand (v5)
- **HTTP Client:** Axios (v1)
- **Styling:** Tailwind CSS (v4)
- **Package Manager:** pnpm

---

## 🚀 2. Langkah Instalasi

Jalankan perintah berikut secara berurutan untuk melakukan inisialisasi dan setup awal project.

### Scaffold Project dengan Vite
```bash
pnpm create vite@latest nama-project --template react
cd nama-project
pnpm install
```

### Install Dependencies Utama
```bash
# Install routing, state management, dan HTTP client
pnpm add react-router-dom @tanstack/react-query zustand axios

# Install Tailwind CSS v4 (menggunakan Vite plugin) dan React Query Devtools
pnpm add -D tailwindcss @tailwindcss/vite @tanstack/react-query-devtools
```

---

## ⚙️ 3. Konfigurasi Dasar

Setelah semua package terinstall, sesuaikan file-file konfigurasi berikut agar saling terhubung dengan baik:

### `vite.config.js`
Tambahkan plugin Tailwind dan konfigurasi *path alias* (`@` untuk mereferensikan folder `src` sehingga import lebih rapi, contoh: `import Button from '@/components/ui/Button'`).
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### `src/index.css`
Hapus konfigurasi bawaan. Gunakan sintaks `@import` khas Tailwind v4. Letakkan *design tokens* (variabel warna, font, shadow, dll) di bawah import ini.
```css
@import "tailwindcss";

/* ─── Design Tokens ─────────────────────────────────── */
:root {
  --bg: #ffffff;
  --text: #333333;
}

body {
  margin: 0;
  background-color: var(--bg);
  color: var(--text);
}
```

### `src/main.jsx`
Bungkus keseluruhan aplikasi dengan `QueryClientProvider` dari TanStack Query untuk mengaktifkan fitur caching dan state management dari server. Ini juga merupakan tempat untuk memasang `ReactQueryDevtools` (hanya muncul di environment development, otomatis hilang saat build production).
```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import App from './App.jsx'

// Konfigurasi default agar query tidak refetch terus-menerus
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data dianggap fresh selama 5 menit
      retry: 1,                 // Retry 1 kali jika request gagal sebelum menampilkan error
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
```

### `src/App.jsx`
Bersihkan kode *counter* bawaan Vite dan jadikan `App.jsx` sebagai *shell* untuk sistem routing.
```javascript
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router/index.jsx'

function App() {
  return <RouterProvider router={router} />
}

export default App
```

### `.env` & `.env.example`
Buat file di *root directory* untuk *environment variables*. Gunakan awalan `VITE_` agar bisa diakses di React. Jangan pernah commit file `.env` ke Git.
```env
# .env.example
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

---

## 📂 4. Standar Struktur File

Pendekatan ini menggunakan arsitektur **Type-Based dengan Smart Sub-grouping**. Cocok untuk menjaga project agar tidak berantakan saat skalanya membesar, namun tetap mudah dipahami.

```text
src/
├── assets/                       ← Aset statis (images, icons, fonts) yang diproses & di-hash oleh Vite
├── components/                   ← Reusable UI (HANYA komponen yang dipakai di >= 2 halaman)
│   ├── ui/                       ← Dumb components murni (Button, Input, Modal, Spinner)
│   ├── layout/                   ← Komponen struktural/shell (Navbar, Sidebar, Footer, ProtectedRoute)
│   └── shared/                   ← Komponen terkait domain bisnis (BookCard, UserAvatar, EmptyState)
├── hooks/                        ← Custom React Hooks
│   └── useBooks.js               ← Membungkus axios service API dengan useQuery/useMutation
├── pages/                        ← Komponen Halaman tingkat-Route (Route-level components)
│   ├── auth/                     ← Halaman terkait modul auth (Login, Register)
│   ├── books/                    ← Kelompok halaman fitur terkait
│   │   ├── BookListPage.jsx      ← Halaman daftar buku
│   │   └── components/           ← Komponen lokal yang HANYA dipakai di dalam modul halaman ini
│   └── NotFoundPage.jsx          ← Halaman 404 global
├── router/
│   ├── index.jsx                 ← Definisi rute sentral aplikasi menggunakan createBrowserRouter
│   └── guards.jsx                ← Utilitas fungsi pengecekan otorisasi (isAdmin, isAuthenticated)
├── services/                     ← Layer API (Axios instance & file per domain)
│   ├── api.js                    ← Axios instance utama dengan request/response interceptors (auth token & 401 refresh mechanism)
│   └── bookService.js            ← Endpoint wrappers pure JS (tanpa sintaks React) untuk request ke backend
├── store/                        ← Global Client State (Zustand)
│   ├── authStore.js              ← Single Source of Truth untuk state identitas user & JWT access token
│   └── uiStore.js                ← State UI global (status Modal, Toast/Notifikasi, Sidebar state)
├── utils/                        ← Pure JavaScript Helpers
│   ├── constants.js              ← App-wide magic strings, roles config, status enums, route paths
│   ├── formatters.js             ← Fungsi format teks, angka, dan tanggal (formatDate, truncateText)
│   ├── validators.js             ← Validasi form sisi klien (mirip dengan skema Zod di backend)
│   └── helpers.js                ← Fungsi utilitas fungsional murni (buildFormData, getInitials)
├── App.jsx                       ← Root component penyambung RouterProvider
├── index.css                     ← Arahan Tailwind v4 & global base CSS
└── main.jsx                      ← React entry point penghubung DOM
```

---

## ⚖️ 5. Golden Rules (Aturan Utama Development)

1. **Hierarki Data Layer (`pages` ➔ `hooks` ➔ `services`):** 
   Jangan pernah memanggil endpoint axios/`services` langsung di dalam komponen `pages/`. Panggil `services/` di dalam `hooks/` menggunakan fungsi TanStack Query (`useQuery`/`useMutation`), barulah gunakan `hooks` tersebut di komponen `pages`.
2. **Promosi Komponen Secara Berkala:** 
   Secara default, buat komponen baru di folder halaman spesifik tempat ia digunakan (`pages/nama-fitur/components/`). Pindahkan komponen ke folder `src/components/shared/` **hanya** jika ada halaman lain (halaman kedua) yang membutuhkannya.
3. **Single Source of Truth untuk Identitas (Auth):** 
   Gunakan `authStore.js` (Zustand) sebagai satu-satunya penyimpan dan penyedia status *Login* serta `accessToken`. Jangan menyimpan token telanjang secara acak di `localStorage`.
4. **Pisahkan Jenis State:** 
   - **TanStack Query** untuk *Server State* (data katalog, user, postingan dari database).
   - **Zustand** untuk *Client State* (sesi user/auth, status toggle sidebar, pesan notifikasi UI).
5. **No Magic Strings:** 
   Apabila ada nilai string baku yang berulang-ulang seperti `'admin'`, `'pending'`, atau path `/auth/login`, wajib diletakkan di dalam `src/utils/constants.js` sebagai variabel `const`.
6. **Interceptor Axios Mengurus Refresh Token:** 
   Logika perpanjangan sesi (refresh token saat *401 Unauthorized*) dipusatkan di dalam Response Interceptor pada file `src/services/api.js`. Komponen UI di bagian atas tidak perlu pusing memikirkan token *expired*.
