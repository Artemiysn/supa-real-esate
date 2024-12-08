"use server";

import { z } from "zod";
import { revalidatePath, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/modules/auth";
import { db } from "../modules/db";
import { Prisma, User } from "@prisma/client";
import { PostWithUsers } from "@/lib/data";
import { cache } from "react";

const NewPostSchema = z
  .object({
    title: z.string().min(1, "Please select title").max(255),
    price: z.coerce
      .number()
      .gt(0, "Please select price, price must be greater then 0")
      .max(9999999, "Please select lower price ")
      .int("Price must be an integer"),
    address: z
      .string()
      .min(3, "Please provide address, minimum 3 symbols")
      .max(255),
    description: z.string().min(1, "Please provide description").max(1000),
    type: z.enum(["rent", "sell"], {
      invalid_type_error: "Please select rent or sell",
    }),
    property: z.enum(["apartment", "house"], {
      invalid_type_error: "Please select apartment or house",
    }),
    city: z.string().min(1, "Please select city").max(255),
    area: z.coerce
      .number()
      .gt(1, "Please provide area, number must be positive")
      .max(3000, "Please select lower area")
      .int("Area size must be an integer"),
    kitchen: z.coerce
      .number()
      .gt(1, "Please provide kitchen area in m2, number must be positive")
      .max(3000, "Please select lower area")
      .int("Kitchen Area size must be an integer"),
    floor: z.coerce
      .number()
      .gt(1, "Please provide floor number, number must be positive")
      .max(3000, "Please select lower floor")
      .int("floor must be an integer"),
    year: z.coerce
      .number()
      .gt(1, "Please provide year, number must be positive")
      .max(3000, "Please select real year")
      .int("year must be an integer"),
    lat: z
      .union([
        z
          .number()
          .min(-90, "Please select correct lontitude")
          .max(90, "Please select correct lontitude"),
        z.string().length(0),
      ])
      .optional()
      .transform((e) => (e === "" ? null : e)),
    lon: z
      .union([
        z
          .number()
          .min(-180, "Please select correct lontitude")
          .max(180, "Please select correct lontitude"),
        z.string().length(0),
      ])
      .optional()
      .transform((e) => (e === "" ? null : e)),
  })
  .required();

export type NewPostState = {
  errors?: {
    title?: string[];
    price?: string[];
    address?: string[];
    description?: string[];
    type?: string[];
    property?: string[];
    city?: string[];
    area?: string[];
    kitchen?: string[];
    floor?: string[];
    year?: string[];
    lat?: string[];
    lon?: string[];
  };
  message?: string | null;
};

export async function createNewPost(
  prevState: NewPostState,
  formData: FormData
) {
  const sessionData = await getServerAuthSession();

  if (!sessionData) {
    return {
      errors: {},
      message: "No user data!",
    };
  }

  const user = sessionData?.user;

  const validatedFields = NewPostSchema.safeParse({
    title: formData.get("title"),
    price: formData.get("price"),
    address: formData.get("address"),
    description: formData.get("description"),
    type: formData.get("type"),
    property: formData.get("property"),
    city: String(formData.get("city")).toLowerCase(),
    area: formData.get("area"),
    kitchen: formData.get("kitchen"),
    floor: formData.get("floor"),
    year: formData.get("year"),
    lat: formData.get("lat"),
    lon: formData.get("lat"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed.",
    };
  }

  const dataToSend = {
    data: {
      userId: user?.id,
      ...validatedFields.data,
    },
  };

  const createPost = await db.posts.create(dataToSend);

  revalidatePath("/profile");
  redirect("/profile");
}

export type searchPostState = {
  errors?: {
    minPrice?: string[];
    maxPrice?: string[];
    type?: string[];
    property?: string[];
    city?: string[];
    area?: string[];
  };
  message?: string | null;
};

const SearchPostSchema = z.object({
  minPrice: z.coerce
    .number()
    .gt(0, "Please select price, price must be greater then 0")
    .max(9999999, "Please select lower price min price")
    .int("Price must be an integer")
    .optional()
    .or(z.literal("")),
  maxPrice: z.coerce
    .number()
    .gt(0, "Please select price, price must be greater then 0")
    .max(9999999, "Please select lower price max price")
    .int("Price must be an integer")
    .optional()
    .or(z.literal("")),
  type: z
    .enum(["rent", "sell"], {
      invalid_type_error: "Please select rent or sell",
    })
    .optional()
    .or(z.literal("")),
  property: z
    .enum(["apartment", "house"], {
      invalid_type_error: "Please select apartment or house",
    })
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .min(1, "Please select city")
    .max(255)
    .optional()
    .or(z.literal("")),
  area: z.coerce
    .number()
    .gt(0, "Please provide area, number must be positive")
    .max(2000, "Please select lower area size")
    .int("Area size must be an integer")
    .optional()
    .or(z.literal("")),
});

export async function searchPosts(
  city: string | undefined,
  prevState: searchPostState,
  formData: FormData
) {
  const validatedFields = SearchPostSchema.safeParse({
    minPrice: formData.get("minPrice"),
    maxPrice: formData.get("maxPrice"),
    type: formData.get("type"),
    property: formData.get("property"),
    city: city,
    area: formData.get("area"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed.",
    };
  }

  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(validatedFields.data)) {
    searchParams.append(key, value as string);
  }

  revalidatePath(`/searchposts?${searchParams.toString()}`);

  redirect(`/searchposts?${searchParams.toString()}`);
}

export const fetchUniqueCities = async (): Promise<
  { value: string; label: string }[]
> => {
  try {
    const uniqueCities: { city: string }[] = await db.posts.findMany({
      select: {
        city: true,
      },
      distinct: ["city"],
    });

    const returnArr = uniqueCities.map((obj) => {
      return {
        value: obj.city,
        label: obj.city,
      };
    });

    return returnArr;
  } catch (e) {
    console.error("Database Error:", e);
    throw new Error("Failed to fetch unique cities.");
  }
};

export const catchedUniqueCities = cache(async () => {
  return await fetchUniqueCities();
});

export type MessageWithUser = Prisma.MessagesGetPayload<{
  include: { author: true };
}>;

export type addMessageState = {
  errors?: {
    response?: string;
  };
  message?: string | null;
};

const AddMessageSchema = z.object({
  response: z
    .string()
    .min(1, "Please add response message")
    .max(1000, "max length of message is 1000 chars"),
  userId: z.string().cuid("Invalid user id"),
  recepientId: z.string().cuid("Invalid user id"),
});

export const addMessage = async (
  userId: string | undefined,
  recepientId: string,
  prevState: addMessageState,
  message: FormData | string
) => {
  const response =
    typeof message === "string" ? message : message.get("response");

  const validatedFields = AddMessageSchema.safeParse({
    response: response,
    userId: userId,
    recepientId: recepientId,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed.",
    };
  }

  try {
    const result = await db.messages.create({
      data: {
        authorId: validatedFields.data.userId,
        content: validatedFields.data.response,
        receiverId: validatedFields.data.recepientId,
      },
    });
    return result;
  } catch (e) {
    console.error("Database Error:", e);
    throw new Error("Failed to add new message");
  }
};

export const deleteMessage = async (messageId: string) => {
  try {
    const deletedMessage = await db.messages.delete({
      where: {
        id: messageId,
      },
    });
    return deletedMessage;
  } catch (error) {
    console.error(`Database Error: ${error}`);
    throw new Error("Failed to delete message.");
  }
};

export const fetchAllMessages = async (
  userId: string
): Promise<MessageWithUser[]> => {
  try {
    const messages = await db.messages.findMany({
      where: { receiverId: userId, hidden: false },
      include: {
        author: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return messages;
  } catch (e) {
    console.error("Database Error:", e);
    throw new Error("Failed to fetch posts.");
  }
};

export const countAllMessages = async (userId: string): Promise<number> => {
  try {
    const count = await db.messages.count({
      where: { receiverId: userId },
    });
    return count;
  } catch (e) {
    console.error("Database Error:", e);
    throw new Error("Failed to count messages.");
  }
};

export const fetchNewerMessages = async (
  userId: string,
  date: Date
): Promise<MessageWithUser[]> => {
  try {
    const messages = await db.messages.findMany({
      where: {
        receiverId: userId,
        createdAt: {
          gt: date,
        },
        hidden: false,
      },
      include: {
        author: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return messages;
  } catch (e) {
    console.error("Database Error:", e);
    throw new Error("Failed to fetch posts.");
  }
};

export const getFirstUser = (): Promise<User> => {
  try {
    const user = db.user.findFirst({});
    return user;
  } catch (e) {
    console.error("Database Error:", e);
    throw new Error("Failed to get first user");
  }
};

const userSchema = z.object({
  name: z
    .string()
    .min(2, "Minimum displayed name is two symbols")
    .max(100, "Max displayed name is 100 symbols"),
  email: z.string().email({ message: "Valid email is required" }),
  userId: z.string().cuid("Invalid user id"),
});

export type userState = {
  errors?: {
    name?: string;
    email?: string;
  };
  message?: string | null;
};

export const updateUser = async (
  userId: string | undefined,
  prevState: userState,
  formData: FormData
) => {
  const validatedFields = userSchema.safeParse({
    name: formData.get("name"),
    userId: userId,
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed.",
    };
  }

  try {
    const updatedUser = await db.user.update({
      where: {
        id: userId, // Replace userId with the actual user ID
      },
      data: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
      },
    });
    revalidatePath("/profile");
    return updatedUser;
  } catch (e) {
    console.error("Database Error:", e);
    throw new Error("Failed to update user");
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
            postId: f.postId,
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
): Promise<PostWithUsers[]> => {

  const takePosts = take === null ? null : {take: Number(take)};

  try {
    return db.Posts.findMany({
      ...takePosts,
      where: {
        Categories: {
          // this is how you query for "at least one relationship exists" in prisma orm!
          some: {}
        }
      },
      orderBy: {
        Categories: {
          _count: 'desc',
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
