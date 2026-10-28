import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FilmGrain from "@/components/FilmGrain";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://niyamszn.com"),
  title: "NIYAM — Official Artist Website",
  description:
    "Delhi-based independent pop duo featuring Jey Khamari and Kinshu. Making cinematic music for those who feel everything a little too deeply.",
  keywords: [
    "NIYAM",
    "niyamszn",
    "Jey Khamari",
    "Kinshu",
    "Tum Se Tum Tak",
    "Afsana",
    "Delhi Independent Pop",
    "Indian Indie",
    "Cinematic Music",
  ],
  authors: [{ name: "NIYAM" }],
  openGraph: {
    title: "NIYAM — Official Artist Website",
    description:
      "Blending Hindi lyricism with immersive production. Turning heartbreak and longing into atmospheric late-night anthems.",
    url: "https://niyamszn.com",
    siteName: "NIYAM",
    images: [
      {
        url: "/images/duo-cinematic-clean.png",
        width: 1200,
        height: 630,
        alt: "NIYAM — Jey Khamari & Kinshu",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NIYAM (@niyamszn)",
    description: "Cinematic music for people who feel deeply. Jey Khamari & Kinshu.",
    images: ["/images/duo-cinematic-clean.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-primary font-sans antialiased selection:bg-accent-warm selection:text-black overflow-x-hidden">
        <SmoothScroll>
          <FilmGrain />
          <Navigation />
          <div className="min-h-screen relative flex flex-col w-full bg-[#080808] text-primary">
            {children}
          </div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
