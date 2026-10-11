# 🌿 Funloof — Premium Eco-Friendly Educational Wooden Toys

A complete, production-ready full-stack e-commerce platform and no-code graphical Content Management System (CMS) & CRM built for **Funloof**, a brand dedicated to mindful, screen-free, skill-building wooden playthings.

> **CRITICAL OWNER FEATURE (ZERO CODING REQUIRED):**  
> The business owner has zero coding experience. Every single aspect—adding/editing products, updating workshop inventory, fulfilling customer orders, updating tracking numbers, composing parenting blog posts with WYSIWYG, and swapping homepage banners—is managed via the **Admin Dashboard GUI** at `/admin`.

---

## 🎨 1. Brand Identity & Aesthetic

- **Design Fusion:** Combines the clean, minimalist, earthy, and heirloom feel of *Bloon Toys* with the engaging, pedagogical, and skill-based discovery framework of *Smartivity*.
- **Palette:** Warm, organic tones—deep forest green (`#1E351D`), soft sage (`#758C75`), natural timber wood (`#B08A63`, `#FAF8F5`), and warm cream (`#FDFAF5`).
- **Typography:** Editorial serif headings (*Fraunces*) paired with clean geometric sans body typography (*Outfit*).
- **Core Pillars:** 100% FSC European Beech & Neem Wood, Food-Grade Botanical Stains, Zero Plastic Packaging, Montessori & Waldorf Alignment.

---

## 🛒 2. Customer-Facing Storefront Features

1. **Homepage (`/`):**
   - **Hero Banner:** Dynamic headline, subtitle, floating badge, and imagery driven live by the CMS.
   - **Shop by Age Section:** Interactive stages:
     - `0 – 12m`: Sensory & Grasping
     - `1 – 3y`: Toddler Motor & Balance
     - `3 – 5y`: Preschool STEM & Architecture
     - `5y+`: Kinetic Physics & Logic
   - **Shop by Skill Section:** Fine Motor Skills, STEM & Logic, Spatial Reasoning, Sensory Play, Creative Expression.
   - **The Funloof Promise:** Sustainability, non-toxic plant pigments, and screen-free focus.
   - **Parent Testimonials & Social Proof:** Verified buyer ratings and reviews.
   - **Mindful Play Club Newsletter:** Immediate 10% coupon code (`ECOPLAY`) + free developmental milestones guide.

2. **Product Catalog & Discovery (PLP - `/shop`):**
   - Multi-faceted sidebar filtering by Age Range, Developmental Skills, Price Range Slider, and In-Stock toggle.
   - Real-time search by keywords, materials, or skills.
   - Sorting by Featured, Price (Low to High / High to Low), and Highest Rating.
   - 1-click active filter removal and clear-all pills.

3. **Product Detail Page (PDP - `/products/[slug]`):**
   - High-resolution gallery with thumbnail switcher.
   - Safe Play Guarantee callouts (100% FSC, ASTM F963, EN71).
   - Real-time stock status indicator with low stock badge.
   - Quantity selector and instant slide-over drawer cart trigger.
   - **Pedagogical Breakdown Tabs:**
     - `Skills Developed`: Fine motor, cognitive sequencing, spatial reasoning.
     - `Materials & Safety`: Solid beechwood, linseed oil sealer, food-safe pigments.
     - `Why Parents Love It`: Real benefits, screen-free tranquility, heirloom durability.
     - `Dimensions & Care`: Sizing, weight, and beeswax cleaning guide.
   - Pairs Beautifully With (Related toys recommendation grid).

4. **Slide-Over Cart Drawer & Dedicated Cart (`/cart`):**
   - Free shipping progress bar (`Add $X more to unlock Free Carbon-Neutral Shipping!`).
   - Line items with product photo, title, price, quantity increment/decrement, and remove.
   - Promo code coupon system (e.g. `ECOPLAY` for 10% off).
   - Cost breakdown: Subtotal, Discount, Shipping, Total.

