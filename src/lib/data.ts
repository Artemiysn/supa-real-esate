import { db } from "@/modules/db";
import type { Posts, Prisma } from "@prisma/client";
import { paramsForPostSearch } from "@/app/searchposts/page";
import { usePathname } from "next/navigation";
import { revalidatePath } from "next/cache";

export type PostWithUsers = Prisma.PostsGetPayload<{
  include: { user: true; FavouredPosts: true };
}>;

export const getPostDetails = async (
  postId: string | undefined,
  userId: string | undefined
): Promise<PostWithUsers> => {
  // await new Promise(r => setTimeout(r, 2000));

  try {
    const post = await db.Posts.findUniqueOrThrow({
      include: {
        user: true,
        FavouredPosts: {
          where: {
            userId: userId,
          },
        },
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
      },
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
          FavouredPosts: {
            where: {
              userId: userId,
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
  if (!userId) return null;
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
  }
};
