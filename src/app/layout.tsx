import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import SignIn from "@/app/SignIn";
import { getServerAuthSession } from "@/modules/auth";
import Link from "next/link";
import { NextBgStaticCss } from "next-bg-image";
import { MessagesProvider } from "./contexts/MessagesContext";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Find your apartment with ease!",
  description: "Rent, Buy apartments",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      {/* <body className="max-w-[900px] mx-auto"> */}
      <body>
        <MessagesProvider userId={session?.user.id}>
          <NextBgStaticCss />
          <div className="flex flex-col h-screen">
            <nav className="min-h-[90px] flex justify-between pt-1 pb-1 pl-2 pr-2">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  height={80}
                  width={80}
                  className="mr-2"
                  alt="Supa Real Esate Agency"
                />
                <h4 className="scroll-m-20 text-xl font-bold pb-2">
                  Supa Real Estate
                </h4>
              </Link>
              <div className="flex grow items-center px-12 gap-12">
                <Link href="/deals">
                  <h5 className="scroll-m-20 text-md  font-semibold tracking-tight pb-1 text-gray-600 underline-animation">
                    Hot Deals!
                  </h5>
                </Link>
                {session?.user && (
                  <Link href="/favoured">
                    <h5 className="scroll-m-20 text-md font-semibold tracking-tight pb-1 text-gray-600 underline-animation">
                      Favoured
                    </h5>
                  </Link>
                )}
              </div>
              <SignIn user={session?.user} />
            </nav>
            {children}
          </div>
          <Toaster />
        </MessagesProvider>
      </body>
    </html>
  );
}
