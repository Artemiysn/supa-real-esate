"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

const Unauthorized = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center gap-5 flex-col">
      <h2>You are not signed in</h2>
      <Button size={'lg'} variant={"default"} onClick={() => signIn("google")}>
        Sign In
      </Button>
    </div>
  );
};

export default Unauthorized;
