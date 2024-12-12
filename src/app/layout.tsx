import type { Metadata } from "next";
import "./globals.css";
import { getServerAuthSession } from "@/modules/auth";
import { NextBgStaticCss } from "next-bg-image";
import { MessagesProvider } from "./contexts/MessagesContext";
import { Toaster } from "@/components/ui/toaster";
import dynamic from "next/dynamic";
import { MenuBarLoader } from "@/app/MenuBar";

// because we need to get window width in menu bar
const MenuBar = dynamic(() => import("@/app/MenuBar"), {
  ssr: false,
  loading: () => <MenuBarLoader />,
});

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
      <body>
        <MessagesProvider userId={session?.user.id}>
          <NextBgStaticCss />
          <div className="flex flex-col h-screen">
            <MenuBar user={session?.user} />
            {children}
          </div>
          <Toaster />
        </MessagesProvider>
      </body>
    </html>
  );
}
