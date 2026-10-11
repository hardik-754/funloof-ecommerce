import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/context/StoreContext";
import { CartProvider } from "@/lib/context/CartContext";
import { Navbar } from "@/components/storefront/Navbar";
import { CartDrawer } from "@/components/storefront/CartDrawer";
import { Footer } from "@/components/storefront/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Funloof | Mindful Wooden Toys for Inquiring Little Minds",
  description:
    "Handcrafted educational wooden toys for toddlers. 100% FSC certified, non-toxic plant stains, screen-free Montessori & STEM play.",
  keywords: [
    "wooden toys",
    "Montessori toys",
    "toddler educational toys",
    "eco-friendly toys",
    "STEM toys",
    "screen-free play",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased bg-cream-50 text-forest-900 selection:bg-forest-200 selection:text-forest-900">
        <StoreProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <CartDrawer />
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
