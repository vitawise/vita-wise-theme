# VitaWise Pharmacy — Complete Frontend Specification

> **Purpose:** This document provides an exhaustive specification to recreate the VitaWise Pharmacy e-commerce platform from scratch. Every detail — every file, every prop, every CSS variable, every route — is documented.

---

## 1. TECH STACK

### Runtime & Build
| Tool | Version |
|------|---------|
| React | ^18.3.1 |
| React DOM | ^18.3.1 |
| Vite | ^5.4.19 |
| TypeScript | ^5.8.3 |
| Tailwind CSS | ^3.4.17 |
| PostCSS | ^8.5.6 |
| Autoprefixer | ^10.4.21 |

### Core Libraries
| Library | Version | Purpose |
|---------|---------|---------|
| react-router-dom | ^6.30.1 | Client-side routing |
| @tanstack/react-query | ^5.83.0 | Data fetching & caching |
| @supabase/supabase-js | ^2.94.1 | Backend (Supabase) client |
| @lovable.dev/cloud-auth-js | ^0.0.3 | OAuth social login |
| zod | ^3.25.76 | Schema validation |
| react-hook-form | ^7.61.1 | Form management |
| @hookform/resolvers | ^3.10.0 | Zod resolver for react-hook-form |

### UI Components (shadcn/ui via Radix)
| Package | Version |
|---------|---------|
| @radix-ui/react-accordion | ^1.2.11 |
| @radix-ui/react-alert-dialog | ^1.1.14 |
| @radix-ui/react-aspect-ratio | ^1.1.7 |
| @radix-ui/react-avatar | ^1.1.10 |
| @radix-ui/react-checkbox | ^1.3.2 |
| @radix-ui/react-collapsible | ^1.1.11 |
| @radix-ui/react-context-menu | ^2.2.15 |
| @radix-ui/react-dialog | ^1.1.14 |
| @radix-ui/react-dropdown-menu | ^2.1.15 |
| @radix-ui/react-hover-card | ^1.1.14 |
| @radix-ui/react-label | ^2.1.7 |
| @radix-ui/react-menubar | ^1.1.15 |
| @radix-ui/react-navigation-menu | ^1.2.13 |
| @radix-ui/react-popover | ^1.1.14 |
| @radix-ui/react-progress | ^1.1.7 |
| @radix-ui/react-radio-group | ^1.3.7 |
| @radix-ui/react-scroll-area | ^1.2.9 |
| @radix-ui/react-select | ^2.2.5 |
| @radix-ui/react-separator | ^1.1.7 |
| @radix-ui/react-slider | ^1.3.5 |
| @radix-ui/react-slot | ^1.2.3 |
| @radix-ui/react-switch | ^1.2.5 |
| @radix-ui/react-tabs | ^1.1.12 |
| @radix-ui/react-toast | ^1.2.14 |
| @radix-ui/react-toggle | ^1.1.9 |
| @radix-ui/react-toggle-group | ^1.1.10 |
| @radix-ui/react-tooltip | ^1.2.7 |
| class-variance-authority | ^0.7.1 |
| clsx | ^2.1.1 |
| tailwind-merge | ^2.6.0 |
| cmdk | ^1.1.1 |
| vaul | ^0.9.9 |
| input-otp | ^1.4.2 |
| sonner | ^1.7.4 |
| tailwindcss-animate | ^1.0.7 |
| next-themes | ^0.3.0 |

### Rich Text Editor
| Package | Version |
|---------|---------|
| @tiptap/react | ^3.19.0 |
| @tiptap/starter-kit | ^3.19.0 |
| @tiptap/extension-image | ^3.19.0 |
| @tiptap/extension-link | ^3.19.0 |
| @tiptap/extension-placeholder | ^3.19.0 |
| @tiptap/extension-text-align | ^3.19.0 |
| @tiptap/extension-underline | ^3.19.0 |

### Drag & Drop
| Package | Version |
|---------|---------|
| @dnd-kit/core | ^6.3.1 |
| @dnd-kit/sortable | ^10.0.0 |
| @dnd-kit/utilities | ^3.2.2 |

### Charts & Data Visualization
| Package | Version |
|---------|---------|
| recharts | ^2.15.4 |

### Utilities
| Package | Version | Purpose |
|---------|---------|---------|
| date-fns | ^3.6.0 | Date manipulation |
| dompurify | ^3.3.1 | HTML sanitization |
| lucide-react | ^0.462.0 | Icons |
| html2canvas | ^1.4.1 | Screenshot/canvas |
| jspdf | ^4.1.0 | PDF generation |
| qrcode.react | ^4.2.0 | QR code rendering |
| html5-qrcode | ^2.3.8 | Barcode scanning |
| xlsx | ^0.18.5 | Excel import/export |
| embla-carousel-react | ^8.6.0 | Carousel |
| react-day-picker | ^8.10.1 | Date picker |
| react-resizable-panels | ^2.1.9 | Resizable panels |

### Dev Dependencies
| Package | Version |
|---------|---------|
| @vitejs/plugin-react-swc | ^3.11.0 |
| @tailwindcss/typography | ^0.5.19 |
| @testing-library/jest-dom | ^6.6.0 |
| @testing-library/react | ^16.0.0 |
| vitest | ^3.2.4 |
| jsdom | ^20.0.3 |
| eslint | ^9.32.0 |
| typescript-eslint | ^8.38.0 |
| lovable-tagger | ^1.1.13 |

---

## 2. FILE STRUCTURE

