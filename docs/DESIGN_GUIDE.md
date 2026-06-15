# Frontend Design Guide

This document outlines the design principles, typography, spacing, colors, and component patterns for the frontend of the Library project. It follows a high-agency design philosophy aiming for a premium, non-generic aesthetic.

## 1. Typography

Per the project's requirements, **Inter** is the designated font family for this application. To ensure it feels premium and distinct from generic defaults, we apply specific typographic scaling and tracking.

* **Primary Font Family:** `Inter` (sans-serif)
* **Headings (h1, h2, h3):** 
  * Strict tracking: `tracking-tight` or `tracking-tighter` (e.g., `-1.68px` for H1).
  * Line height: `leading-none` or tight (`118%`).
  * Color: `--text-h` (`#08060d` in light mode, `#f3f4f6` in dark mode).
* **Body Text:**
  * Base size: `18px` with `145%` line height for excellent readability (`16px` on mobile).
  * Color: `--text` (`#6b6375` in light mode, `#9ca3af` in dark mode).
  * Max width: Constrained to `max-w-[65ch]` to maintain readable line lengths.
* **Monospace:** `ui-monospace, Consolas, monospace` (used for code blocks and numerical data).

## 2. Spacing System (4px & 8px Rule)

All spacing (padding, margins, gaps, and positioning) strictly adheres to a **4px and 8px base grid** to ensure mathematical rhythm and visual harmony across the UI.

* **Micro-spacing (4px rule):** `4px`, `12px`, `20px` (Tailwind `1`, `3`, `5`) — Used for internal component spacing (e.g., gap between an icon and text inside a button).
* **Macro-spacing (8px rule):** `8px`, `16px`, `24px`, `32px`, `48px`, `64px` (Tailwind `2`, `4`, `6`, `8`, `12`, `16`) — Used for structural layouts, grid gaps, and section breathing room.
* **Implementation:** Always use Tailwind's spacing scale (e.g., `gap-4` for 16px, `p-6` for 24px). Avoid arbitrary spacing values like `11px` or `17px`.

## 3. Color Palette

The color system is defined in `src/index.css` via CSS variables and Tailwind configuration. It relies heavily on neutral palettes with high-contrast, singular accents.

### Semantic Colors
* **Neutral Backgrounds:** 
  * Light: `--bg` `#ffffff`
  * Dark: `--bg` `#16171d`
* **Text:**
  * Primary Headings: `--text-h`
  * Body/Secondary: `--text`
* **Borders:** `--border` (`#e5e4e7` / `#2e303a`)
* **Accent (Brand):** `--accent` (`#aa3bff` light / `#c084fc` dark). 
  * *Note: The accent color should be used sparingly for primary actions, active states, and key visual highlights. Avoid "neon glow" effects and rely on solid contrasts or subtle tinted backgrounds (`--accent-bg`).*

### Status Colors
* **Primary:** `rgba(47, 120, 232, 1)` (Blue)
* **Success:** `rgba(16, 185, 129, 1)` (Emerald)
* **Warning:** `rgba(245, 158, 11, 1)` (Amber)
* **Danger:** `rgba(239, 68, 68, 1)` (Red)

## 4. UI Patterns & Components

To avoid "AI UI Slop" and standard generic patterns, we implement high-end interaction and composition techniques. 

### A. Buttons & Actions
* **Tactile Feedback:** Buttons should have an active state (`active:scale-[0.98]` or `active:-translate-y-[1px]`) to provide a physical "push" feeling.
* **Visuals:** Avoid oversized, overly rounded, glowing buttons. Use precise padding (e.g., `px-4 py-2`), crisp borders, and subtle shadow depth.
* **Icons:** Use Phosphor Icons or Radix Icons exclusively. Standardize stroke widths (e.g., `1.5`). **No emojis.**

### B. Cards & Containers (Anti-Card Overuse)
* **Diffusion Shadows:** If a card must have a shadow, use a wide, low-opacity diffusion shadow (e.g., `shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]`) rather than a heavy, sharp drop shadow.
* **Liquid Glass:** For glassmorphism panels, do not just rely on `backdrop-blur`. Add a subtle inner border (`border-white/10`) and an inner shadow to simulate edge refraction.
* **Data Density:** Don't box everything in a card. For dense data views, use logic-grouping via `border-t`, `divide-y`, or purely negative space.

### C. Layout & Bento Grids
* **Asymmetry:** Favor asymmetrical layouts over perfect 3-column symmetry. Use CSS Grid for robust structures (e.g., `grid-cols-1 md:grid-cols-3` with varied column spans).
* **Bento Architecture:** Feature sections should use a "Bento 2.0" grid structure with cards using generous padding (`p-8`), rounded corners (`rounded-3xl` or `rounded-[2.5rem]`), and titles/descriptions placed *outside* or cleanly separated from interactive elements.
* **Viewport Stability:** Use `min-h-[100dvh]` instead of `h-screen` to prevent layout jumping on mobile browsers.

### D. Interactive States
* **Empty/Loading:** Always design beautiful empty states (illustrating how to populate data) and skeletal loaders that match the layout structure (avoid generic spinners).
* **Perpetual Micro-Interactions:** (Where applicable) Add infinite, subtle loops to active states (e.g., a slow pulse or shimmer on a live metric) to make the dashboard feel alive. Use Framer Motion (`type: "spring"`) to drive these interactions smoothly.

## 5. Summary Checklist for Developers
1. **Did you use Inter with tight tracking for headers?**
2. **Is spacing strictly divisible by 4px or 8px?**
3. **Are you relying on the defined `--accent` and `--bg` colors instead of hardcoded hex values?**
4. **Do buttons have an `active:scale` tactile feedback?**
5. **Is the layout responsive and stable on mobile (`min-h-[100dvh]`)?**
