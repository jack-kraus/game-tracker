import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import "./globals.css";
import QueryProvider from "@/context/QueryProvider";
import AuthProvider from "@/context/AuthProvider";
import { Suspense } from "react";
import Head from "@/components/other/Head";

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
            <main className="flex flex-col max-w-3xl px-5 sm:px-10 items-center mt-4 gap-3 sm:pt-24 pt-20 pb-4 mx-auto">
              <Head>
                <meta name="theme-color" content="#4285f4" />
              </Head>
              {children}
            </main>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
