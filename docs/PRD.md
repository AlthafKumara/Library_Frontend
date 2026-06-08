# Product Requirements Document (PRD)

## 1. Product Overview
**Product Name:** Library Management & Community Platform 
**Description:** A comprehensive backend system designed to power a modern digital or physical library platform. It enables users to browse catalogs, borrow books, manage their reading lists, and engage in a community forum. Administrators have the tools to manage the book catalog, handle borrowing requests, and oversee operations.

## 2. Target Audience & Roles

* **Guest (Unauthenticated User):** Can browse the public catalog (books, categories) and view public user profiles.
* **Registered User (Member):** Can manage their personal profile, borrow books, create saved/favorite lists, and participate in community discussions.
* **Administrator:** Has elevated privileges to add/edit/delete books, manage book categories, and approve/update the status of book borrowing requests.

## 3. Core Features & Capabilities

### 3.1. User Authentication & Authorization
* **Registration & Login:** Secure email/password authentication system.
* **Token Management:** Uses JSON Web Tokens (JWT) for secure, stateless authentication, featuring an access token and a refresh token mechanism (stored in HTTP-only cookies) to maintain user sessions securely.
* **Role-Based Access Control (RBAC):** Restricts specific actions (e.g., updating borrow statuses) to administrators.

### 3.2. Profile Management
* **Onboarding & Completion:** Users can complete their profile by providing their name and gender.
* **Avatar Uploads:** Users can upload and update their profile photos.
* **Public Profiles:** Public-facing profile views to identify users within the community.

### 3.3. Catalog Management (Books & Categories)
* **Public Browsing:** Anyone can fetch the list of available books and categories.
* **Book Details:** Rich metadata support including Title, Author, Description, Stock count, and Cover Image URLs.
* **Inventory Control:** Administrators can Add, Update, and Delete books and categories to maintain the library's catalog.
* **Media Management:** Dedicated endpoints for uploading book cover images.

### 3.4. Borrowing System (Core Business Logic)
* **Borrow Requests:** Registered users can initiate a request to borrow a specific book by providing a due date.
* **Status Tracking (Admin Workflow):** Borrowing life-cycle management with statuses including: `pending`, `approved`, `borrowed`, `returned`, `overdue`, and `lost`.
* **User Dashboard:** Users can track the status of their own current and past borrow requests.
* **QR/Barcode Ready:** Supports querying a single borrow transaction by ID, making it adaptable for physical QR code scanning upon book collection or return.

### 3.5. Community & Discussion Forum
* **Discussions:** Users can post messages and reviews.
* **Threading (Replies):** Supports nested replies (via `parent_id`) allowing for conversation threads.
* **Book Linking:** Messages can optionally be tied to a specific `book_id`, enabling book-specific review threads.
* **Content Moderation:** Users can edit or delete their own messages.
* **Pagination:** Implements cursor-based pagination to handle large volumes of community messages efficiently.

### 3.6. Saved Lists / Favorites
* **Personal Collections:** Users can create custom lists (e.g., "To Read", "Favorites").
* **Book Bookmarking:** Users can add specific books to their lists for future reference.
* **List Management:** Full CRUD capabilities for users over their own saved lists.

## 4. Technical & Non-Functional Requirements

* **Input Validation:** Strict payload validation across all endpoints (using Zod) to prevent malformed data insertion and enhance security.
* **File Uploads:** Secure processing of `multipart/form-data` for image assets (Book Covers and Profile Photos).
* **Database Design:** Relational database structure accommodating Books, Categories, Users, Borrows, Messages, and Saved Lists with appropriate foreign key constraints.
* **Scalability:** Stateless JWT-based authentication allows the backend to be easily scaled horizontally.
* **Security Standards:** Implementation of CORS handling, HTTP-only cookies to prevent XSS attacks on refresh tokens, and robust password hashing.

## 5. Future Considerations (v2.0)
* **Email Notifications:** Automated alerts for overdue books or approved borrow requests.
* **Fine/Penalty System:** Financial tracking for overdue or lost books.
* **Advanced Search & Filtering:** Full-text search on books by author, tags, or ISBN.
* **Analytics Dashboard:** Admin insights on the most borrowed books, active users, etc.
