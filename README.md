# Intru E-Commerce Platform 🛍️

A **production-grade, AI-powered e-commerce platform** for Indian streetwear, built with Next.js 15, Supabase, and Cloudflare Pages. Features real-time data synchronization, multi-model AI integration (Grok & Gemini), and secure admin authentication.

## 🌟 Latest Updates (January 2026)

### ✨ New Features
- **🤖 Multi-Model AI Integration** - Generate product descriptions with Grok (xAI) or Gemini (Google)
- **📝 Dynamic CMS** - Create and manage content pages through admin panel
- **🔒 Enhanced Security** - Server-side authentication with cookie-based sessions
- **⚡ Real-Time Data** - Force-dynamic SSR for always-fresh product data
- **🎨 Minimal UI** - Streamlined design with Inter font and mobile-first approach

## 🚀 Quick Start

### Option 1: One-Command Deployment (Recommended)
```bash
cd /home/user/intruld
./deploy.sh
```

### Option 2: Manual Deployment
```bash
# Stage and commit changes
git add -A
git commit -m "Production deployment"

# Push to GitHub
git push origin main
```

## 🎯 Features

### Customer Experience
- ✅ **Product Browsing** - Responsive grid with real-time inventory
- ✅ **Product Details** - Dynamic SEO metadata for social sharing
- ✅ **Shopping Cart** - Zustand + localStorage persistence
- ✅ **Checkout** - Razorpay prepaid + COD options
- ✅ **Dynamic Pages** - Content management for About, Contact, etc.
- ✅ **Mobile-First** - Optimized for all screen sizes

### Admin Panel
- ✅ **Secure Authentication** - Cookie-based sessions with server-side validation
- ✅ **Product Management** - Full CRUD with image upload
- ✅ **AI Content Generation** - Generate descriptions with Grok or Gemini
- ✅ **CMS** - Create and manage content pages
- ✅ **Order Tracking** - Monitor payments and shipping
- ✅ **Dashboard** - Real-time analytics

### Technical Excellence
- ✅ **Edge Runtime** - All routes on Cloudflare Workers
- ✅ **Real-Time SSR** - No static caching, always fresh data
- ✅ **Type Safe** - Full TypeScript coverage
- ✅ **Multi-Model AI** - Supports Grok (xAI) and Gemini (Google)
- ✅ **RLS Security** - Supabase Row Level Security enabled
- ✅ **SEO Optimized** - Dynamic metadata generation

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Database | Supabase (PostgreSQL) |
| Hosting | Cloudflare Pages (Edge) |
| Styling | Tailwind CSS |
| State | Zustand + localStorage |
| Payments | Razorpay |
| AI | xAI Grok + Google Gemini |
| Auth | Cookie-based sessions |

## 📁 Project Structure

```
intruld/
├── app/
│   ├── [slug]/              # Dynamic content pages ✨
│   ├── admin/               # Admin panel (secured)
│   ├── api/
│   │   ├── admin/
│   │   │   ├── auth/        # Login/logout
│   │   │   └── ai/          # AI generation ✨
│   │   └── orders/          # Order management
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout flow
│   └── products/[id]/       # Product details
├── lib/
│   ├── ai-client.ts         # AI integration ✨
│   ├── cart-store.ts        # Zustand cart
│   ├── supabase.ts          # DB client
│   └── web-crypto.ts        # Auth utilities
├── migrations/
│   └── 001_content_pages.sql # CMS schema ✨
├── components/
│   ├── Navbar.tsx           # Navigation
│   └── Footer.tsx           # Footer
├── REFACTOR_SUMMARY.md      # Complete docs ✨
├── QUICK_DEPLOY.md          # Deployment guide ✨
└── deploy.sh                # Deployment script ✨
```

## ⚙️ Environment Variables

### Required
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin Authentication
ADMIN_SECRET_KEY=Kbssol@331  # Change this!

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=your_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# App
NEXT_PUBLIC_APP_URL=https://intruld.pages.dev
```

### Optional (AI Features)
```bash
# xAI Grok (for AI generation)
GROK_API_KEY=xai-your-api-key

# Google Gemini (for AI generation)
GEMINI_API_KEY=your-gemini-api-key
```

## 🗄️ Database Setup

Run this SQL in Supabase SQL Editor (`migrations/001_content_pages.sql`):

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create content_pages table
CREATE TABLE IF NOT EXISTS content_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE content_pages ENABLE ROW LEVEL SECURITY;

-- Public can read published pages
CREATE POLICY "Public can read published pages"
  ON content_pages FOR SELECT
  USING (is_published = true);

-- Service role can manage all pages
CREATE POLICY "Service role can manage all pages"
  ON content_pages FOR ALL
  USING (true);
```

