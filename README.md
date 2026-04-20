# Skill Bridge - Frontend 🌐

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white)](https://www.radix-ui.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)

The frontend of **Skill Bridge** is a high-performance, accessible, and visually stunning web application built with **Next.js 16**. It provides a seamless user experience for students and tutors, featuring fluid animations and a responsive design system.

---

## 🚀 Key Features

- **⚡ Server-Side Rendering**: Optimized for performance and SEO using Next.js App Router.
- **🎨 Modern Styling**: Built with **Tailwind CSS v4** and **Radix UI** for accessible, headless components.
- **✨ Fluid Animations**: Smooth transitions and micro-interactions powered by **Motion** (Framer Motion).
- **🔐 Secure Auth Integration**: Client-side session management via **Better Auth**.
- **📊 Dynamic Forms**: Type-safe form management with **TanStack Form** and **Zod**.
- **🔄 Efficient Data Fetching**: Real-time updates and caching using **SWR**.
- **📱 Mobile-First**: Fully responsive layouts tailored for all screen sizes.

---

## 🛠️ Tech Stack

- **Core**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Radix UI, Lucide React
- **State Management**: SWR (Data Fetching), TanStack Form (Forms)
- **Authentication**: Better Auth (Client SDK)
- **Validation**: Zod
- **Animations**: Motion (Framer Motion)
- **Utilities**: clsx, tailwind-merge, date-fns

---

## 📁 Project Structure

```text
src/
├── app/            # Next.js App Router (Pages, Layouts, API Routes)
├── components/     # Reusable UI components (shadcn/ui style)
├── hooks/          # Custom React hooks for business logic
├── lib/            # Utility functions and library configurations
├── assets/         # Static assets like images and global styles
└── Types/          # Global TypeScript type definitions
```

---

## 🚦 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **npm** or **yarn**

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Create a `.env` file based on `.env.example`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
   FRONTEND_URL=http://localhost:3000
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 📜 Available Scripts

- `npm run dev`: Run the app in development mode with hot-reloading.
- `npm run build`: Compile the application for production.
- `npm run start`: Start the production server.
- `npm run lint`: Run ESLint to find and fix code quality issues.
- `npm run type-check`: Run TypeScript compiler to check for type errors.

---

## 🎨 Design System

The project follows a consistent design system leveraging:
- **Glassmorphism**: Subtle backgrounds and blurs for a premium feel.
- **Modern Typography**: Clean, legible fonts optimized for readability.
- **Dynamic Themes**: Built-in support for light and dark modes via `next-themes`.

---

## 👤 Author
**Moshiur Rahman**
- GitHub: [@moshiur07](https://github.com/moshiur07)
- Website: [moshiur.dev](https://moshiur-rahman-dev.netlify.app/)

---
*Skill Bridge - Bridging the gap between knowledge and expertise.*
