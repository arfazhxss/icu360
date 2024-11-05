import type { Metadata } from "next";
import localFont from "next/font/local";
import { RoleProvider } from "@/contexts/RoleContext";
import { TriageProvider } from '@/contexts/TriageContext'
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ICU 360",
  description: "Developed by Shaban, Aleksia, Shounit, Isaac and Arfaz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RoleProvider>
          <TriageProvider>
            {children}
          </TriageProvider>
        </RoleProvider>
      </body>
    </html>
  );
}
