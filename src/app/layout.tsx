import type { Metadata } from "next";
import { Lora, Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "@/styles/maya.css";

const lora = Lora({
  variable: "--ff-body",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--ff-label",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const etBook = localFont({
  variable: "--font-serif-essay",
  display: "swap",
  fallback: ["Palatino", "Palatino Linotype", "Book Antiqua", "Georgia", "serif"],
  src: [
    {
      path: "./fonts/et-book/et-book-roman-line-figures.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/et-book/et-book-italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/et-book/et-book-bold-line-figures.woff",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Michael Yao",
    template: "%s",
  },
  description: "Computer-science & math student at Harvey Mudd. Atoms and algorithms.",
  openGraph: {
    title: "Michael Yao",
    description: "Computer-science & math student at Harvey Mudd. Atoms and algorithms.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Yao",
    description: "Computer-science & math student at Harvey Mudd. Atoms and algorithms.",
  },
  icons: {
    icon: [
      { url: "/seo/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/seo/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/seo/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/seo/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/seo/apple-touch-icon.png",
    shortcut: "/seo/favicon-32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${robotoMono.variable} ${etBook.variable}`}>
      <body>{children}</body>
    </html>
  );
}
