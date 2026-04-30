import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--ff-body",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexCondensed = IBM_Plex_Sans_Condensed({
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
  description: "Chemistry & computer-science student at Harvey Mudd. Atoms and algorithms.",
  openGraph: {
    title: "Michael Yao",
    description: "Chemistry & computer-science student at Harvey Mudd. Atoms and algorithms.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Yao",
    description: "Chemistry & computer-science student at Harvey Mudd. Atoms and algorithms.",
  },
  icons: {
    icon: "/seo/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${ibmPlexCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
