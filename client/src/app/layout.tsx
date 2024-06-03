import type { Metadata } from "next";
import "../css/globals.css";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Leveler",
  description: "The gaming social media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}