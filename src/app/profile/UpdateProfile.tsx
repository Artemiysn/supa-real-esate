import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { UpdateProfileDialog } from "./UpdateProfileDialog";
import { User } from "@auth/core/types";

type SignInProps = {
  user: User;
};

const UpdateProfile: React.FC<SignInProps> = ({ user }) => {
  return (
    <div className="lg:p-5 lg:pl-0 lg:mt-0 mt-5">
      <div className="flex justify-between mb-2">
        <h3 className="scroll-m-20 text-2xl tracking-tight mb-5 ">
          User Information
        </h3>
        <UpdateProfileDialog user={user} />
      </div>
      <Table className="max-w-[400px]">
        <TableBody>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>
              <Avatar>
                {/* no-refferer fixes google img deisplay */}
                <AvatarImage
                  src={user?.image as string}
                  alt="user"
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback>...</AvatarFallback>
              </Avatar>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>{user?.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>{user?.email}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default UpdateProfile;
