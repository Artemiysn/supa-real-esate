import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import SignIn from "@/app/SignIn";
import { getServerAuthSession } from "@/auth";
import Link from "next/link";

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
        <div className="flex flex-col h-screen">
          <nav className="min-h-[90px] flex justify-between pt-1 pb-1 pl-2 pr-2">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.jpeg"
                height={80}
                width={80}
                className="mr-2"
                alt="Supa Real Esate Agency"
              />
              <h4 className="scroll-m-20 text-xl font-bold pb-2">
                Supa Real Estate
              </h4>
            </Link>
            <SignIn user={session?.user} />
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