```
src/
├── main.tsx                          # Entry point, wraps App in ThemeProvider
├── App.tsx                           # Router, providers (QueryClient, Language, Auth, Cart)
├── App.css                           # Legacy CSS (unused, Vite scaffold)
├── index.css                         # Full design system (CSS variables, utilities, animations)
├── vite-env.d.ts
│
├── contexts/
│   ├── AuthContext.tsx                # Auth state, signIn/signUp/signOut, isAdmin check
│   ├── CartContext.tsx                # Shopping cart with VAT, localStorage persistence
│   ├── LanguageContext.tsx            # EN/AR translations, RTL/LTR switching
│   └── ThemeContext.tsx               # 684-line theme engine: colors, typography, layout, header, footer, content
│
├── types/
│   ├── index.ts                      # Product, Category, BlogPost, Order, Customer interfaces
│   └── payment.ts                    # PaymentMethod type, PAYMENT_METHODS constant
│
├── lib/
│   ├── utils.ts                      # cn() — clsx + tailwind-merge
│   ├── vat.ts                        # VAT_RATE=0.15, calculateVAT, getDisplayPrice
│   ├── colorUtils.ts                 # hexToHsl, hslToHex converters
│   ├── imageUtils.ts                 # optimizeImageUrl (Unsplash WebP), generateSrcSet
│   ├── sanitize.ts                   # sanitizeSearchInput, isValidUUID
│   ├── zatca.ts                      # ZATCA e-invoice QR generation
│   └── generateThemeDocPdf.ts        # PDF export of theme documentation
│
├── integrations/
│   ├── supabase/
│   │   ├── client.ts                 # Auto-generated Supabase client (DO NOT EDIT)
│   │   └── types.ts                  # Auto-generated DB types (DO NOT EDIT)
│   └── lovable/
│       └── index.ts                  # Lovable Cloud auth (OAuth)
│
├── data/
│   ├── mockData.ts                   # Fallback mock products, categories, blog posts
│   ├── healthChecks.ts               # SEO/site health check definitions
│   ├── pluginCatalog.ts              # Available plugin definitions
│   └── themeDocumentation.ts         # Theme docs content
│
├── hooks/                            # 50+ custom hooks (all use @tanstack/react-query)
│   ├── useProducts.ts                # Products CRUD + filtering
│   ├── useCategories.ts              # Categories list + by-id
│   ├── useStoreSettings.ts           # Store config from app_settings
│   ├── useBranding.ts                # Logo URLs from app_settings
│   ├── useCompanyInfo.ts             # Company info from app_settings
│   ├── useOrders.ts                  # Order creation
│   ├── useUserOrders.ts              # User's order history
│   ├── useAdminOrders.ts             # Admin order management
│   ├── useAdminProducts.ts           # Admin product CRUD
│   ├── useAdminBlog.ts               # Admin blog post CRUD
│   ├── useAdminBlogCategories.ts     # Blog category management
│   ├── useAdminBlogPages.ts          # Static blog pages
│   ├── useBlogPosts.ts              # Public blog listing
│   ├── useBlogComments.ts           # Blog comment system
│   ├── useBlogAnalytics.ts          # Blog view analytics
│   ├── useBlogMedia.ts             # Blog media management
│   ├── useProfile.ts               # User profile CRUD
│   ├── useWishlist.ts              # Wishlist add/remove
│   ├── useReviews.ts               # Product reviews
│   ├── useRecentlyViewed.ts        # Recently viewed products (localStorage)
│   ├── useProductComparison.ts     # Product comparison
│   ├── useCart (context)           # (in CartContext.tsx)
│   ├── usePayment.ts              # Payment processing
│   ├── usePaymentSettings.ts      # Payment config
│   ├── useDiscounts.ts            # Discount codes + product offers
│   ├── useNewsletter.ts           # Newsletter subscription
│   ├── useShippingZones.ts        # Shipping zone management
│   ├── useSalesAnalytics.ts       # Sales data for charts
│   ├── useCategorySales.ts        # Category-level sales
│   ├── useOrderTracking.ts        # Order tracking events
│   ├── useSettings.ts             # General app settings
│   ├── useBankAccountSettings.ts  # Bank account info
│   ├── useSiteHealth.ts           # Site health scans
│   ├── useHealthFixes.ts          # Auto-fix health issues
│   ├── useSeoFixes.ts             # SEO issue fixes
│   ├── usePageSeoScores.ts        # Per-page SEO scores
│   ├── useAutoSeoTracker.ts       # Background SEO tracking
│   ├── usePageCustomizations.ts   # Per-page customization
│   ├── useCustomWidgets.ts        # Custom widget management
│   ├── usePlugins.ts              # Plugin system
│   ├── useBackups.ts              # Site backup management
│   ├── useThemeLicenses.ts        # Theme license management
│   ├── useThemeVersions.ts        # Theme version management
│   ├── useTrendsAgent.ts          # AI market trends
│   ├── useChatWidget.ts           # Chat widget state
│   ├── useDocsSearch.ts           # Documentation search
│   ├── useViewTracking.ts         # Page view tracking
│   ├── useAutoSaveDraft.ts        # Auto-save draft content
│   ├── usePrayerTimes.ts          # Islamic prayer times API
│   ├── use-mobile.tsx             # Mobile breakpoint detection
│   └── use-toast.ts               # Toast notifications
│
├── components/
│   ├── NavLink.tsx
│   │
│   ├── layout/
│   │   ├── MainLayout.tsx            # Page wrapper: WeatherBar, NewsBanner, Navbar, CategoryNav, Footer, Chat
│   │   ├── Navbar.tsx                # Main navigation bar
│   │   ├── NavbarSearch.tsx          # Inline search in navbar
│   │   ├── NavbarBlogDropdown.tsx    # Blog hover dropdown
│   │   ├── CategoryNavBar.tsx        # Horizontal category navigation
│   │   ├── Footer.tsx                # 4-column footer with newsletter
│   │   ├── WeatherDateBar.tsx        # Weather, date, Hijri, prayer times, city selector
│   │   ├── NewsBanner.tsx            # Marquee news/promotions banner
│   │   ├── MaintenanceBanner.tsx     # Maintenance mode banner
│   │   └── PrayerTimesDisplay.tsx    # Prayer times mini-display
│   │
│   ├── home/
│   │   ├── HeroSection.tsx           # Full-width hero carousel with overlay
│   │   ├── FeaturedProducts.tsx      # Featured products carousel
│   │   ├── NewArrivalsSection.tsx    # New arrivals carousel
│   │   ├── BestSellersSection.tsx    # Best sellers carousel
│   │   ├── CategoriesSection.tsx     # Circular category navigation
│   │   ├── BlogSection.tsx           # Blog posts carousel
│   │   ├── RecentlyViewedSection.tsx # Recently viewed products
│   │   └── ProductCarouselSection.tsx # Shared carousel component
│   │
│   ├── store/
│   │   ├── ProductCard.tsx           # Product card with badges, wishlist, compare, quick view
│   │   ├── ProductFilters.tsx        # Filter sheet + sort select
│   │   ├── ProductReviews.tsx        # Product review list + form
│   │   ├── QuickViewModal.tsx        # Quick view dialog
│   │   ├── WishlistButton.tsx        # Heart toggle button
│   │   ├── CompareButton.tsx         # Compare toggle button
│   │   ├── ComparisonBar.tsx         # Bottom comparison bar
│   │   ├── CategoryCard.tsx          # Category display card
│   │   ├── BarcodeScanner.tsx        # Camera barcode scanner
│   │   ├── SocialShareButtons.tsx    # Social share buttons
│   │   └── YouMayAlsoLike.tsx        # Related products
│   │
│   ├── blog/
│   │   ├── BlogCard.tsx              # Blog post card
│   │   ├── BlogComments.tsx          # Comments section
│   │   ├── CommentItem.tsx           # Single comment
│   │   └── NewsletterSubscription.tsx # Newsletter signup
│   │
│   ├── checkout/
│   │   ├── PaymentMethodSelector.tsx # Payment method picker
│   │   ├── CardDetailsForm.tsx       # Credit card form
│   │   └── DiscountCodeInput.tsx     # Discount code input
│   │
│   ├── orders/
│   │   ├── OrderTrackingTimeline.tsx  # Tracking event timeline
│   │   ├── AddTrackingEventForm.tsx   # Admin tracking form
│   │   ├── PaymentStatusBadge.tsx     # Payment status display
│   │   └── TransactionHistory.tsx     # Transaction list
│   │
│   ├── seo/
│   │   ├── CanonicalUrl.tsx           # <link rel="canonical">
│   │   ├── SocialMetaTags.tsx         # OpenGraph + Twitter meta
│   │   ├── OrganizationJsonLd.tsx     # Organization structured data
│   │   ├── ProductJsonLd.tsx          # Product structured data
│   │   └── BreadcrumbJsonLd.tsx       # Breadcrumb structured data
│   │
│   ├── chat/
│   │   └── ChatWidget.tsx             # Floating chat widget
│   │
│   ├── widgets/
│   │   ├── PageWidgets.tsx            # Widget container per page
│   │   ├── WidgetRenderer.tsx         # Widget type dispatcher
│   │   ├── WidgetBanner.tsx           # Banner widget
│   │   ├── WidgetCarousel.tsx         # Carousel widget
│   │   ├── WidgetRichText.tsx         # Rich text widget
│   │   └── WidgetTestimonials.tsx     # Testimonials widget
│   │
│   ├── admin/
│   │   ├── AdminLayout.tsx            # Admin sidebar + content layout
│   │   ├── StatCard.tsx               # Dashboard stat card
│   │   ├── ProductFormDialog.tsx      # Product create/edit dialog
│   │   ├── ProductImportDialog.tsx    # Excel product import
│   │   ├── BlogPostFormDialog.tsx     # Blog post editor dialog
│   │   ├── ImageUpload.tsx            # Image upload component
│   │   ├── RichTextEditor.tsx         # TipTap rich text editor
│   │   ├── VATInvoice.tsx             # VAT invoice generator
│   │   ├── analytics/                 # Sales analytics components
│   │   ├── backup/                    # Backup management components
│   │   ├── blog/                      # Blog admin tabs
│   │   ├── discounts/                 # Discount management
│   │   ├── docs/                      # Documentation viewer
│   │   ├── plugins/                   # Plugin cards
│   │   ├── settings/                  # Settings forms
│   │   ├── shipping/                  # Shipping zone management
│   │   ├── sitehealth/                # SEO health components
│   │   ├── theme/                     # Theme customization UI
│   │   ├── trends/                    # AI market trends
│   │   └── updates/                   # Theme update management
│   │
│   └── ui/                            # 40+ shadcn/ui components (standard)
│
├── pages/
│   ├── Index.tsx                       # Homepage
│   ├── Products.tsx                    # Products listing
│   ├── ProductDetail.tsx               # Single product page
│   ├── Categories.tsx                  # Categories grid
│   ├── CategoryDetail.tsx              # Category products
│   ├── Blog.tsx                        # Blog listing
│   ├── BlogPost.tsx                    # Single blog post
│   ├── Cart.tsx                        # Shopping cart
│   ├── Checkout.tsx                    # Checkout flow (795 lines)
│   ├── OrderHistory.tsx                # User order history
│   ├── Profile.tsx                     # User profile
│   ├── Wishlist.tsx                    # Wishlist page
│   ├── Compare.tsx                     # Product comparison
│   ├── About.tsx                       # About us page
│   ├── Auth.tsx                        # Login/Signup + social auth
│   ├── Docs.tsx                        # Theme documentation
│   ├── ThemeUpdates.tsx                # Theme changelog
│   ├── NotFound.tsx                    # 404 page
│   │
│   └── admin/
│       ├── AdminDashboard.tsx          # Dashboard with stats + charts
│       ├── AdminProducts.tsx           # Product management
│       ├── AdminCategories.tsx         # Category management
│       ├── AdminOrders.tsx             # Order management
│       ├── AdminCustomers.tsx          # Customer list
│       ├── AdminBlog.tsx               # Blog management (posts, categories, pages, media, tags)
│       ├── AdminBlogAnalytics.tsx      # Blog analytics
│       ├── AdminBlogComments.tsx       # Comment moderation
│       ├── AdminNewsletter.tsx         # Newsletter subscribers
│       ├── AdminDiscounts.tsx          # Discount codes + product offers + loyalty
│       ├── AdminShipping.tsx           # Shipping zones
│       ├── AdminCheckoutPayment.tsx    # Payment settings
│       ├── AdminTheme.tsx              # Theme customization hub
│       ├── AdminThemeDocumentation.tsx # Theme docs viewer
│       ├── AdminThemeUpdates.tsx       # Theme versions management
│       ├── AdminPlugins.tsx            # Plugin marketplace
│       ├── AdminSiteHealth.tsx         # SEO health scanner
│       ├── AdminBackups.tsx            # Backup management
│       ├── AdminTrends.tsx             # AI market trends
│       ├── AdminChat.tsx               # Chat management
│       └── AdminSettings.tsx           # Store settings
│
└── test/
    ├── setup.ts
    └── example.test.ts
```

