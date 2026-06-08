import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleCaptchaProvider from "./providers/captcha-provider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kooper Propp",
  description: "Computer Science student building fast, useful software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Analytics />
        <GoogleCaptchaProvider>{children}</GoogleCaptchaProvider>
      </body>
    </html>
  );
}
