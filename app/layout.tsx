import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/ai/chat-widget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HiiiWAV - Creative Tech Incubator",
  description: "HiiiWAV is Oakland's creative tech incubator empowering artists to become successful entrepreneurs through technology, mentorship, and community support.",
  keywords: ["HiiiWAV", "creative tech", "incubator", "Oakland", "artists", "entrepreneurs", "AI", "Code Vibes"],
  openGraph: {
    title: "HiiiWAV - Creative Tech Incubator",
    description: "Empowering artists to become entrepreneurs through technology",
    url: "https://hiiiwav.org",
    siteName: "HiiiWAV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HiiiWAV - Creative Tech Incubator",
    description: "Empowering artists to become entrepreneurs through technology",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
