import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { SITE_CONFIG } from "@/constants";

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
  keywords: [
    "Geethanjalee",
    "Geethanjalee Live in Concert",
    "Peradeniya Concert",
    "University of Peradeniya",
    "Sri Lanka Live Symphony",
    "Kasun Kalhara",
    "Rohana Weerasinghe",
    "Live in Concert Sri Lanka",
    "Classical Fusion",
  ],
  authors: [{ name: "Geethanjalee Organising Committee" }],
  openGraph: {
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.edition}`,
    description: SITE_CONFIG.description,
    url: "https://geethanjalee.lk",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.edition}`,
    description: SITE_CONFIG.description,
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark lenis lenis-smooth">
      <body className="bg-[#0a0a0b] text-white selection:bg-accent selection:text-white antialiased min-h-screen flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
