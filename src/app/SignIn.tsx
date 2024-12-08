"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@auth/core/types";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { FcGoogle } from "react-icons/fc";

type SignInProps = {
  user: User | undefined;
};

const SignIn: React.FC<SignInProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="flex items-center ">
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
  );
};

export default SignIn;
