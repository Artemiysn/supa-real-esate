"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";

const Unauthorized = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSign = async () => {
    setIsLoading(true);
    await signIn("google");
    setIsLoading(false);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center gap-5 flex-col">
      <h2>You are not signed in</h2>
      <Button
        size={"lg"}
        variant={"default"}
        onClick={handleSign}
        className="min-w-[90px]"
        disabled={isLoading}
      >
        {isLoading ? <TailSpin width={20} height={20} /> : "Sign In"}
      </Button>
    </div>
  );
};

export default Unauthorized;
