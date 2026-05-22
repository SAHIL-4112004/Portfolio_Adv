# 🚀 Modern Developer Portfolio

A sleek, responsive, and database-driven personal portfolio website showcasing projects, skills, certificates, badges, and professional experience.

Live Site: **[portfolio-antigravity-zeta.vercel.app](https://portfolio-antigravity-zeta.vercel.app)**  
GitHub Repo: **[github.com/SAHIL-4112004/Portfolio_Adv](https://github.com/SAHIL-4112004/Portfolio_Adv)**

---

## ✨ Features

- **Dynamic Content**: Fetches portfolio statistics, about section, education history, skills list, projects, work experience, certificates, badges, and contact details directly from a **Supabase database**.
- **Admin Panel**: Secure dashboard at `/admin.html` allowing you to update your profile, add/delete projects, and manage received contact form messages.
- **LocalStorage Fallback**: Highly robust offline/fault-tolerant capability; falls back immediately to LocalStorage and local JSON presets if Supabase is unreachable.
- **Real-Time Synchronization**: Subscribes to PostgreSQL database changes using Supabase Realtime channels. Any updates saved in the admin panel sync instantly across all open browser tabs.
- **Modern Responsive Design**: Clean and interactive layout featuring smooth scroll reveals, custom transitions, glassmorphic UI components, and tailored dark mode aesthetics.
- **Contact Forms**: Interactive form that pushes inquiries directly to the database.

---

## 🛠️ Tech Stack

- **Core**: HTML5, Vanilla CSS, JavaScript (ES6+ Modules)
- **Tooling/Bundler**: [Vite](https://vite.dev/)
- **Database / Backend**: [Supabase](https://supabase.com/) (PostgreSQL, Storage buckets for images, Realtime database updates)
- **Hosting / Deployments**: [Vercel](https://vercel.com/)

---

## ⚙️ Local Development Setup

To run this project locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/SAHIL-4112004/Portfolio_Adv.git
cd Portfolio_Adv
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📂 Project Structure

```
├── admin.html               # Admin Dashboard UI
├── badges.html              # Badges showcase
├── certificate.html         # Certificates showcase
├── extracurricular.html     # Extracurricular activities view
├── index.html               # Main portfolio landing page
├── projects.html            # Detailed projects gallery
├── package.json             # NPM dependencies & build scripts
├── schema.sql               # Supabase DB schema for table creation
├── vite.config.js           # Vite configuration
├── scripts/
│   └── migrate-to-supabase.js # Script to seed local data into Supabase
├── src/
│   ├── css/                 # Layout & style sheets
│   └── js/
│       ├── app.js           # Main app initialization & rendering
│       ├── admin.js         # Admin page controller logic
│       ├── db.js            # Supabase API abstraction layer & LocalStorage fallback
│       └── theme.js         # Theme management switcher
```

---

## 🚀 Deployment

The project is configured for Vercel. 

To deploy manually via CLI:
```bash
# Link the project to Vercel (first-time setup)
npx vercel link

# Add environment variables to Vercel production
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production --value "your_supabase_url" --yes
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production --value "your_anon_key" --yes

# Deploy to production
npx vercel --prod
```
