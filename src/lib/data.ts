import { db } from "@/modules/db";
import type { Posts, Prisma } from "@prisma/client";
import { paramsForPostSearch } from "@/app/searchposts/page";

export type PostWithUsers = Prisma.PostsGetPayload<{
  include: { user: true };
}>;

export const getPostDetails = async (
  postId: string | undefined
): Promise<PostWithUsers> => {
  // await new Promise(r => setTimeout(r, 2000));

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
    // prisma orm limitation
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

export const fetchPostsByParams = async (
  params: paramsForPostSearch,
  page: number,
  perPage: number
): Promise<{ posts: Posts[]; total: number }> => {

  const start = (page - 1) * perPage;

  let where: any;

  if (params?.type) where = { type: params?.type };

  if (Number(params.area) > 0) {
    where = {
      ...where,
      area: {
        gte: Number(params.area),
      },
    };
  }

  if (Number(params.minPrice) > 0) {
    where = {
      ...where,
      price: {
        ...where.price,
        gte: Number(params.minPrice),
      },
    };
  }
  if (Number(params.maxPrice) > 0) {
    where = {
      ...where,
      price: {
        ...where.price,
        lte: Number(params.maxPrice),
      },
    };
  }
  if (params?.city && params?.city?.length > 1) {
    where = {
      ...where,
      city: {
        search: params.city,
      },
    };
  }

  if (params?.property) {
    where = {
      ...where,
      property: params?.property,
    };
  }
  try {
    // prisma orm limitation
    const [posts, count] = await db.$transaction([
      db.Posts.findMany({
        where: where,
        orderBy: {
          updatedAt: "desc",
        },
        skip: start,
        take: perPage,
      }),
      db.Posts.count({
        where: where,
      }),
    ]);

    return {
      posts: posts,
      total: count,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts.");
  }
};
