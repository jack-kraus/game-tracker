import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import "./globals.css";
import QueryProvider from "@/context/QueryProvider";
import AuthProvider from "@/context/AuthProvider";
import Head from "@/components/other/Head";
import Footer from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leveler",
  description: "A gaming social site for sharing reviews"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen w-full justify-between items-center`}>
        <AuthProvider>
          <Navbar/>
          <QueryProvider>
            <main className="flex flex-col max-w-3xl px-5 sm:px-10 items-center mt-4 gap-3 sm:pt-24 pt-20 pb-4 h-full justify-center w-full">
              <Head>
                <meta name="theme-color" content="#1f1830"/>
              </Head>
              {children}
            </main>
          </QueryProvider>
        </AuthProvider>
        <Footer/>
      </body>
    </html>
  );
}
