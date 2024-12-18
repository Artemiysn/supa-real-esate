import { db } from "@/modules/db";
import type { Prisma } from "@prisma/client";
import { paramsForPostSearch } from "@/app/searchposts/page";
import { jsonStringifyFixed } from "./utils";

export type PostWithUsers = Prisma.PostsGetPayload<{
  include: {
    user: true;
    FavouredPosts: true;
    Categories: { include: { category: true } };
  };
}>;

export const getPostDetails = async (
  postId: string | undefined,
  userId: string | undefined
): Promise<PostWithUsers> => {
  try {
    const post = await db.Posts.findUniqueOrThrow({
      include: {
        user: true,
        FavouredPosts: {
          where: {
            userId: userId,
          },
        },
        Categories: {
          include: {
            category: true,
          },
        },
      },
      where: { id: postId },
    });
    const returnData = JSON.parse(jsonStringifyFixed(post));
    return returnData;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post data.");
  }
};

export const fetchUserPosts = async (
  userId: string | undefined
): Promise<PostWithUsers[]> => {
  if (typeof userId === "undefined") return [];
  try {
    return db.Posts.findMany({
      where: { userId: userId },
      include: {
        user: true,
        FavouredPosts: {
          where: {
            userId: userId,
          },
        },
        Categories: {
          include: {
            category: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user posts.");
  }
};

export const fetchPostsByParams = async (
  params: paramsForPostSearch,
  page: number,
  perPage: number,
  userId: string | undefined
): Promise<{ posts: PostWithUsers[]; total: number }> => {
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

  let favouredPosts = userId
    ? {
        where: {
          userId: userId,
        },
      }
    : false;

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
        include: {
          user: true,
          FavouredPosts: favouredPosts,
          Categories: {
            include: {
              category: true,
            },
          },
        },
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

export const manageFav = async (
  post: PostWithUsers,
  userId: string | undefined
) => {
  if (!userId) return false;
  const method = post?.FavouredPosts?.length ? "DELETE" : "POST";
  const body = post?.FavouredPosts?.length
    ? JSON.stringify({
        favouredPostId: post.FavouredPosts[0].id,
      })
    : JSON.stringify({
        userId: userId,
        postId: String(post.id),
      });
  try {
    const response = await fetch("/api/fav/", {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    return response;
  } catch (e) {
    console.log(e);
    return false;
  }
};
