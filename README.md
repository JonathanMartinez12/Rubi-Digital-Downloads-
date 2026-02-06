# Rubi Digital Downloads

A modern, elegant ecommerce website for premium financial workbooks and guides by James Villarrubia. Built with Next.js, Tailwind CSS, Shadcn/ui, Firebase, and Stripe.

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **Database & Auth**: Firebase (Firestore + Auth + Storage)
- **Payments**: Stripe Checkout
- **Email**: Resend
- **State Management**: Zustand (cart store with persistence)
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project (Firestore, Auth, Storage enabled)
- Stripe account
- Resend account (for transactional emails)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in your environment variables in .env.local
# See Environment Variables section below

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (JSON string of service account)
FIREBASE_ADMIN_SDK={"type":"service_account","project_id":"..."}

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout with Navbar, Footer, Cart
│   ├── shop/
│   │   ├── page.tsx          # Shop page with filters
│   │   └── [slug]/
│   │       ├── page.tsx      # Product detail (server)
│   │       └── product-detail-client.tsx
│   ├── cart/page.tsx         # Cart page
│   ├── checkout/page.tsx     # Checkout page
│   ├── success/page.tsx      # Post-purchase success
│   ├── account/page.tsx      # Customer account dashboard
│   ├── about/page.tsx        # About page
│   ├── admin/page.tsx        # Admin dashboard
│   ├── terms/page.tsx        # Terms & Conditions
│   ├── privacy/page.tsx      # Privacy Policy
│   ├── refund/page.tsx       # Refund Policy
│   └── api/
│       ├── checkout/route.ts       # Stripe checkout session
│       ├── products/route.ts       # Products API
│       └── webhooks/stripe/route.ts # Stripe webhook
├── components/
│   ├── ui/                   # Shadcn/ui components
│   ├── navbar.tsx            # Site navigation
│   ├── footer.tsx            # Site footer
│   ├── hero-section.tsx      # Home hero
│   ├── product-card.tsx      # Product card component
│   ├── cart-sidebar.tsx      # Slide-in cart
│   ├── featured-products.tsx # Featured products grid
│   ├── benefits-section.tsx  # Why choose us section
│   ├── testimonials-section.tsx
│   ├── categories-section.tsx
│   ├── faq-section.tsx
│   ├── newsletter-section.tsx
│   └── trust-badges.tsx
├── lib/
│   ├── products.ts           # Product data and helpers
│   ├── store.ts              # Zustand cart store
│   ├── firebase.ts           # Firebase client config
│   ├── firebase-admin.ts     # Firebase Admin config
│   ├── stripe.ts             # Stripe client config
│   └── utils.ts              # Utility functions (cn)
└── public/
    └── images/products/      # Product cover images (SVG placeholders)
```

## Features

- **9 Digital Products** with detailed product pages
- **Shopping Cart** with persistence (Zustand + localStorage)
- **Stripe Checkout** integration for secure payments
- **Customer Accounts** with purchase history and downloads
- **Admin Dashboard** for product and order management
- **Responsive Design** - mobile-first approach
- **SEO Optimized** - metadata, Open Graph, structured data
- **Smooth Animations** - Framer Motion page transitions
- **Trust Elements** - testimonials, guarantees, secure badges

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, featured products, benefits, testimonials, FAQ |
| Shop | `/shop` | Product grid with category filters and search |
| Product Detail | `/shop/[slug]` | Full product page with tabs and related products |
| Cart | `/cart` | Shopping cart with order summary |
| Checkout | `/checkout` | Stripe-powered checkout flow |
| Success | `/success` | Order confirmation with download links |
| Account | `/account` | Customer dashboard, purchases, profile |
| About | `/about` | Company info and author bio |
| Admin | `/admin` | Product management and order tracking |
| Terms | `/terms` | Terms & Conditions |
| Privacy | `/privacy` | Privacy Policy |
| Refund | `/refund` | 30-day refund policy |

## Stripe Webhook Testing

To test Stripe webhooks locally:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copy the webhook signing secret and add to .env.local
```

## Firebase Security Rules

Apply these rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /orders/{orderId} {
      allow read: if request.auth != null &&
                  (resource.data.userId == request.auth.uid ||
                   request.auth.token.admin == true);
      allow create: if request.auth != null;
      allow update: if request.auth.token.admin == true;
    }
  }
}
```

## Deployment

Deploy to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

## License

All rights reserved. Product content and designs are proprietary to Rubi Digital Downloads.
