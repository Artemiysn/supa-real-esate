import { db } from "@/modules/db";
import type { Posts } from '@prisma/client'

export const fetchUserPosts = async (userId: string | undefined): Promise<Posts[]>  => {
  if (typeof userId === "undefined") return [];

//   await new Promise(r => setTimeout(r, 5000));

  return db.Posts.findMany({
    where: { userId: userId },
  });
};
