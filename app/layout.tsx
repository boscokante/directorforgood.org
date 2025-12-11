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
  title: "director. AI back office for nonprofits.",
  description: "Director is the AI-native operating system and forward-deployed backbone for nonprofits. Turning under-resourced founders into fundable, operationally tight organizations.",
  keywords: ["Director", "nonprofit", "AI", "operations", "fundraising", "nonprofit technology", "directorforgood"],
  openGraph: {
    title: "director. AI back office for nonprofits.",
    description: "The AI-native operating system and forward-deployed backbone for nonprofits",
    url: "https://directorforgood.org",
    siteName: "Director",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "director. AI back office for nonprofits.",
    description: "The AI-native operating system and forward-deployed backbone for nonprofits",
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
