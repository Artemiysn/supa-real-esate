import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { User } from "@auth/core/types";
import React from "react";

type SignInProps = {
  user: User | undefined;
};

const UpdateProfile: React.FC<SignInProps> = ({ user }) => {
  return (
    <div className="p-5">
      <div className="flex justify-between mb-2">
        <h3 className="scroll-m-20 text-2xl tracking-tight mb-5 ">
          User Information
        </h3>
        <Button>Update Profile</Button>
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