---

## 3. DESIGN SYSTEM

### 3.1 Fonts

Loaded via Google Fonts in `index.html` with `media="print" onload="this.media='all'"` for non-blocking:

| Font | Weights | Usage |
|------|---------|-------|
| **Inter** | 300, 400, 500, 600, 700 | Primary English font (`font-sans`) |
| **Cairo** | 300, 400, 500, 600, 700 | Arabic RTL font (`font-arabic`) |

Additional fonts in Tailwind config but loaded dynamically via `loadGoogleFont()` when selected in theme admin:
- Lora (serif), Space Mono (monospace), Poppins, DM Sans, Work Sans, Roboto, Merriweather, Crimson Pro

### 3.2 CSS Variables (Light Mode — `:root`)

```css
/* Core Brand */
--background: 183 47% 91%;        /* #DFF2F3 — soft teal */
--foreground: 240 96% 9%;         /* #01012D — deep navy */

/* Cards & Popovers */
--card: 0 0% 100%;                /* white */
--card-foreground: 240 96% 9%;
--popover: 0 0% 100%;
--popover-foreground: 240 96% 9%;

/* Primary: Blue */
--primary: 200 75% 38%;           /* darkened for WCAG AA */
--primary-foreground: 0 0% 100%;

/* Secondary: Light Teal */
--secondary: 183 47% 95%;
--secondary-foreground: 240 96% 9%;

/* Muted */
--muted: 183 30% 93%;
--muted-foreground: 240 10% 40%;

/* Accent/Destructive: Red */
--accent: 6 78% 44%;              /* darkened for WCAG AA */
--accent-foreground: 0 0% 100%;
--destructive: 6 78% 44%;
--destructive-foreground: 0 0% 100%;

/* Semantic */
--info: 200 75% 38%;
--info-foreground: 0 0% 100%;
--success: 142 76% 36%;
--success-foreground: 0 0% 100%;
--warning: 45 93% 47%;
--warning-foreground: 0 0% 10%;

/* UI Elements */
--border: 183 20% 85%;
--input: 183 20% 85%;
--ring: 200 75% 38%;

/* Links (white on dark header) */
--link: 0 0% 100%;
--link-hover: 198 73% 48%;        /* #1E9ED8 */

/* Header/Footer Background */
--header-background: 240 96% 9%;  /* #01012D */

/* Button */
--button: 6 78% 44%;              /* Red CTA */
--button-foreground: 0 0% 100%;

/* Border Radius */
--radius: 0.375rem;

/* Sidebar (Admin) */
--sidebar-background: 240 96% 9%;
--sidebar-foreground: 0 0% 100%;
--sidebar-primary: 200 75% 38%;
--sidebar-primary-foreground: 0 0% 100%;
--sidebar-accent: 240 80% 15%;
--sidebar-accent-foreground: 0 0% 100%;
--sidebar-border: 240 50% 20%;
--sidebar-ring: 200 75% 49%;

/* Gradients */
--gradient-primary: linear-gradient(135deg, hsl(200,75%,49%) 0%, hsl(198,73%,48%) 100%);
--gradient-accent: linear-gradient(135deg, hsl(6,78%,57%) 0%, hsl(6,78%,50%) 100%);
--gradient-hero: linear-gradient(180deg, hsl(183,47%,91%) 0%, hsl(183,47%,85%) 100%);
--gradient-card: linear-gradient(180deg, hsl(0,0%,100%) 0%, hsl(183,47%,93%) 100%);

/* Shadows */
--shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1);
--shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 2px 4px -1px hsl(0 0% 0% / 0.1);
--shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 4px 6px -1px hsl(0 0% 0% / 0.1);
--shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 8px 10px -1px hsl(0 0% 0% / 0.1);
--shadow-glow: 0 0 20px hsl(200 79% 49% / 0.2);

/* Charts */
--chart-1: 200 75% 49%;
--chart-2: 183 47% 50%;
--chart-3: 6 78% 57%;
--chart-4: 142 76% 36%;
--chart-5: 45 93% 47%;
```

