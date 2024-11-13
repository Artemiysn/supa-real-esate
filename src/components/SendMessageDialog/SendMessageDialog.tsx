"use client";

import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { ReactNode, useEffect, useState } from "react";
import { User } from "@prisma/client";
import { useFormState } from "react-dom";
import { addMessage, addMessageState } from "@/actions/actions";
import { Textarea } from "../ui/textarea";
import SubmitButton from "../SubmitButton";

type SendMessageDialogProps = {
  buttonEl: ReactNode;
  recepient: User;
  userId: string | undefined;
  postTitle?: string | null;
  messageText?: string | null;
};

const SendMessageDialog: React.FC<SendMessageDialogProps> = ({
  buttonEl,
  recepient,
  userId,
  postTitle = null,
  messageText = null,
}) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{buttonEl}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mx-6 mb-2">Send Message to {recepient.name}</DialogTitle>
            <DialogDescription>
              {messageText && (
                <p className="rounded-xl border bg-card text-card-foreground shadow bg-slate-100 text-gray-600 relative my-2 mx-6 p-6">
                  <span className="absolute top-1 left-2 text-2xl">❞</span>
                  {messageText}
                </p>
              )}
            </DialogDescription>
          </DialogHeader>
          <SendMessageForm
            recepientId={recepient.id}
            userId={userId}
            postTitle={postTitle}
            callBackFunc={()=>setOpen(false)}
            messageText={messageText}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger >{buttonEl}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="mx-6">Send Message to {recepient.name}</DrawerTitle>
          <DrawerDescription>
          {messageText && (
                <p className="rounded-xl border bg-card text-card-foreground shadow bg-slate-100 text-gray-600 relative my-2 mx-6 p-6">
                  <span className="absolute top-1 left-2 text-2xl">❞</span>
                  {messageText}
                </p>
              )}
          </DrawerDescription>
        </DrawerHeader>
        <SendMessageForm
          recepientId={recepient.id}
          userId={userId}
          postTitle={postTitle}
          callBackFunc={()=>setOpen(false)}
          messageText={messageText}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose >
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SendMessageDialog;

const initialState: addMessageState = { message: null, errors: {} };

type SendMessageFormProps = {
  recepientId: string;
  userId: string | undefined;
  callBackFunc: () => any;
  postTitle?: string | null;
  messageText?: string | null;
};

const SendMessageForm: React.FC<SendMessageFormProps> = ({
  recepientId,
  userId,
  callBackFunc,
  postTitle = null,
  messageText = null
}) => {
  
  const [state, formAction, isPending] = useFormState(
    addMessage.bind(null, userId, recepientId),
    initialState
  );

  useEffect(()=> {
    if (state?.id) callBackFunc && callBackFunc();
  }, [state])

  return (
    <form action={formAction} className="w-full p-2">
      <div id="add-response-input" className={"inputBlock" + ` basis-full`}>
        <Label htmlFor="response" className="mb-4">
        {messageText ? 'Your response:' : "Message text"}
          <i className="text-gray-700 font-semibold">
            {postTitle ? `as response for ${postTitle}` : ""}
          </i>
        </Label>
        <Textarea
          className="w-full"
          placeholder={
            postTitle ? `regarding your ${postTitle}...` : ""
          }
          id="response"
          name="response"
          rows={6}
          maxLength={1000}
        />
        <div id="response-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.response &&
            state?.errors.response.map((error: string) => (
              <p className="errorText" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className={"inputBlock" + ` basis-full`}>
        <SubmitButton size={"default"} content={"Send response"} />
      </div>
    </form>
  );
};
