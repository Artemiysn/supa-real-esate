"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/modules/auth";
import { db } from "../modules/db";
import { Prisma, User } from "@prisma/client";

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
    lat: z.coerce
      .number()
      .min(-200, "Please select correct latitude")
      .max(200, "Please select correct latitude")
      .optional()
      .or(z.literal("")),
    lon: z.coerce
      .number()
      .min(-200, "Please select correct lontitude")
      .max(200, "Please select correct lontitude")
      .optional()
      .or(z.literal("")),
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

  const lat = formData.get("lat") === "" ? null : formData.get("lat");
  const lon = formData.get("lon") === "" ? null : formData.get("lon");

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
    lat: lat,
    lon: lon,
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
  response: z.string().min(1, "Please add response message").max(1000, "max length of message is 1000 chars"),
  userId: z.string().cuid("Invalid user id"),
  recepientId: z.string().cuid("Invalid user id")
});

export const addMessage = async (
  userId: string | undefined,
  recepientId: string,
  prevState: NewPostState,
  formData: FormData,
) => {

  const validatedFields = AddMessageSchema.safeParse({
    response: formData.get("response"),
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
    return result
  } catch (e) {
    console.error("Database Error:", e);
    throw new Error("Failed to add new message");
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