### 3.3 Dark Mode (`.dark` class)

```css
--background: 240 50% 8%;
--foreground: 0 0% 95%;
--card: 240 50% 12%;
--primary: 200 75% 55%;
--secondary: 240 40% 18%;
--muted: 240 40% 18%;
--muted-foreground: 240 10% 65%;
--accent: 6 78% 60%;
--destructive: 6 70% 55%;
--border: 0 0% 100% / 10%;
--input: 0 0% 100% / 15%;
--button: 0 0% 100%;
--button-foreground: 0 0% 0%;
/* All sidebar, gradient, shadow vars also change — see index.css */
```

### 3.4 Custom CSS Utilities

```css
/* Gradient backgrounds */
.bg-gradient-primary { background: var(--gradient-primary); }
.bg-gradient-accent  { background: var(--gradient-accent); }
.bg-gradient-hero    { background: var(--gradient-hero); }
.bg-gradient-card    { background: var(--gradient-card); }

/* Glass morphism */
.glass      { @apply backdrop-blur-md bg-white/80; }
.glass-dark { @apply backdrop-blur-md bg-black/50; }

/* Text gradient */
.text-gradient-primary { background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

/* Product card hover */
.product-card { @apply transition-all duration-300 ease-out; }
.product-card:hover { @apply -translate-y-1; box-shadow: var(--shadow-xl); }

/* Category pill */
.category-pill { @apply inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground; }

/* Price badge */
.price-badge { @apply inline-flex items-center px-3 py-1 rounded-full text-lg font-bold bg-primary text-primary-foreground; }

/* Blog card */
.blog-card { @apply transition-all duration-300 ease-out overflow-hidden; }
.blog-card:hover { @apply -translate-y-1; box-shadow: var(--shadow-lg); }

/* Admin stat card */
.stat-card { @apply relative overflow-hidden rounded-xl p-6 transition-all duration-300; background: var(--gradient-card); box-shadow: var(--shadow-md); }

/* RTL flip */
[dir="rtl"] .rtl-flip { transform: scaleX(-1); }
```

### 3.5 Animations

| Name | CSS | Duration | Usage |
|------|-----|----------|-------|
| `fade-in` | translateY(10px)→0, opacity 0→1 | 0.5s ease-out | Page elements on load |
| `slide-in-right` | translateX(20px)→0 | 0.5s ease-out | RTL entry |
| `slide-in-left` | translateX(-20px)→0 | 0.5s ease-out | LTR entry |
| `scale-in` | scale(0.95)→1 | 0.3s ease-out | Modals |
| `float` | translateY(0)→(-10px)→0 | 3s infinite | Floating elements |
| `pulse-gentle` | opacity 1→0.7→1 | 2s infinite | Subtle pulsing |
| `shimmer` | background-position slide | 1.5s infinite | Loading skeletons |
| `marquee` | translateX(0%)→(-33.33%) | 20s linear infinite | News banner |
| `accordion-down/up` | height 0↔content | 0.2s ease-out | Accordion |

Stagger classes: `.stagger-1` through `.stagger-5` (0.1s–0.5s delay)

### 3.6 Tailwind Config

Full config in `tailwind.config.ts` — extends default with:
- **Font families**: `sans` (Inter), `arabic` (Cairo), `serif` (Lora), `mono` (Space Mono)
- **Colors**: All mapped to CSS variables via `hsl(var(--token))`
- **Border radius**: `lg`, `md`, `sm` derived from `--radius`
- **Box shadows**: `glow`, `soft`, `elevated`, `dramatic`, `2xs`–`2xl`
- **Plugins**: `tailwindcss-animate`, `@tailwindcss/typography`

---

## 4. ROUTING

### 4.1 Route Table

