"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@auth/core/types";
import { signIn, signOut } from "next-auth/react";

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
            <AvatarImage src={user?.image as string} alt="user" />
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>
        </>
      )}
      <Button variant={"default"} onClick={handleSign}>
        {user ? "Sign Out" : "Sign In"}
      </Button>
    </div>
  );
};

export default SignIn;
