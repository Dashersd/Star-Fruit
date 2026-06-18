import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { SearchProvider } from "@/context/SearchContext";
import { ToastContainer } from "@/components/ToastContainer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Starfruit Express Procurement",
  description: "B2B food supply ordering platform tailored for premium restaurants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-premium-gradient text-ink-white min-h-screen flex flex-col relative overflow-x-hidden`}>
        {/* Subtle dot grid overlay for texture */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40" style={{ backgroundImage: 'radial-gradient(rgba(140,210,179,.09) 1px,transparent 1px)', backgroundSize: '26px 26px', maskImage: 'radial-gradient(120% 60% at 50% 0%,#000 25%,transparent 80%)' }}></div>
        
        <CartProvider>
          <SearchProvider>
            <ToastProvider>
              <Header />
              <main className="flex-1 relative z-10">
                {children}
              </main>
              <ToastContainer />
            </ToastProvider>
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}