| Path | Component | Access | Layout |
|------|-----------|--------|--------|
| `/` | `Index` | Public | MainLayout |
| `/products` | `Products` | Public | MainLayout |
| `/products/:slug` | `ProductDetail` | Public | MainLayout |
| `/categories` | `Categories` | Public | MainLayout |
| `/categories/:id` | `CategoryDetail` | Public | MainLayout |
| `/blog` | `Blog` | Public | MainLayout |
| `/blog/:slug` | `BlogPost` | Public | MainLayout |
| `/cart` | `Cart` | Public | MainLayout |
| `/checkout` | `Checkout` | Public (guest checkout) | MainLayout |
| `/orders` | `OrderHistory` | Auth required | MainLayout |
| `/profile` | `Profile` | Auth required | MainLayout |
| `/wishlist` | `Wishlist` | Auth required | MainLayout |
| `/compare` | `Compare` | Public | MainLayout |
| `/about` | `About` | Public | MainLayout |
| `/auth` | `Auth` | Public (redirects if logged in) | MainLayout |
| `/theme-updates` | `ThemeUpdates` | Public | MainLayout |
| `/docs` | `Docs` | Public | MainLayout |
| `/admin` | `AdminDashboard` | Admin only | AdminLayout |
| `/admin/products` | `AdminProducts` | Admin only | AdminLayout |
| `/admin/categories` | `AdminCategories` | Admin only | AdminLayout |
| `/admin/orders` | `AdminOrders` | Admin only | AdminLayout |
| `/admin/customers` | `AdminCustomers` | Admin only | AdminLayout |
| `/admin/blog` | `AdminBlog` | Admin only | AdminLayout |
| `/admin/blog/analytics` | `AdminBlogAnalytics` | Admin only | AdminLayout |
| `/admin/blog/comments` | `AdminBlogComments` | Admin only | AdminLayout |
| `/admin/newsletter` | `AdminNewsletter` | Admin only | AdminLayout |
| `/admin/discounts` | `AdminDiscounts` | Admin only | AdminLayout |
| `/admin/shipping` | `AdminShipping` | Admin only | AdminLayout |
| `/admin/checkout-payment` | `AdminCheckoutPayment` | Admin only | AdminLayout |
| `/admin/theme` | `AdminTheme` | Admin only | AdminLayout |
| `/admin/plugins` | `AdminPlugins` | Admin only | AdminLayout |
| `/admin/site-health` | `AdminSiteHealth` | Admin only | AdminLayout |
| `/admin/backups` | `AdminBackups` | Admin only | AdminLayout |
| `/admin/trends` | `AdminTrends` | Admin only | AdminLayout |
| `/admin/chat` | `AdminChat` | Admin only | AdminLayout |
| `/admin/settings` | `AdminSettings` | Admin only | AdminLayout |
| `*` | `NotFound` | Public | — |

### 4.2 Lazy Loading

All pages except `Index` are lazy-loaded via `React.lazy()`. Admin pages and public pages are split into separate chunks. The global `<Suspense fallback={null}>` wraps all routes.

---

## 5. GLOBAL STATE

### 5.1 ThemeContext (`src/contexts/ThemeContext.tsx`)

**Provider hierarchy:** `ThemeProvider` → (in main.tsx, wraps App)

**State:**
```typescript
interface ThemeSettings {
  colors: ThemeColors;           // 21 HSL color tokens
  typography: ThemeTypography;   // fontFamily, fontFamilyArabic
  layout: ThemeLayout;           // sections: SectionConfig[] (id, visible)
  components: ThemeComponents;   // borderRadius, cardShadow, buttonStyle
  content: ThemeContent;         // newsBanner, heroBadges, hero, sectionHeadings, aboutPage, footer, weatherBar
  header: ThemeHeader;           // height, sticky, borderBottom, shadow, backdropBlur, layoutStyle, fontSize, fontWeight, fullWidth, textColor, borderColor
  footer: ThemeFooter;           // backgroundColor, textColor, linkColor, linkHoverColor, borderColor, fontSize, fontWeight, layoutStyle, fullWidth, borderTop, shadow, paddingSize
}
```

**Methods:**
- `updateColor(key, value)` — Update a single color token
- `updateTypography(key, value)` — Update font family
- `updateSectionVisibility(id, visible)` — Show/hide homepage section
- `reorderSections(sections)` — Reorder homepage sections
- `updateComponent(key, value)` — Update border radius, shadow, button style
- `updateContent(content)` — Update all content (news banner, hero, about, footer)
- `updateHeader(key, value)` — Update header setting
- `updateFooter(key, value)` — Update footer setting
- `resetToDefaults()` — Reset everything to DEFAULT_THEME

**Persistence:** localStorage key `theme-settings`. Also listens for `storage` events for iframe live preview sync.

**DOM Application:** `applyThemeToDOM()` sets CSS variables on `:root` and dynamically loads Google Fonts.

### 5.2 AuthContext (`src/contexts/AuthContext.tsx`)

**State:**
- `user: User | null`
- `session: Session | null`
- `isLoading: boolean`
- `isAdmin: boolean` — checked via `user_roles` table query

**Methods:**
- `signUp(email, password, fullName?)` — Supabase signUp
- `signIn(email, password)` — Supabase signInWithPassword
- `signOut()` — Supabase signOut + clear isAdmin

**Admin Check:** On auth state change, queries `user_roles` table for role='admin' using `setTimeout` to avoid blocking.

### 5.3 CartContext (`src/contexts/CartContext.tsx`)

**State:**
```typescript
interface CartItem {
  id: string;
  name: string;
  nameAr: string;
  price: number;       // Price including VAT if enabled
  basePrice: number;    // Price excluding VAT
  vatEnabled: boolean;
  quantity: number;
  image: string;
}
```

**Computed:**
- `totalItems` — Sum of all quantities
- `totalPrice` — Sum of price × quantity
- `totalBasePrice` — Sum of basePrice × quantity
- `totalVAT` — Sum of calculateVAT(basePrice) × quantity (only for vatEnabled items)

**Methods:**
- `addToCart(item)` — Add or increment quantity
- `removeFromCart(id)` — Remove item
- `updateQuantity(id, quantity)` — Update quantity (removes if < 1)
- `clearCart()` — Empty cart

**Persistence:** localStorage key `pharmacy-cms-cart`

### 5.4 LanguageContext (`src/contexts/LanguageContext.tsx`)

**State:**
- `language: 'en' | 'ar'`
- `direction: 'ltr' | 'rtl'`

**Methods:**
- `setLanguage(lang)` — Switch language, saves to localStorage
- `t(key)` — Translation lookup from inline dictionary

**Persistence:** localStorage key `pharmacy-cms-language`

**DOM Effect:** Sets `document.documentElement.dir` and `document.documentElement.lang`

**Translation keys:** ~90 keys covering nav, hero, products, categories, blog, cart, footer, admin, common.

---

## 6. EVERY PAGE

### 6.1 Homepage (`/` — `Index.tsx`)

**Layout:**
1. `<MainLayout>` wrapper (WeatherDateBar → NewsBanner → MaintenanceBanner → Navbar → CategoryNavBar → content → Footer → ComparisonBar → ChatWidget)
2. `<SocialMetaTags>` — Dynamic OG tags with store name
3. Theme-driven sections rendered in order defined by `theme.layout.sections`:
   - `hero` → `<HeroSection>` — Full-width carousel with overlay gradient, CTA button
   - `featured` → `<FeaturedProducts>` — Horizontal product carousel (is_featured=true, limit 8)
   - `newArrivals` → `<NewArrivalsSection>` — Product carousel with Sparkles icon, bg-primary/5
   - `bestSellers` → `<BestSellersSection>` — Product carousel with TrendingUp icon
   - `recentlyViewed` → `<RecentlyViewedSection>` — From localStorage
   - `categories` → `<CategoriesSection>` — Circular category bubbles, horizontal scroll
   - `blog` → `<BlogSection>` — Blog post cards carousel
