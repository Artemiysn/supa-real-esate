import { Button } from "@/components/ui/button";
import React, { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { TailSpin } from "react-loader-spinner";

type SubmitButtonProps = {
  size: "default" | "sm" | "lg" | "icon" | null | undefined;
  content: ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({size, content}) => {

  const { pending } = useFormStatus();

  return (
    <Button size={size} type="submit" disabled={pending ? true : false}>
      {pending ? <TailSpin width={20} height={20} color="white" /> : content}
    </Button>
  );
};

export default SubmitButton;
