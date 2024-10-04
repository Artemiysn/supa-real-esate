import type { Metadata } from "next";
import "./globals.css";
import Image from 'next/image';
import SignIn from "@/components/SignIn/SignIn";
import { getServerAuthSession } from "@/auth";

export const metadata: Metadata = {
  title: "Find your apartment with ease!",
  description: "Rent, Buy apartments",
};

export default async function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body
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
            <SignIn user={session?.user} />
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
