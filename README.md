# Starfruit Express 🌟

Starfruit Express is a premium, high-end B2B restaurant procurement platform prototype. Designed specifically for chefs and restaurant managers, the platform provides an ultra-fast, intuitive, and visually stunning way to source the finest ingredients in bulk.

## ✨ Key Features

- **Premium Aesthetic**: A bespoke dark-mode interface ("Forest Green" & "Gold") built with custom Tailwind CSS utility classes and glassmorphic UI elements to convey luxury and quality.
- **Instacart-Inspired Layout**: Horizontal scrolling carousels allow chefs to rapidly browse through distinct categories (Produce, Meat & Poultry, Truffles, etc.) without losing their place on the page.
- **Global Search & Filtering**: A sleek, persistent search bar in the global navigation allows users to instantly filter the entire product catalog in real-time.
- **Lightning-Fast Purchasing**: "Quick Add" buttons directly on the product cards allow for instantaneous cart additions without forcing the user to load separate product detail pages.
- **Persistent Shopping Cart**: The global cart state is hooked into `localStorage`, meaning chefs won't lose their orders if they accidentally refresh the page during a busy service.
- **Micro-Animations**: Features custom Scroll-Reveal entrances, pulsing logos, shaking cart notifications, and buttery-smooth toast pop-ups for premium user feedback.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Library**: [React 18](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Vanilla CSS for custom animations/scrollbar hiding)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API (`CartContext`, `SearchContext`, `ToastContext`)

## 🚀 Getting Started Locally

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌐 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js. Simply link this GitHub repository to Vercel for instant deployments.
