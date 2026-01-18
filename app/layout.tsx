import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Typing Speed Test - Improve Your Typing Skills",
  description:
    "Free online typing speed test. Measure your WPM (words per minute) and accuracy. Practice typing with real-time feedback and track your progress over time.",
  keywords: [
    "typing test",
    "typing speed",
    "WPM",
    "words per minute",
    "typing practice",
    "keyboard skills",
    "typing accuracy",
  ],
  authors: [{ name: "Faysal" }],
  creator: "Faysal",
  publisher: "Faysal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://typing-test.vercel.app",
    title: "Typing Speed Test - Improve Your Typing Skills",
    description:
      "Free online typing speed test. Measure your WPM (words per minute) and accuracy. Practice typing with real-time feedback and track your progress over time.",
    siteName: "Typing Speed Test",
    images: [
      {
        url: "/og-image.png", // You can add an og image later
        width: 1200,
        height: 630,
        alt: "Typing Speed Test - Improve Your Typing Skills",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Typing Speed Test - Improve Your Typing Skills",
    description:
      "Free online typing speed test. Measure your WPM (words per minute) and accuracy. Practice typing with real-time feedback and track your progress over time.",
    images: ["/og-image.png"], // You can add an og image later
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://typing-test.vercel.app",
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
