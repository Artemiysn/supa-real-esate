"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useFormState } from "react-dom";
import { updateUser, userState } from "@/actions/actions";
import SubmitButton from "@/components/SubmitButton";
import { User } from "@auth/core/types";

type UpdateProfileDialogProps = {
  user: User;
};

export const UpdateProfileDialog: React.FC<UpdateProfileDialogProps> = ({
  user,
}) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Update Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mx-6">Edit profile</DialogTitle>
            <DialogDescription className="mx-6">
              Update displayed data
            </DialogDescription>
          </DialogHeader>
          <ProfileForm user={user} callbackFunc={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Update Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>Update displayed data</DrawerDescription>
        </DrawerHeader>
        <ProfileForm user={user} callbackFunc={() => setOpen(false)} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const initialState: userState = { message: null, errors: {} };

const ProfileForm = ({
  user,
  callbackFunc,
}: {
  user: User;
  callbackFunc: any;
}) => {
  const [state, formAction] = useFormState(
    updateUser.bind(null, user.id),
    initialState
  );

  useEffect(() => {
    // close modal only when eveything is ok
    if (state?.id) callbackFunc && callbackFunc();
  }, [state]);

  return (
    <form action={formAction} className="w-full p-2">
      <div id="add-name-input" className={"inputBlock" + ` basis-full`}>
        <Label htmlFor="name" className="mb-4">
          Displayed name
        </Label>
        {/* @ts-ignore */}
        <Input id="name" name="name" defaultValue={user.name} />
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.name &&
            state?.errors.name.map((error: string) => (
              <span className="errorText" key={error}>
                {error}
              </span>
            ))}
        </div>
      </div>
      <div id="add-email-input" className={"inputBlock" + ` basis-full`}>
        <Label htmlFor="email" className="mb-4">
          Email
        </Label>
        {/* @ts-ignore */}
        <Input id="email" name="email" defaultValue={user.email} />
        <div id="email-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.email &&
            state?.errors.email.map((error: string) => (
              <span className="errorText" key={error}>
                {error}
              </span>
            ))}
        </div>
      </div>
      <div className={"inputBlock" + ` basis-full lg:mt-0 mt-4`}>
        <SubmitButton size={"default"} content={"Update"} />
      </div>
    </form>
  );
};
