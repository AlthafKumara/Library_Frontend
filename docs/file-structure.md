# Frontend File Structure — Library Management & Community Platform

> **Stack:** React 19 + Vite + React Router DOM + Axios + Tailwind CSS + TanStack Query + Zustand
> **Generated:** 2026-06-08
> **Based on:** [`PRD.md`](./PRD.md) & [`api_documentation.md`](./api_documentation.md)

---

## Understanding Summary

- **What is being built:** A frontend SPA for a Library Management & Community Platform
- **Why it exists:** To provide a UI for browsing books, borrowing, community discussions, and saved lists — for 3 user roles
- **Who it is for:** Guest users (public browsing), Registered Members (borrow, community, saved lists), Administrators (catalog & borrow management)
- **Key constraints:** JWT access token stored in memory (Zustand), HTTP-only cookie refresh token, role-based route protection, file uploads (profile photo, book cover), cursor-based pagination (community)
- **Architecture:** Type-Based (Classic) with smart sub-grouping — flat by type at top level, sub-grouped within folders
- **Explicit non-goals:** SSR, Next.js, backend changes, TypeScript (using `.jsx`)

---

## Assumptions

| # | Assumption | Status |
|---|---|---|
| 1 | Admin panel is part of the same SPA, protected by role-based routes | Assumed |
| 2 | Team is small (1-5 devs) — structure is clear, not over-engineered | Assumed |
| 3 | No TypeScript for now — project uses `.jsx` extensions | Observed from scaffolding |
| 4 | TanStack Query handles server state; Zustand handles client/auth state | Recommended & accepted |
| 5 | Build target is SPA — no SSR needed | Inferred from Vite config |
| 6 | `VITE_API_BASE_URL` env variable points to `/api/v1` backend | From API docs |

---

## Decision Log

| Decision | Alternatives Considered | Why This Was Chosen |
|---|---|---|
| **Type-Based file structure** | Feature-Based, Hybrid | Chosen by user — simpler mental model for a small team |
| **Sub-grouping inside `components/`** (ui/, layout/, shared/) | Flat components/ folder | Prevents components/ becoming a dumping ground as the project grows |
| **Local `components/` inside page folders** | All components in top-level components/ | Page-specific components stay close to their only consumer; promoted to shared only when needed by a second page |
| **TanStack Query + Zustand** | Redux Toolkit, Context API only, Zustand only | TanStack Query eliminates boilerplate for server state (loading, caching, error); Zustand handles auth identity with minimal setup |
| **Axios + interceptors** | Native fetch | Interceptors enable automatic token injection and transparent refresh-token retry on 401 |
| **`services/` + `hooks/` separation** | Combining API calls inside hooks | services/ = pure async functions (no React); hooks/ = pure React wrappers (no HTTP). Each layer is independently testable |
| **One service file per API domain** | Single api.js file for all calls | Mirrors backend route grouping 1:1; easy to locate any endpoint |

---

## Final File Structure

