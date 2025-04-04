"use client";

import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useState } from "react";
import { StarIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { PostWithUsers } from "@/lib/dbTypes";
import { manageFav } from "@/actions/favActions";

type AddToFavouritesProps = {
  post: PostWithUsers;
  userId: string | undefined;
  callBackOnDelete?: any;
};

const AddToFavourites: React.FC<AddToFavouritesProps> = ({ post, userId, callBackOnDelete }) => {
  const [isFavoured, setIsFavoured] = useState(
    Boolean(post?.FavouredPosts?.length)
  );

  const badgeVariant = userId ? "outline" : "secondary";

  const tooltipText = (() => {
    if (!userId) return "Sign in to add to favourites";
    return isFavoured ? "Remove from favourites" : "Add to favorites";
  })();

  const icon = isFavoured ? (
    <StarFilledIcon fontSize={"2.2rem"} />
  ) : (
    <StarIcon fontSize={"2.2rem"} />
  );

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger>
        <Badge
          className="h-full"
          variant={badgeVariant}
          onClick={async () => {
            const result = await manageFav(post, userId);
            if (result) {
              setIsFavoured((prev) => !prev);
              callBackOnDelete && callBackOnDelete();
            } 
          }}
        >
          {icon}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>{tooltipText}</TooltipContent>
    </Tooltip>
  );
};

export default AddToFavourites;