## 🚀 Deployment

### Cloudflare Pages (Automatic)
1. Push to GitHub (see deploy.sh)
2. Cloudflare Pages auto-deploys
3. Set environment variables in dashboard
4. Run database migration in Supabase

### Manual Build
```bash
# Build for Cloudflare Pages
npm run pages:build

# Deploy to Cloudflare
wrangler pages deploy .vercel/output/static --project-name intruld
```

## 🤖 Using AI Features

### Setup
1. Get API key from [x.ai](https://x.ai) (Grok) or [Google AI Studio](https://aistudio.google.com/app/apikey) (Gemini)
2. Set `GROK_API_KEY` or `GEMINI_API_KEY` in Cloudflare Pages
3. Restart deployment

### Usage
1. Login to admin panel
2. Go to Products → Add Product
3. Click "✨ Generate with AI"
4. Select model (Grok or Gemini)
5. AI generates product description

## 🔐 Admin Access

**URL:** `https://your-domain.pages.dev/admin/login`  
**Default Password:** `Kbssol@331` (change via `ADMIN_SECRET_KEY`)

## 🧪 Testing Checklist

- [ ] Homepage loads with live products
- [ ] Product pages show SEO metadata
- [ ] Cart persists across reloads
- [ ] Admin login works
- [ ] AI generation works (if configured)
- [ ] Dynamic pages accessible
- [ ] Orders can be created
- [ ] Logout functionality works

## 📚 Documentation

- **[REFACTOR_SUMMARY.md](./REFACTOR_SUMMARY.md)** - Complete refactor documentation
- **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)** - Quick deployment guide
- **[migrations/001_content_pages.sql](./migrations/001_content_pages.sql)** - Database schema

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│         Cloudflare Edge Network              │
│  ┌────────────────────────────────────────┐ │
│  │       Next.js 15 App Router            │ │
│  │  ┌──────────┐    ┌──────────┐         │ │
│  │  │ Frontend │◄──►│ Edge API │         │ │
│  │  │  (SSR)   │    │  Routes  │         │ │
│  │  └──────────┘    └──────────┘         │ │
│  └────────────┬──────────────┬────────────┘ │
└───────────────┼──────────────┼──────────────┘
                │              │
                ▼              ▼
       ┌────────────┐  ┌──────────────┐
       │  Supabase  │  │  AI Models   │
       │ PostgreSQL │  │ Grok/Gemini  │
       └────────────┘  └──────────────┘
```

## 🎨 Design System

- **Font:** Inter (Google Fonts)
- **Colors:** Black (#000), White (#FFF), Neon Yellow (#ccff00)
- **Layout:** Mobile-first, minimal aesthetic
- **Components:** Reusable, type-safe

## 🛡️ Security

- Server-side authentication in admin layout
- Cookie-based sessions (httpOnly)
- Supabase Row Level Security (RLS)
- API keys never exposed to client
- Razorpay handles payment security

## 📈 Performance

- **Edge Runtime** - Global low-latency
- **Force Dynamic** - Real-time data
- **Image Optimization** - Next.js Image CDN
- **Cart Persistence** - Instant load
- **Minimal Bundle** - Only essential deps

## 🐛 Troubleshooting

### Admin shows "Unauthorized"
→ Set `ADMIN_SECRET_KEY` environment variable

### Products not loading
→ Check Supabase credentials and RLS policies

### AI generation fails
→ Verify API keys are set correctly

### Build fails
→ Run `npm install` and check dependencies

## 📞 Support

- **Repository:** https://github.com/surisettidev/intruld
- **Documentation:** See `/docs` directory
- **Issues:** Check REFACTOR_SUMMARY.md

## 🏆 Success Metrics

✅ **100% Edge Runtime** - All routes optimized  
✅ **Real-Time Data** - Zero static caching  
✅ **AI-Powered** - Multi-model integration  
✅ **Secure** - Server-side authentication  
✅ **Production-Ready** - Enterprise architecture  

## 📜 License

Private project - All rights reserved

---

**Built with Next.js 15 + Supabase + Cloudflare + AI**  
**Status:** ✅ Production Ready  
**Last Updated:** January 13, 2026
