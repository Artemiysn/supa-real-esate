"use server";

import { PostWithUsers } from "@/lib/dbTypes";
import { db } from "../modules/db";

export const manageFav = async (
  post: PostWithUsers,
  userId: string | undefined
) => {
  if (!userId) return false;
  const method = post?.FavouredPosts?.length ? "DELETE" : "POST";
  try {
    if (method === "POST") {
      return await db.FavouredPosts.create({
        data: {
          userId: String(userId).substring(0, 60),
          postId: Number(post.id)
        },
      });
    } else {
      return await db.FavouredPosts.delete({
        where: {
          id: String(post?.FavouredPosts[0]?.id),
        },
      });
    }
  } catch (e) {
    console.error("Database Error:", e);
    throw new Error("Failed to manage fav");
  }
};
