import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rota — B2B Rotational Savings (Ajo/Esusu) API Platform",
  description:
    "Rota provides infrastructure for rotational savings groups (Ajo/Esusu). Single API to manage virtual account creation, reconciliation, and automated settlement.",
  keywords: ["rotational savings", "ajo", "esusu", "fintech api", "virtual accounts", "nuban"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-[#F7F3EC] text-[#1A1A1A] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
