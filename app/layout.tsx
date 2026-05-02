import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "VoltStore — Premium Electronics", template: "%s | VoltStore" },
  description:
    "Shop the latest smartphones, laptops, audio gear, cameras, and gaming equipment at VoltStore.",
  keywords: ["electronics", "smartphones", "laptops", "gaming", "audio", "cameras"],
  openGraph: { type: "website", siteName: "VoltStore" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-[#0a0a0a] text-white antialiased`} suppressHydrationWarning>
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