5. **Checkout & Order Receipt (`/checkout` & `/checkout/success`):**
   - Seamless customer contact & shipping address capture.
   - Stripe card payment simulation (card number, expiry, CVC, 256-bit SSL encryption).
   - Special gift notes & delivery instructions.
   - Celebratory eco-confetti completion screen, printable reference receipt, and 1-tree planted certificate.

6. **Parenting & Play Journal (`/journal` & `/journal/[slug]`):**
   - SEO-optimized articles on Montessori at home, sensory development, and screen-free routines.
   - Reading time, author credentials, category pills, and related toy shopping cards.

---

## 🛠️ 3. No-Code Admin Dashboard (CMS & CRM - `/admin`)

The entire store is controllable via an intuitive GUI:

1. **Dashboard Overview (`/admin`):**
   - KPIs: Total Gross Revenue, Total Orders, Active Toys, Average Order Value (AOV).
   - Real-time low stock warning banner (&le; 15 units remaining).
   - Recent incoming orders table with 1-click status updater.

2. **Product Management (`/admin/products` & `/admin/products/new`):**
   - Complete catalog table with instant inline stock counter (`+` / `-`).
   - Visual Add/Edit Toy Form:
     - Name, tagline, description, price, compare-at price, stock units.
     - Photo URL input with live preview + preset toy photos.
     - Age Range button selector with automatic label assignment.
     - Skill tag multi-select checkboxes.
     - Addable chips for Eco Materials and "Why Parents Love It" points.
     - Featured & Best Seller switches.
   - Delete product with safety confirmation.

3. **Order Management (`/admin/orders`):**
   - Tabbed filtering by status: All, Processing, Shipped, Delivered, Cancelled.
   - Order drawer with customer email, phone, full shipping address, and gift notes.
   - Fulfillment status dropdown + Courier Name & Tracking Number input.

4. **Homepage & Banners Visual CMS (`/admin/cms`):**
   - Real-time live visual preview pane.
   - Visual editor for Top Announcement Bar ribbon and target link.
   - Visual editor for Hero Badge, Headline, Subtitle, CTA Button, and Hero Photo URL.
   - Free shipping threshold configuration.

5. **Parenting Journal CMS (`/admin/cms/blog` & `/admin/cms/blog/new`):**
   - Visual WYSIWYG editor toolbar: Bold, Italic, Heading 3, Bullet lists, Numbered lists, Quote blocks.
   - Live Preview tab switcher.
   - Cover photo picker, category selector, author bio inputs.

6. **Customer CRM (`/admin/customers`):**
   - Registered customer directory with search.
   - Lifetime spend and order count tracking.
   - VIP parent status badge.
   - Customer profile drawer displaying their complete purchase history.

---

## 🗄️ 4. Database Architecture & Dual Storage Mode

Funloof includes a unified database service layer (`lib/db/index.ts`):
1. **Out-of-the-Box Mode (Default):** Runs immediately with zero configuration! Persists data to `.data/store.json` with in-memory caching for zero-friction local testing or serverless deployment.
2. **Cloud Supabase Mode:** Complete `supabase-schema.sql` file provided with PostgreSQL tables, UUID keys, check constraints, and Row Level Security (RLS) policies. Simply paste your Supabase URL & Key into environment variables to switch seamlessly!

---

## 🚀 5. Getting Started & Running Locally

```bash
# 1. Navigate to the project directory
cd funloof-ecommerce

# 2. Start the development server
npm run dev
```

Visit the application in your browser:
- **Storefront:** [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard (CMS/CRM):** [http://localhost:3000/admin](http://localhost:3000/admin)

---

## ☁️ 6. One-Click Deployment to Vercel

1. Push this folder to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository. Next.js App Router will be detected automatically.
4. Click **Deploy**. Your store is live with full customer storefront and admin dashboard!
