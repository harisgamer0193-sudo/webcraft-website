import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebCraft — Professional Web Design & Development",
  description: "Transform your online presence with stunning, high-performance websites crafted to grow your business. Custom web design, development, and digital strategy.",
  keywords: ["web design", "web development", "custom websites", "SEO", "e-commerce", "digital agency"],
  authors: [{ name: "WebCraft" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "WebCraft — Professional Web Design & Development",
    description: "Stunning websites that convert visitors into customers",
    type: "website",
    siteName: "WebCraft",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebCraft — Professional Web Design & Development",
    description: "Stunning websites that convert visitors into customers",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
