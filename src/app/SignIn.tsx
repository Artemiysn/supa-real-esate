"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@auth/core/types";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

type SignInProps = {
  user: User | undefined;
};

const SignIn: React.FC<SignInProps> = ({ user }) => {
  const handleSign = async () => {
    if (user) await signOut({ callbackUrl: "/" });
    else await signIn("google");
  };

  return (
    <div className="flex align-middle items-center ">
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
      <Button variant={"default"} onClick={handleSign}>
        {user ? "Sign Out" : "Sign In"}
      </Button>
    </div>
  );
};

export default SignIn;
