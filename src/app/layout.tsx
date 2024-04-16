import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "@/components/footer";
import Header from "@/components/header";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Kooper Codes",
  description: "",
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
          {children}
          <Footer />
        </ChakraProvider>
        </body>
    </html>
  );
}