4. `<PageWidgets page="home">` — Custom admin-configured widgets

**Section visibility and order** are configurable from admin theme settings.

### 6.2 Products (`/products` — `Products.tsx`)

**Layout:**
1. H1 title
2. Search bar with barcode scanner icon
3. Sort select + Filter sheet button
4. Active filter badges (dismissable)
5. Category badges row (horizontal, click to filter)
6. Product grid: 1 col mobile, 2 sm, 3 lg, 4 xl
7. Empty state with "Clear all filters" button

**Data:** `useProducts()` with dynamic filters (category, search, price range, stock, prescription, sort)

**Loading:** 8 skeleton cards (aspect-square + text lines)

### 6.3 Cart (`/cart` — `Cart.tsx`)

**Layout:**
- Empty: Icon + "Your cart is empty" + Continue Shopping button
- Filled: 2-column grid (lg:2/1 split)
  - Left: Cart items (image, name, price, quantity ±, remove)
  - Right: Sticky order summary (subtotal, VAT, shipping, free shipping threshold message, total, Checkout button)

**Data:** From CartContext. Store settings for shipping/currency from `useStoreSettings()`.

### 6.4 Checkout (`/checkout` — `Checkout.tsx`)

**Layout:** Multi-section form:
1. Customer info (name, email, phone)
2. Shipping address (street, city, country, postal code)
3. Payment method selector (COD, credit card, STC Pay, bank transfer)
4. Card details form (if card selected)
5. Discount code input
6. Order notes
7. Order summary sidebar
8. Submit button

**Validation:** Zod schema (`checkoutSchema`) with react-hook-form
**Payment:** `useProcessPayment()` hook
**Order Creation:** `useCreateOrder()` mutation
**Post-Success:** Order confirmation screen with order number

### 6.5 Auth (`/auth` — `Auth.tsx`)

**Layout:** Centered card (max-w-md) with:
1. Tabs: Login / Sign Up
2. Login: Email + Password fields with icons
3. Signup: Name + Email + Password fields
4. Separator "OR"
5. Social login buttons: Google (inline SVG logo), Apple (inline SVG logo)
6. Redirects to `/` on successful auth

### 6.6 About (`/about` — `About.tsx`)

Content driven by `theme.content.aboutPage`:
- Title, description
- Mission section
- Feature cards (4 cards with icons: heart, shield, truck, clock)

---

## 7. KEY COMPONENTS

### 7.1 ProductCard (`src/components/store/ProductCard.tsx`)

**Props:** `{ product: LegacyProduct | DBProduct }`

**Structure:**
```
<div.product-card> (rounded-2xl, border, shadow-soft)
  <Link> (image container, aspect-square)
    <img> (object-cover, hover:scale-110)
    Badges: New Arrival (emerald), Best Seller (orange), Featured (amber), Discount %, Prescription
    WishlistButton, CompareButton, QuickView button
    Out-of-stock overlay
  </Link>
  <div.p-4>
    Category (text-xs, uppercase, text-primary)
    Name (font-semibold, line-clamp-2)
    Rating (Star icon + number + review count)
    Price (text-xl, font-bold) + original price (line-through) + VAT label
    Add to Cart button
  </div>
</div>
```

**Features:**
- Dual format support (legacy Product type + DB Product type)
- VAT calculation via `getDisplayPrice()`
- Stock validation before add-to-cart
- Toast notifications on add
- QuickViewModal integration

### 7.2 Navbar (`src/components/layout/Navbar.tsx`)

**Desktop:**
- Logo (uploaded or fallback gradient square + store name)
- Nav links: Home, About, Theme Updates, Blog (with dropdown)
- Actions: Search, Language toggle (Globe + badge), Wishlist heart (if logged in), Cart (with count badge), User menu dropdown (Profile, Wishlist, Orders, Logout) or Login button, Admin button (if admin)

**Mobile:**
- Logo + actions (search, language, cart, hamburger)
- Slide-down menu with all links + auth actions

**Theme-driven:** height (compact/default/tall), sticky, border, shadow, backdrop blur, font size/weight, layout style, custom text/border colors

### 7.3 Footer (`src/components/layout/Footer.tsx`)

**4-column grid** (1→2→4 responsive):
1. **About:** Logo, description text, social icons (Facebook, Twitter, Instagram)
2. **Quick Links:** Products, Categories, Blog, About, Theme Updates
3. **Support:** Contact Us, Privacy Policy, Terms of Service
4. **Contact:** Phone, Email, Address (from company settings)

**Newsletter section** (optional, from theme settings): Title, description, email input + Subscribe button

**Copyright bar:** `© {year} {storeName}. All rights reserved.`

**Theme-driven:** background color, text color, link colors, border, shadow, padding, font size/weight, layout style

### 7.4 WeatherDateBar (`src/components/layout/WeatherDateBar.tsx`)

**Compact bar (h-9)** at top of page:
- Left: Day name | Gregorian date | Hijri date (using `islamic-umalqura` calendar)
- Right: Prayer times (next prayer highlighted) | Weather icon + temp | City selector popover

**APIs:**
- Weather: `https://api.open-meteo.com/v1/forecast`
- City search: `https://geocoding-api.open-meteo.com/v1/search`
- Prayer times: `https://api.aladhan.com/v1/timings`

### 7.5 NewsBanner (`src/components/layout/NewsBanner.tsx`)

**Marquee banner:** bg-accent, repeating news items with emoji, infinite scroll animation (20s)

### 7.6 HeroSection (`src/components/home/HeroSection.tsx`)

**Full-width carousel:**
- `aspect-[21/8]` on desktop, `aspect-[21/7]` on mobile, min-h-280px, max-h-480px
- Image with overlay gradient (`from-foreground/70 via-foreground/30 to-transparent`)
- Content: H1 title (text-3xl md:text-5xl), subtitle, CTA button
- Navigation arrows (if multiple slides) + dot indicators
- Auto-advance every 5s

---

## 8. API / DATA LAYER

### 8.1 Supabase Client

```typescript
import { supabase } from '@/integrations/supabase/client';
```

Base URL: `import.meta.env.VITE_SUPABASE_URL`
Anon key: `import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY`

### 8.2 Data Fetching Pattern

All hooks use `@tanstack/react-query`:
```typescript
useQuery({
  queryKey: ['resource-name', options],
  queryFn: async () => {
    const { data, error } = await supabase.from('table').select('*');
    if (error) throw error;
    return data;
  }
});
```