```
library_FE/
├── public/
│   └── favicon.ico                   ← Browser tab icon, served at root URL as-is
│
├── src/
│   │
│   ├── assets/                       ← Static files processed & optimized by Vite
│   │   ├── images/
│   │   │   ├── logo.png              ← App logo used in Navbar and Auth pages
│   │   │   └── empty-state.svg       ← Illustration for EmptyState component
│   │   └── icons/
│   │       └── book-icon.svg         ← Domain-specific SVG icons used in components
│   │
│   ├── components/                   ← Reusable UI — only components used in 2+ pages
│   │   │
│   │   ├── ui/                       ← Pure, dumb components with no business logic
│   │   │   ├── Button.jsx            ← Generic button; accepts variant, size, onClick props
│   │   │   ├── Input.jsx             ← Input field with label and error message slot
│   │   │   ├── Modal.jsx             ← Generic overlay; accepts isOpen, onClose, children
│   │   │   ├── Badge.jsx             ← Status pill; used for borrow statuses (pending, overdue, etc.)
│   │   │   └── Spinner.jsx           ← Loading spinner shown during API calls
│   │   │
│   │   ├── layout/                   ← Structural shell components
│   │   │   ├── Navbar.jsx            ← Top nav; shows login/register or user avatar based on auth state
│   │   │   ├── Sidebar.jsx           ← Admin sidebar; only rendered on admin routes
│   │   │   ├── Footer.jsx            ← Page footer
│   │   │   └── ProtectedRoute.jsx    ← Wraps private routes; redirects to /login if unauthenticated; blocks non-admins from admin routes
│   │   │
│   │   └── shared/                   ← Domain-aware components reused across multiple pages
│   │       ├── BookCard.jsx          ← Book display card (cover, title, author, stock); used in catalog, saved lists, search
│   │       ├── UserAvatar.jsx        ← Profile photo with fallback initials; used in Navbar and community messages
│   │       └── EmptyState.jsx        ← "No results found" illustration; reused in books, borrows, saved lists
│   │
│   ├── hooks/                        ← Custom React hooks — wrap services with TanStack Query
│   │   ├── useAuth.js                ← Exposes user, login(), logout(), isAuthenticated, isAdmin from Zustand store
│   │   ├── useBooks.js               ← useGetAllBooks() → useQuery; useAddBook() → useMutation; etc.
│   │   ├── useCategories.js          ← useGetAllCategories(), useAddCategory(), useDeleteCategory()
│   │   ├── useBorrows.js             ← useMyBorrows(), useAllBorrows() (admin), useCreateBorrow(), useUpdateBorrowStatus()
│   │   ├── useCommunity.js           ← useMessages() with cursor-based useInfiniteQuery, useCreateMessage(), useDeleteMessage()
│   │   └── useSavedLists.js          ← useMySavedLists(), useCreateSavedList(), useDeleteSavedList()
│   │
│   ├── pages/                        ← Route-level page components; assemble components + call hooks
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx             ← Email/password form → POST /auth/login → stores token in Zustand
│   │   │   ├── RegisterPage.jsx          ← Registration form → POST /auth/register
│   │   │   └── CompleteProfilePage.jsx   ← Post-registration onboarding → PUT /profile/complete-profile
│   │   │
│   │   ├── books/
│   │   │   ├── BookListPage.jsx          ← Public catalog → GET /books; renders BookCard grid
│   │   │   ├── BookDetailPage.jsx        ← Single book view → GET /books/:id; has borrow request button
│   │   │   └── components/
│   │   │       └── BookFilterBar.jsx     ← Category filter UI; local only (not shared elsewhere)
│   │   │
│   │   ├── borrows/
│   │   │   ├── MyBorrowsPage.jsx         ← User's borrow history → GET /borrows/me
│   │   │   ├── BorrowDetailPage.jsx      ← Single borrow detail → GET /borrows/:id (QR-scan ready)
│   │   │   └── admin/
│   │   │       └── AllBorrowsPage.jsx    ← Admin: all borrow requests → GET /borrows; approve/reject actions
│   │   │
│   │   ├── community/
│   │   │   ├── CommunityPage.jsx         ← Forum feed with infinite scroll → GET /community (cursor pagination)
│   │   │   └── MessageDetailPage.jsx     ← Thread view with replies → GET /community/:id
│   │   │
│   │   ├── saved-lists/
│   │   │   └── SavedListsPage.jsx        ← User's reading lists → GET /saved-lists/me; full CRUD
│   │   │
│   │   ├── profile/
│   │   │   └── ProfilePage.jsx           ← View/edit own profile + upload photo → GET & PUT /profile
│   │   │
│   │   ├── admin/
│   │   │   ├── ManageBooksPage.jsx       ← Admin CRUD for books + cover upload → all /books endpoints
│   │   │   └── ManageCategoriesPage.jsx  ← Admin CRUD for categories → all /categories endpoints
│   │   │
│   │   └── NotFoundPage.jsx              ← 404 fallback; shown for any unmatched route
│   │
│   ├── router/
│   │   ├── index.jsx             ← All route definitions; wraps private routes with ProtectedRoute; wraps admin routes with admin guard
│   │   └── guards.jsx            ← requireAuth(), requireAdmin() — reads Zustand auth store to decide access
│   │
│   ├── services/                 ← Axios API layer — pure async functions, no React
│   │   ├── api.js                ← Single Axios instance; baseURL from .env; request interceptor injects Bearer token; response interceptor handles 401 → refresh token → retry
│   │   ├── authService.js        ← login(), register(), logout(), refreshToken()
│   │   ├── profileService.js     ← getMyProfile(), getProfileById(id), completeProfile(data), uploadPhoto(formData)
│   │   ├── bookService.js        ← getAllBooks(), getBookById(id), addBook(data), updateBook(id,data), deleteBook(id), uploadCover(id,formData)
│   │   ├── categoryService.js    ← getAllCategories(), getCategoryById(id), addCategory(data), updateCategory(id,data), deleteCategory(id)
│   │   ├── borrowService.js      ← getAllBorrows(), getMyBorrows(), getBorrowById(id), createBorrow(data), updateBorrowStatus(id,status)
│   │   ├── communityService.js   ← getAllMessages(cursor,limit), getMessageById(id), createMessage(data), updateMessage(id,data), deleteMessage(id)
│   │   └── savedListService.js   ← getMySavedLists(), createSavedList(data), updateSavedList(id,data), deleteSavedList(id)
│   │
│   ├── store/                    ← Zustand global stores — client-side state only
│   │   ├── authStore.js          ← Stores { user, accessToken, isAuthenticated, isAdmin }; actions: setAuth(), clearAuth(); populated after login/refresh
│   │   └── uiStore.js            ← Stores { isModalOpen, modalContent, toastMessage, isSidebarOpen }; lets any component trigger toasts or modals without prop drilling
│   │
│   ├── utils/                    ← Pure JavaScript helpers — no React, no Axios
│   │   ├── constants.js          ← BORROW_STATUSES, ROLES, DEFAULT_PAGINATION_LIMIT = 10; prevents magic strings across the codebase
│   │   ├── formatters.js         ← formatDate(str), truncateText(str,len), formatBorrowStatus(status) → human-readable labels
│   │   ├── validators.js         ← validateEmail(), validatePassword(); mirrors backend Zod rules for client-side pre-validation
│   │   └── helpers.js            ← buildFormData(obj) for file uploads, getInitials(name) → "John Doe" → "JD" for avatar fallback
│   │
│   ├── App.jsx                   ← Root component; renders RouterProvider and global providers (QueryClient, etc.)
│   ├── main.jsx                  ← React entry point; mounts App into #root DOM node
│   └── index.css                 ← Tailwind CSS directives (@tailwind base/components/utilities) + global base styles
│
├── docs/
│   ├── api_documentation.md      ← Backend API reference
│   ├── PRD.md                    ← Product Requirements Document
│   └── file-structure.md         ← This document
│
├── .env                          ← VITE_API_BASE_URL=http://localhost:3000/api/v1
├── .gitignore                    ← Excludes node_modules, .env, dist
├── index.html                    ← Vite HTML entry; contains <div id="root">
├── tailwind.config.js            ← Tailwind configuration; content paths, theme extensions
├── vite.config.js                ← Vite config; React plugin, path aliases (@/ → src/)
└── package.json                  ← Dependencies, scripts (dev, build, lint, preview)
```

