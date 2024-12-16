"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@auth/core/types";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";
import { MenuIcon } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type MenuBarProps = {
  user: User | undefined;
};

const MenuBar: React.FC<MenuBarProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);

  const handleSign = async () => {
    if (user) {
      setIsLoading(true);
      await signOut({ callbackUrl: "/" });
      setIsLoading(false);
    } else {
      setIsLoading(true);
      await signIn("google");
      setIsLoading(false);
    }
  };

  if (isDesktop) {
    return (
      <nav className="min-h-[90px] flex justify-between py-1 lg:mx-auto px-4 lg:w-[1024px] lg:px-0 w-full">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            height={80}
            width={80}
            className="transform translate-x-[-10px]"
            alt="Supa Real Esate Agency"
            priority={false}
          />
          <h4 className="scroll-m-20 text-xl font-bold pb-1">
            Supa Real Estate
          </h4>
        </Link>
        <div className="flex grow items-center lg:px-14 px-8 lg:gap-14 gap-8">
          <Link href="/about">
            <LayoutLinkHeading>About</LayoutLinkHeading>
          </Link>
          {user && (
            <Link href="/favoured">
              <LayoutLinkHeading>Favoured</LayoutLinkHeading>
            </Link>
          )}
        </div>
        <div className="flex items-center">
          {user && (
            <>
              <Avatar className="mx-2">
                {/* no-refferer fixes google img deisplay */}
                <AvatarImage
                  src={user?.image as string}
                  alt="user"
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback>{user?.name}</AvatarFallback>
              </Avatar>
              <Link href="/profile" className="mx-2">
                <Button variant={"secondary"}>Profile</Button>
              </Link>
            </>
          )}
          <Button
            variant={"default"}
            onClick={handleSign}
            disabled={isLoading}
            className="min-w-[90px]"
          >
            {isLoading ? (
              <TailSpin width={20} height={20} />
            ) : user ? (
              "Sign Out"
            ) : (
              <>
                <span>Sign in with</span>{" "}
                <FcGoogle size={18} className="ml-2" />{" "}
              </>
            )}
          </Button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="min-h-[90px] p-4 w-full flex items-center border-b">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          <MenuIcon size={32} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-4 border-b">
            <DrawerTitle hidden></DrawerTitle>
            <DrawerDescription hidden></DrawerDescription>
            <Link href="/" onClick={() => setOpen(false)}>
              <LayoutLinkHeadingMobile>Home</LayoutLinkHeadingMobile>
            </Link>
            <Link href="/about" onClick={() => setOpen(false)}>
              <LayoutLinkHeadingMobile>About</LayoutLinkHeadingMobile>
            </Link>
            {user && (
              <Link href="/favoured" onClick={() => setOpen(false)}>
                <LayoutLinkHeadingMobile>Favoured</LayoutLinkHeadingMobile>
              </Link>
            )}
          </DrawerHeader>
          <DrawerFooter className="flex flex-col gap-4 items-center">
            {user && (
              <div className="flex flex-row ">
                <Avatar className="mr-4">
                  {/* no-refferer fixes google img display */}
                  <AvatarImage
                    src={user?.image as string}
                    alt="user"
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback>{user?.name}</AvatarFallback>
                </Avatar>
                <Link
                  href="/profile"
                  className="grid place-content-center"
                  onClick={() => setOpen(false)}
                >
                  <LayoutLinkHeadingMobile>Profile</LayoutLinkHeadingMobile>
                </Link>
              </div>
            )}
            <Button
              variant={"default"}
              onClick={handleSign}
              disabled={isLoading}
              className="w-[200px]"
            >
              {isLoading ? (
                <TailSpin width={20} height={20} />
              ) : user ? (
                "Sign Out"
              ) : (
                <>
                  <span>Sign in with</span>{" "}
                  <FcGoogle size={18} className="ml-2" />{" "}
                </>
              )}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="flex-grow text-center">
        <Link href="/">
          <h4 className="scroll-m-20 text-xl font-bold">Supa Real Estate</h4>
        </Link>
      </div>
    </nav>
  );
};

export default MenuBar;

const LayoutLinkHeading = ({ children }: { children: ReactNode }) => {
  return (
    <h5 className="scroll-m-20 text-base font-semibold tracking-tight pb-1 text-gray-600 underline-animation">
      {children}
    </h5>
  );
};

const LayoutLinkHeadingMobile = ({ children }: { children: ReactNode }) => {
  return (
    <h5 className="scroll-m-20 text-lg font-semibold tracking-tight">
      {children}
    </h5>
  );
};

export const MenuBarLoader = () => {
  return <div className="min-h-[90px] w-full"></div>;
};