### 8.3 Key API Calls

| Hook | Table | Operation | Filters |
|------|-------|-----------|---------|
| `useProducts` | `products` + `categories` | SELECT | is_active, category_id, is_featured, is_new_arrival, is_best_seller, search (ilike), barcode, price range, in_stock, requires_prescription, sort (newest/price/rating/name), limit |
| `useCategories` | `categories` | SELECT | is_active, parent_category_id IS NULL, order by sort_order |
| `useStoreSettings` | `app_settings` | SELECT | keys: store_name, store_name_ar, currency, shipping_cost, free_shipping_threshold, maintenance_mode, guest_checkout_enabled |
| `useBranding` | `app_settings` | SELECT | keys: logo_white_bg, logo_transparent, branding_colors |
| `useCompanyInfo` | `app_settings` | SELECT | keys: company_name, company_address, cr_number, vat_number, company_email, company_phone, site_url, store_name |
| `useBlogPosts` | `blog_posts` | SELECT | is_published=true, order by published_at DESC |
| `useWishlist` | `wishlists` + `products` | SELECT/INSERT/DELETE | user_id = current user |
| `useOrders` (create) | `orders` + `order_items` | INSERT | Includes payment transaction |
| `useUserOrders` | `orders` + `order_items` | SELECT | user_id = current user |
| `useReviews` | `product_reviews` | SELECT/INSERT | product_id, is_approved |
| `useAdminOrders` | `orders` + `order_items` | SELECT/UPDATE | All orders, status updates |
| `useAdminProducts` | `products` | INSERT/UPDATE/DELETE | Full CRUD |
| `useDiscounts` | `discount_codes` | SELECT/INSERT/UPDATE/DELETE | Code validation |
| `useShippingZones` | `shipping_zones` | SELECT/INSERT/UPDATE/DELETE | Full CRUD |
| `useSiteHealth` | `site_health_scans` | SELECT/INSERT | Scan results |
| `useBackups` | `site_backups` + `backup_schedules` | SELECT/INSERT/UPDATE | Backup management |

### 8.4 Edge Functions

| Function | Path | Purpose |
|----------|------|---------|
| `ai-trends` | `/functions/v1/ai-trends` | AI-powered market trend analysis |
| `chat-messages` | `/functions/v1/chat-messages` | Chat message handling |
| `chat-start` | `/functions/v1/chat-start` | Start chat conversation |
| `check-theme-update` | `/functions/v1/check-theme-update` | Check for theme updates |
| `notify-comment` | `/functions/v1/notify-comment` | Blog comment notifications |
| `send-blog-digest` | `/functions/v1/send-blog-digest` | Blog digest email |
| `send-invoice-email` | `/functions/v1/send-invoice-email` | Invoice email |
| `send-order-confirmation` | `/functions/v1/send-order-confirmation` | Order confirmation email |
| `send-scan-notification` | `/functions/v1/send-scan-notification` | Health scan notification |
| `send-update-notification` | `/functions/v1/send-update-notification` | Theme update notification |

---

## 9. DATABASE SCHEMA

### Key Tables

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `products` | Product catalog | name, name_ar, slug, price, original_price, category_id, image_url, images[], in_stock, stock_quantity, is_featured, is_new_arrival, is_best_seller, vat_enabled, barcode, rating, review_count |
| `categories` | Product categories | name, name_ar, slug, icon, image_url, parent_category_id, sort_order |
| `orders` | Customer orders | order_number, customer_name/email/phone, status, subtotal, total, shipping_cost, payment_method, payment_status, shipping_address (JSON) |
| `order_items` | Order line items | order_id, product_id, product_name, quantity, unit_price, total_price |
| `profiles` | User profiles | user_id, full_name, phone, avatar_url, default_shipping_address |
| `user_roles` | Role-based access | user_id, role (enum: admin/moderator/user) |
| `blog_posts` | Blog articles | title, title_ar, slug, content, content_ar, excerpt, image_url, is_published, view_count |
| `blog_categories` | Blog categories | name, name_ar, slug |
| `blog_comments` | Blog comments | blog_post_id, user_id, content, is_approved, parent_comment_id |
| `wishlists` | User wishlists | user_id, product_id |
| `product_reviews` | Product reviews | product_id, user_id, rating, content, is_approved |
| `discount_codes` | Discount codes | code, discount_type, discount_value, usage_limit, is_influencer |
| `product_offers` | Bundle/group offers | product_ids[], offer_type, discount_percentage, group_price |
| `shipping_zones` | Shipping zones | name, regions[], shipping_rate, free_shipping_threshold |
| `app_settings` | Key-value settings | key, value (JSON) |
| `newsletter_subscribers` | Newsletter | email, is_confirmed, is_active |
| `chat_conversations` | Chat sessions | customer_phone, status |
| `chat_messages` | Chat messages | conversation_id, message, sender_type |
| `custom_widgets` | Page widgets | page, widget_type, config (JSON), sort_order |
| `page_customizations` | Per-page settings | page_key, page_title, meta_description, hidden_sections |
| `site_health_scans` | SEO health scans | overall_score, results (JSON), issues_found |
| `page_seo_scores` | Per-page SEO | page_path, overall_score, has_meta_title, has_h1, etc. |
| `payment_transactions` | Payment records | order_id, amount, payment_method, status |
| `stock_history` | Stock changes | product_id, previous_quantity, new_quantity, change_type |
| `theme_versions` | Theme releases | version, changelog, file URLs |
| `theme_licenses` | Theme licenses | license_key, customer_email, platform |
| `trend_reports` | AI trend data | analysis_type, query, result (JSON) |

### Database Functions
- `has_role(user_id, role)` — SECURITY DEFINER, checks user_roles table
- `handle_new_user()` — Trigger: creates profile + assigns 'user' role on signup
- `decrease_stock_on_order()` — Trigger: decrements stock on order_items insert
- `update_product_rating()` — Trigger: recalculates product rating on review change
- `record_blog_view()` — SECURITY DEFINER, rate-limited blog view tracking with IP hashing
- `generate_order_number()` — Trigger: generates 'ORD-YYYYMMDD-XXXX' format

---

## 10. FORMS

### 10.1 Checkout Form
| Field | Type | Validation | Required |
|-------|------|-----------|----------|
| customerName | text | min 2 chars | Yes |
| customerEmail | email | valid email | Yes |
| customerPhone | tel | optional | Configurable |
| street | text | min 5 chars | Yes |
| city | text | min 2 chars | Yes |
| country | text | min 2 chars, default "Saudi Arabia" | Yes |
| postalCode | text | min 3 chars | Yes |
| notes | textarea | optional | No |

### 10.2 Auth Forms
**Login:** email (required), password (required)
**Signup:** fullName (optional), email (required), password (required, min 6)

