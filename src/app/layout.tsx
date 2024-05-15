import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Kooper Codes",
  description:
    "Kooper Codes is a Rock County, WI web design and development company specializing in crafting exceptional mobile apps, web applications, and software solutions to propel your business forward.",
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
          <GoogleReCaptchaProvider
            reCaptchaKey={process.env.RECAPTCHA_SECRET_KEY!!}
          >
            {children}
          </GoogleReCaptchaProvider>
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  );
}
