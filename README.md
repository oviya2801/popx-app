# PopX — React JS Assignment

A pixel-perfect React JS implementation of the PopX mobile app design, centered in a phone frame on desktop.

## 📱 Screens (4 Total)

| Route | Screen | Description |
|-------|--------|-------------|
| `/` | Landing Screen | Welcome to PopX — two CTA buttons |
| `/login` | Login Screen | Email & password sign in |
| `/signup` | Signup Screen | Full registration form with agency radio |
| `/profile` | Account Settings | User avatar, name, email, bio |

## 🔁 Navigation Flow

```
Landing → [Create Account] → Signup → Profile
Landing → [Already Registered?] → Login → Profile
```

## 🛠️ Tech Stack

- React 18
- React Router v6
- CSS (component-scoped)
- Google Fonts — Rubik

## 🚀 Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## ☁️ Deploy to Vercel

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Click Deploy — done ✅

`vercel.json` is pre-configured for SPA routing.
