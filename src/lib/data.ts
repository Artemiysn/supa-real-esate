import { db } from "@/modules/db";
import type { Posts } from '@prisma/client'

export const fetchUserPosts = async (userId: string | undefined): Promise<Posts[]>  => {
  if (typeof userId === "undefined") return [];

  return db.Posts.findMany({
    where: { userId: userId },
  });
};

export const fetchUserPostsWithPages = async (userId: string | undefined, page: number, perPage: number): Promise<{posts: Posts[], total: number}>  => {

  if (typeof userId === "undefined") return {posts: [], total: 0};

  const start = (page - 1) * perPage;

  const [posts, count] = await db.$transaction([
    db.Posts.findMany({
      where: { userId: userId },
      skip: start,
      take: perPage,
      orderBy: {
        updatedAt: 'desc',
      },
    }),
    db.Posts.count({
      where: { userId: userId }
    })
  ]);

  return {
    posts: posts,
    total: count
  }

};
