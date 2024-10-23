"use client";

import { Star } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { manageFav, PostWithUsers } from "@/lib/data";
import React from "react";

type AddToFavouritesProps = {
  post: PostWithUsers;
  userId: string | undefined;
};

const AddToFavourites: React.FC<AddToFavouritesProps> = ({ post, userId }) => {

  const badgeVariant = (() => {
    if (!userId) return "secondary";
    return post?.FavouredPosts?.length ? "default" : "outline";
  })();

  const tooltipText = (() => {
    if (!userId) return "Sign in to add to favourites";
    return post?.FavouredPosts?.length
      ? "Remove from favourites"
      : "Add to favorites";
  })();

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger >
        <Badge
          variant={badgeVariant}
          onClick={() => manageFav(post, userId)}
        >
          <Star size={16} className="cursor-pointer" />
        </Badge>
      </TooltipTrigger>
      <TooltipContent>{tooltipText}</TooltipContent>
    </Tooltip>
  );
};

export default AddToFavourites;
