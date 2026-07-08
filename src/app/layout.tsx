import type { Metadata } from "next";
import { Lora, Roboto_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "Michael Yao",
    template: "%s",
  },
  description: "Computer-science & physics student at Harvey Mudd. Atoms and algorithms.",
  openGraph: {
    title: "Michael Yao",
    description: "Computer-science & physics student at Harvey Mudd. Atoms and algorithms.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Yao",
    description: "Computer-science & physics student at Harvey Mudd. Atoms and algorithms.",
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
    <html lang="en" className={`${lora.variable} ${robotoMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
