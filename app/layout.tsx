import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://typing-test-fm.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8b5cf6" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a14" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TypeMaster - Free Online Typing Speed Test | Improve Your WPM",
    template: "%s | TypeMaster",
  },
  description:
    "Test and improve your typing speed with TypeMaster. Free online typing test with real-time WPM tracking, accuracy stats, and progress comparison. Practice with 120+ texts across easy, medium, and hard difficulty levels.",
  keywords: [
    "typing test",
    "typing speed test",
    "WPM test",
    "words per minute",
    "typing practice",
    "keyboard skills",
    "typing accuracy",
    "free typing test",
    "online typing test",
    "typing speed checker",
    "improve typing speed",
    "typing tutor",
    "keyboard typing test",
    "touch typing",
    "typing game",
    "speed typing",
    "typing trainer",
  ],
  authors: [
    {
      name: "Faysal Mridha",
      url: "https://www.linkedin.com/in/faysaldev/",
    },
  ],
  creator: "Faysal Mridha",
  publisher: "TypeMaster",
  applicationName: "TypeMaster",
  category: "Education",
  classification: "Typing Practice Tool",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "TypeMaster",
    title: "TypeMaster - Free Online Typing Speed Test",
    description:
      "Test and improve your typing speed with real-time WPM tracking, accuracy stats, and progress comparison. 120+ practice texts across multiple difficulty levels.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TypeMaster - Free Online Typing Speed Test",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@typemaster",
    creator: "@faysaldev",
    title: "TypeMaster - Free Online Typing Speed Test",
    description:
      "Test and improve your typing speed with real-time WPM tracking and accuracy stats. Practice with 120+ texts!",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.png",
  },

  manifest: "/manifest.json",

  other: {
    "google-site-verification": "your-google-verification-code",
    "msvalidate.01": "your-bing-verification-code",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TypeMaster",
  description:
    "Free online typing speed test with real-time WPM tracking, accuracy stats, and progress comparison.",
  url: siteUrl,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Faysal Mridha",
    url: "https://www.linkedin.com/in/faysaldev/",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
    bestRating: "5",
    worstRating: "1",
  },
  featureList: [
    "Real-time WPM calculation",
    "Accuracy tracking",
    "Multiple difficulty levels",
    "Progress comparison",
    "Dark and light mode",
    "Keyboard shortcuts",
    "Share results on social media",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