---

## Layer Responsibility Summary

| Layer | Folder | Knows About |
|---|---|---|
| Entry | `main.jsx`, `App.jsx` | Providers, router |
| Routing | `router/` | Pages, guards, auth state |
| Pages | `pages/` | Hooks, components, layout |
| Components | `components/` | UI primitives only |
| Hooks | `hooks/` | Services, Zustand store |
| Services | `services/` | Axios instance, API endpoints |
| State | `store/` | Auth user, UI state |
| Utilities | `utils/` | Nothing (pure functions) |

> **Rule:** Each layer only imports from layers **below** it. Pages never import from other pages. Services never import from hooks.

---

## Data Flow Diagram

```
User Interaction
      │
      ▼
   Page (pages/)
      │  calls
      ▼
   Hook (hooks/)           ←── TanStack Query cache
      │  calls
      ▼
   Service (services/)
      │  uses
      ▼
   api.js (Axios instance)
      │  sends request to
      ▼
   Backend API (/api/v1/...)
```

---

## Key Rules (For the Team)

1. **Never import a service directly in a page** — always go through a hook
2. **Never put a page-specific component in `components/`** — keep it in `pages/[domain]/components/`
3. **Promote to `components/shared/` only when 2+ pages need it**
4. **All magic strings go in `utils/constants.js`** — never inline `'pending'`, `'admin'`, etc.
5. **`.env` variables must be prefixed with `VITE_`** — otherwise Vite won't expose them to the browser
6. **`authStore` is the only source of truth for auth** — never store token in `localStorage` directly
