import type { Metadata } from "next";
import Script from "next/script";
import {
  DM_Sans,
  Geist,
  IBM_Plex_Sans_Condensed,
  JetBrains_Mono,
  Lora,
  Roboto_Mono,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "@/styles/simple-portfolio.css";
import "@/styles/about-clone.css";
import "@/styles/site-nav.css";

const THEME_BOOTSTRAP = `
  (function () {
    try {
      var stored = window.localStorage.getItem("theme");
      var theme = stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      document.documentElement.dataset.theme = theme;
    } catch (error) {
      document.documentElement.dataset.theme = "light";
    }
  })();
`;

// Primary sitewide type — matches langalpha.ai's font choices (Geist / JetBrains Mono).
const geist = Geist({
  variable: "--ff-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--ff-label",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// /about only — georgialyu.com's exact type pair. Exposed as CSS variables here
// and remapped onto --ff-body / --ff-label inside `.about-clone` (see
// styles/about-clone.css) so no other route is affected.
const dmSans = DM_Sans({
  variable: "--ff-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const plexCondensed = IBM_Plex_Sans_Condensed({
  variable: "--ff-plex-condensed",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

// Legacy pair, kept only for the /water essay page (see .npage--water override
// in globals.css) — that page intentionally keeps its original serif/mono look.
const lora = Lora({
  variable: "--font-lora-legacy",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono-legacy",
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
  description: "Michael Yao — computer science, mathematics, computational physics, and machine learning.",
  openGraph: {
    title: "Michael Yao",
    description: "Computer science, mathematics, computational physics, and machine learning.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Yao",
    description: "Computer science, mathematics, computational physics, and machine learning.",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${jetbrainsMono.variable} ${lora.variable} ${robotoMono.variable} ${etBook.variable} ${dmSans.variable} ${plexCondensed.variable}`}
    >
      <body>
        {children}
        <Script
          id="theme-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }}
        />
      </body>
    </html>
  );
}
