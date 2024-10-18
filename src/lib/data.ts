import { db } from "@/modules/db";
import type { Posts, Prisma } from "@prisma/client";
import { isPositiveNumber } from "./utils";
import { paramsForPostSearch } from "@/app/searchposts/page";

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

export const fetchPostsByParams = async (params: paramsForPostSearch): Promise<Posts[]> => {

  // добавить try catch и пагинацию

  let where: any = {type: params?.type};

  if (isPositiveNumber(params.area)) {
    where = {
      ...where,
      area: {
        gte: Number(params.area),
      },
    }
  }

  if (isPositiveNumber(params.minPrice)) {
    where = {
      ...where,
      price: {
        ...where.price,
        gte: Number(params.minPrice),
      },
    }
  }
  if (isPositiveNumber(params.maxPrice)) {
    where = {
      ...where,
      price: {
        ...where.price,
        lte: Number(params.maxPrice),
      },
    }
  }
  if (params?.city && params?.city?.length > 1) {
    where = {
      ...where,
      city: {
        search: params.city,
      },
    }
  }

  const posts = await db.Posts.findMany({
    where: where,
    orderBy: {
      updatedAt: "desc",
    }
  });

  return posts

}
