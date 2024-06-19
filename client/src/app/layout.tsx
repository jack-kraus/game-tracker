import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/ui/navbar"
import "./globals.css";
import Provider from "@/components/other/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leveler",
  description: "A gaming social site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <Provider><main className="flex flex-col w-1/2 items-center mt-4 gap-3 pt-24 pb-4 mx-auto">{children}</main></Provider>
      </body>
    </html>
  );
}
