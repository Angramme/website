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
  title: "Kacper Ozieblowski Website",
  description: "Personal website of Kacper Ozieblowski",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="z-[-1] p-2 text-sm text-center text-[var(--foreground)]">
          Copyright © {new Date().getFullYear()} Kacper Ozieblowski
        </footer>
      </body>
    </html>
  );
}
