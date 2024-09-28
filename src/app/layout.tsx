import type { Metadata } from "next";
import "./globals.css";
import Image from 'next/image';
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Find your apartment with ease!",
  description: "Rent, Buy apartments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col h-screen">
          <nav className="min-h-[90px] flex justify-between pt-1 pb-1 pl-2 pr-2">
            <Image
              src="/logo.jpeg"
              height={80}
              width={80}
              className="block"
              alt="Supa Real Esate Agency"
            />
            <div className="flex align-middle items-center ">
              <Button variant={'default'}>Sign Up</Button>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
