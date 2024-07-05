import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import "./globals.css";
import QueryProvider from "@/components/other/Provider";
import AuthProvider from "@/context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leveler",
  description: "A gaming social site"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar/>
          <QueryProvider>
            <main className="flex flex-col max-w-3xl px-10 items-center mt-4 gap-3 pt-24 pb-4 mx-auto">
              {children}
            </main>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
