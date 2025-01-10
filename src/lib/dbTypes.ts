"use server";

import type { Prisma } from "@prisma/client";

export type PostWithUsers = Prisma.PostsGetPayload<{
  include: {
    user: true;
    FavouredPosts: true;
    Categories: { include: { category: true } };
  };
}>;

export type MessageWithUser = Prisma.MessagesGetPayload<{
  include: { author: true };
}>;


