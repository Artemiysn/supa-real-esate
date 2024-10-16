import { db } from "@/modules/db";
import type { Posts, Prisma } from "@prisma/client";

export type PostWithUsers = Prisma.PostsGetPayload<{
  include: { user: true }
}>

export const fetchUserPosts = async (
  userId: string | undefined
): Promise<Posts[]> => {
  if (typeof userId === "undefined") return [];
  try {
    return db.Posts.findMany({
      where: { userId: userId },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user posts.");
  }
};

export const fetchUserPostsWithPages = async (
  userId: string | undefined,
  page: number,
  perPage: number
): Promise<{ posts: Posts[]; total: number }> => {
  if (typeof userId === "undefined") return { posts: [], total: 0 };

  const start = (page - 1) * perPage;
  try {
    const [posts, count] = await db.$transaction([
      db.Posts.findMany({
        where: { userId: userId },
        skip: start,
        take: perPage,
        orderBy: {
          updatedAt: "desc",
        },
      }),
      db.Posts.count({
        where: { userId: userId },
      }),
    ]);

    return {
      posts: posts,
      total: count,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user posts.");
  }
};

export const getPostDetails = async (postId: string): Promise<PostWithUsers> => {
  try {
    const post = await db.Posts.findUniqueOrThrow({
      include: {
        user: true,
      },
      where: { id: postId },
    });
    return post;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post data.");
  }
};
