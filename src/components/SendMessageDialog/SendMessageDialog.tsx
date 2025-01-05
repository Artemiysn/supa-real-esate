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
import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { User } from "@prisma/client";
import { useFormState } from "react-dom";
import { addMessage, addMessageState, deleteMessage } from "@/actions/actions";
import { Textarea } from "../ui/textarea";
import SubmitButton from "../SubmitButton";
import { MessagesContext } from "@/app/contexts/MessagesContext";
import { TailSpin } from "react-loader-spinner";

type SendMessageDialogProps = {
  buttonEl: ReactNode;
  recepient: User;
  userId: string | undefined;
  postTitle?: string | null;
  messageText?: string | null;
  messageId?: string | null;
};

const SendMessageDialog: React.FC<SendMessageDialogProps> = ({
  buttonEl,
  recepient,
  userId,
  postTitle = null,
  messageText = null,
  messageId = null,
}) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full">{buttonEl}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="md:mx-6 mb-2">
              Send Message to {recepient?.name}
            </DialogTitle>
            <DialogDescription>
              {messageText && (
                <span className=" block rounded-xl border bg-card text-card-foreground shadow bg-slate-100 text-gray-600 relative my-2 md:mx-6 p-6">
                  <span className="absolute top-1 left-2 text-2xl">❞</span>
                  {messageText}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <SendMessageForm
            recepientId={recepient?.id}
            userId={userId}
            postTitle={postTitle}
            callBackFunc={() => setOpen(false)}
            messageText={messageText}
            messageId={messageId}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="w-full">{buttonEl}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="md:mx-6">
            Send Message to {recepient?.name}
          </DrawerTitle>
          <DrawerDescription>
            {messageText && (
              <span className=" block rounded-xl border bg-card text-card-foreground shadow bg-slate-100 text-gray-600 relative my-2 md:mx-6 p-6">
                <span className="absolute top-1 left-2 text-2xl">❞</span>
                {messageText}
              </span>
            )}
          </DrawerDescription>
        </DrawerHeader>
        <SendMessageForm
          recepientId={recepient?.id}
          userId={userId}
          postTitle={postTitle}
          callBackFunc={() => setOpen(false)}
          messageText={messageText}
          messageId={messageId}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
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
  messageId?: string | null;
};

const SendMessageForm: React.FC<SendMessageFormProps> = ({
  recepientId,
  userId,
  callBackFunc,
  postTitle = null,
  messageText = null,
  messageId = null,
}) => {
  const { deleteMessageById } = useContext(MessagesContext);

  const [state, formAction] = useFormState(
    addMessage.bind(null, userId, recepientId),
    initialState
  );

  const [messageDeleting, setMessageDeleting] = useState(false);

  useEffect(() => {
    // close modal only when eveything is ok
    if (state?.id) callBackFunc && callBackFunc();
  }, [state]);

  const deleteMessageHandler = useCallback(async (e: any) => {
    e.preventDefault();
    if (typeof messageId !== "string") return null;
    setMessageDeleting(true);
    const deletedMsg = await deleteMessage(messageId);
    if (deletedMsg.id) await deleteMessageById(deletedMsg.id);
    setMessageDeleting(false);
    callBackFunc && callBackFunc();
  }, []);

  return (
    <form action={formAction} className="w-full p-2">
      <div id="add-response-input" className={"inputBlock" + ` basis-full`}>
        {messageText && (
          <Label htmlFor="response" className="mb-4">
            Your response:
          </Label>
        )}
        <Textarea
          className="w-full"
          placeholder={postTitle ? `regarding your ${postTitle}...` : ""}
          id="response"
          name="response"
          rows={6}
          maxLength={1000}
        />
        <div id="response-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.response &&
            state?.errors.response.map((error: string) => (
              <span className="errorText" key={error}>
                {error}
              </span>
            ))}
        </div>
      </div>
      <div className={"inputBlock" + ` basis-full`}>
        <SubmitButton
          size={"default"}
          content={"Send"}
          disabled={messageDeleting}
        />
      </div>
      {messageId && (
        <div className={"inputBlock" + ` basis-full`}>
          <Button
            size={"default"}
            variant="destructive"
            onClick={deleteMessageHandler}
            disabled={messageDeleting}
          >
            {messageDeleting ? (
              <TailSpin width={20} height={20} color="white" />
            ) : (
              "Delete message and close"
            )}
          </Button>
        </div>
      )}
    </form>
  );
};
