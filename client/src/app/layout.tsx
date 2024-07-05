import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/ui/navbar"
import "./globals.css";
import Provider from "@/components/other/Provider";
import AuthProvider from "@/context/AuthProvider";

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
      <head>
        <script src="https://kit.fontawesome.com/d7d5c075c0.js" crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>
        <Navbar/>
        <AuthProvider>
          <Provider>
            <main className="flex flex-col max-w-3xl px-10 items-center mt-4 gap-3 pt-24 pb-4 mx-auto">
              {children}
            </main>
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
