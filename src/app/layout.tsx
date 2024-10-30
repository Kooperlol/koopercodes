import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "@/components/footer";
import GoogleCaptchaProvider from "./providers/captcha-provider";
import Header from "@/components/header";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Kooper Codes",
  description:
    "A passionate software engineer and web developer specializing in creating innovative, high-performance applications and websites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-white`}>
        <ChakraProvider>
          <Header />
          <GoogleCaptchaProvider>{children}</GoogleCaptchaProvider>
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  );
}
