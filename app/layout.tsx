import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const runtime = 'edge';

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "Intru - Indian Streetwear Brand",
  description: "Premium streetwear made in India. Heavyweight cotton, oversized fits, and bold designs.",
  keywords: ["streetwear", "indian fashion", "oversized tees", "premium cotton", "streetwear india"],
  openGraph: {
    title: "Intru - Indian Streetwear Brand",
    description: "Premium streetwear made in India",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Permanent+Marker&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
