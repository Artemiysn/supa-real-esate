"use server";

import { getServerAuthSession } from "@/modules/auth";
import { db } from "../modules/db";
import { paramsForPostSearch } from "@/app/searchposts/page";
import { jsonStringifyFixed } from "../lib/utils";
import { PostWithUsers } from "@/lib/dbTypes";


export const fetchUserPostsWithPages = async (
  userId: string | undefined,
  page: number,
  perPage: number
): Promise<{ posts: PostWithUsers[]; total: number }> => {
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

export const getFavouredPosts = async (): Promise<PostWithUsers[]> => {
  const sessionData = await getServerAuthSession();

  if (!sessionData) return [];

  const userId = sessionData.user.id;

  try {
    const favoured = await db.FavouredPosts.findMany({
      where: { userId: userId },
      include: {
        post: {
          include: {
            Categories: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    // @ts-ignore
    return favoured.map((f) => {
      return {
        ...f.post,
        FavouredPosts: [
          {
            id: f.id,
            userId: f.userId,
            postId: Number(f.postId),
          },
        ],
      };
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user posts.");
  }
};

export const getPostsWithCategoriesOnly = async (
  take: number | null = null,
  delay: number | null = null
): Promise<PostWithUsers[]> => {
  if (delay) await new Promise((r) => setTimeout(r, delay));

  const takePosts = take === null ? null : { take: Number(take) };

  try {
    return db.Posts.findMany({
      ...takePosts,
      where: {
        Categories: {
          // this is how you query for "at least one relationship exists" in prisma orm!
          some: {},
        },
      },
      orderBy: {
        Categories: {
          _count: "desc",
        },
      },
      include: {
        Categories: {
          include: {
            category: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts with categories");
  }
};

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
      where: { id: Number(postId) },
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
        contains: params.city,
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


