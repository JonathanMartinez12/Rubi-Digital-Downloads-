import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CartSidebar from "@/components/cart-sidebar";

export const metadata: Metadata = {
  title: "Rubi Digital Downloads - Premium Financial Workbooks & Guides",
  description:
    "Transform your financial future with premium digital workbooks, templates, and guides. From generational wealth building to first-time homebuying, Rubi Digital Downloads provides actionable tools for every stage of your financial journey.",
  keywords: [
    "digital downloads",
    "financial workbooks",
    "wealth building",
    "homebuying guides",
    "budget templates",
    "financial planning",
    "generational wealth",
    "real estate investing",
  ],
  authors: [{ name: "Rubi Digital Downloads" }],
  openGraph: {
    title: "Rubi Digital Downloads - Premium Financial Workbooks & Guides",
    description:
      "Transform your financial future with premium digital workbooks, templates, and guides.",
    type: "website",
    locale: "en_US",
    siteName: "Rubi Digital Downloads",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rubi Digital Downloads - Premium Financial Workbooks & Guides",
    description:
      "Transform your financial future with premium digital workbooks, templates, and guides.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Navbar />
        <CartSidebar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