### 10.3 Product Review Form
| Field | Type | Validation |
|-------|------|-----------|
| rating | 1-5 stars | Required |
| title | text | Optional |
| content | textarea | Optional |

---

## 11. RESPONSIVE BEHAVIOR

| Breakpoint | Pixel | Key Changes |
|------------|-------|-------------|
| Default | <640px | Single column grids, mobile menu, compact cards |
| `sm` | 640px | 2-column product grid, date visible in WeatherBar |
| `md` | 768px | Desktop nav visible, mobile menu hidden, 3-col products, hero text larger |
| `lg` | 1024px | 4-col products, 2-col cart layout, sidebar visible |
| `xl` | 1280px | 4-col products, container max-width 1400px |
| `2xl` | 1400px | Container cap |

---

## 12. RTL/LTR

**Mechanism:** `LanguageContext` sets `document.documentElement.dir` to `rtl` or `ltr`.

**CSS:** `[dir="rtl"]` selectors in index.css set `font-family: var(--font-arabic)`.

**Component patterns:**
- `direction === 'rtl'` conditionals for arrow icons (ArrowLeft ↔ ArrowRight)
- `rtl:` Tailwind prefix for padding/margin flips (e.g., `pl-10 rtl:pl-3 rtl:pr-10`)
- `.rtl-flip` class for icons that need horizontal flip
- `text-left rtl:text-right` for text alignment
- `ms-auto` (margin-start) instead of `ml-auto` for auto margins

**Stored:** localStorage key `pharmacy-cms-language`, values `'en'` or `'ar'`

---

## 13. ENVIRONMENT VARIABLES

| Variable | Purpose |
|----------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon key |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project ID |

Server-side secrets (Edge Functions):
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_DB_URL`
- `RESEND_API_KEY` — Email sending
- `LOVABLE_API_KEY` — AI functionality

---

## 14. UTILITY FUNCTIONS

### `cn(...inputs)` — `src/lib/utils.ts`
Combines `clsx` + `tailwind-merge` for conditional class merging.

### VAT — `src/lib/vat.ts`
```typescript
VAT_RATE = 0.15 (15%)
calculateVAT(price) → price × 0.15 (rounded to 2 decimals)
calculateTotalWithVAT(price) → price × 1.15
getDisplayPrice(price, vatEnabled) → { priceExclVAT, vatAmount, totalPrice }
```

### Image Optimization — `src/lib/imageUtils.ts`
- `optimizeImageUrl(url, width, height?)` — For Unsplash URLs: adds `fm=webp&q=80&w=X`
- `generateSrcSet(url, widths[])` — Generates srcset string for responsive images

### Sanitization — `src/lib/sanitize.ts`
- `sanitizeSearchInput(input, maxLength=100)` — Removes `,().` characters for PostgREST safety
- `isValidUUID(value)` — UUID v4 regex validation

### Color Utils — `src/lib/colorUtils.ts`
- `hexToHsl(hex)` → `"H S% L%"` string
- `hslToHex(hsl)` → `"#RRGGBB"` string

---

## 15. SEO COMPONENTS

### CanonicalUrl
Adds `<link rel="canonical" href={currentUrl}>` via `document.head`

### SocialMetaTags
Props: `title`, `description`, `image?`, `type?` ('website'|'article'|'product')
Sets: `og:title`, `og:description`, `og:type`, `og:image`, `og:url`, `twitter:card`, `twitter:title`, `twitter:description`

### OrganizationJsonLd
Injects `<script type="application/ld+json">` with Organization schema

### ProductJsonLd
Injects Product schema with offers, rating, availability

### BreadcrumbJsonLd
Injects BreadcrumbList schema from current route

---

## 16. WIDGET SYSTEM

Widgets are custom blocks configurable per page via admin:

| Widget Type | Component | Config |
|------------|-----------|--------|
| `banner` | `WidgetBanner` | image, title, subtitle, link, CTA text |
| `carousel` | `WidgetCarousel` | slides (image + title + link) |
| `rich_text` | `WidgetRichText` | HTML content |
| `testimonials` | `WidgetTestimonials` | testimonial items (name, text, rating) |

Stored in `custom_widgets` table. Rendered by `<PageWidgets page="home|products|cart|...">`.

---

## 17. PLUGIN SYSTEM

Plugin catalog defined in `src/data/pluginCatalog.ts`. Installed plugins stored in `installed_plugins` table with settings JSON. `PluginCard` component shows install/activate/deactivate controls.

---

## 18. ADMIN LAYOUT

`AdminLayout.tsx` provides:
- Left sidebar (bg-sidebar, w-64) with navigation links grouped by section
- Collapsible on mobile (sheet)
- Content area with header showing page title
- Role check: redirects non-admin users

Admin sidebar sections:
1. Dashboard
2. Products, Categories
3. Orders, Customers
4. Blog, Blog Analytics, Comments
5. Newsletter
6. Discounts
7. Shipping
8. Checkout & Payment
9. Theme
10. Plugins
11. Site Health
12. Backups
13. Trends
14. Chat
15. Settings

---

## 19. STORAGE BUCKETS

| Bucket | Public | Purpose |
|--------|--------|---------|
| `product-images` | Yes | Product photos |
| `blog-images` | Yes | Blog post images |
| `avatars` | Yes | User profile photos |
| `branding` | Yes | Logo files |
| `theme-files` | No | Theme file downloads |
| `payment-receipts` | No | Payment proof uploads |

---

## 20. ADDITIONAL NOTES

### Currency
Default: SAR (Saudi Riyal). Configurable via `app_settings` table.

### VAT
15% Saudi VAT. Per-product toggle (`vat_enabled`). Prices stored excluding VAT; displayed including VAT when enabled.

### ZATCA Compliance
`src/lib/zatca.ts` generates QR codes for ZATCA (Saudi e-invoicing authority) compliance.

### Prayer Times
Uses Aladhan API (`api.aladhan.com`) for Islamic prayer times. Shows next prayer time highlighted.

### Hijri Calendar
Uses `Intl.DateTimeFormat` with `calendar: 'islamic-umalqura'` for Hijri date display.

### Chat Widget
Lazy-loaded floating chat button (bottom-right). Uses `chat_conversations` + `chat_messages` tables. WhatsApp number configurable via `chat_settings` table.

### Barcode Scanner
`html5-qrcode` library for camera-based barcode scanning on products page.

### Product Comparison
Up to 4 products. ComparisonBar fixed at bottom of screen. Compare page shows side-by-side feature comparison.

### Stock Management
Automatic stock decrease on order via database trigger. Stock history logged in `stock_history` table.

### Order Tracking
Timeline-based tracking with events: pending → processing → shipped → delivered. Admin can add tracking events with location and notes.

### Theme Live Preview
Admin theme editor uses iframe + localStorage sync (StorageEvent listener) for real-time preview without page reload.
