'use server';

import { z } from "zod";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/modules/auth";
import { db } from "../modules/db";

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
      .max(3000, "Please select lower area")
      .int("floor must be an integer"),
    year: z.coerce
      .number()
      .gt(1, "Please provide year, number must be positive")
      .max(3000, "Please select real year")
      .int("year must be an integer"),
    lat: z.coerce
      .number()
      .gt(0, "Latitude must be greater then 0")
      .max(999, "Please select lower price min price")
      .optional().or(z.literal('')),
    lon: z.coerce
      .number()
      .gt(0, "Longitude must be greater then 0")
      .max(999, "Please select lower price min price")
      .optional().or(z.literal('')),
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
    city: formData.get("city"),
    area: formData.get("area"),
    kitchen: formData.get("kitchen"),
    floor: formData.get("floor"),
    year: formData.get("year"),
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
    .optional().or(z.literal('')),
  maxPrice: z.coerce
    .number()
    .gt(0, "Please select price, price must be greater then 0")
    .max(9999999, "Please select lower price max price")
    .int("Price must be an integer")
    .optional().or(z.literal('')),
  type: z
    .enum(["rent", "sell"], {
      invalid_type_error: "Please select rent or sell",
    })
    .optional().or(z.literal('')),
  property: z
    .enum(["apartment", "house"], {
      invalid_type_error: "Please select apartment or house",
    })
    .optional().or(z.literal('')),
  city: z.string().min(1, "Please select city").max(255).optional().or(z.literal('')),
  area: z.coerce
    .number()
    .gt(0, "Please provide area, number must be positive")
    .max(2000, "Please select lower area size")
    .int("Area size must be an integer")
    .optional().or(z.literal('')),
});

export async function searchPosts(
  prevState: searchPostState,
  formData: FormData
) {
  const validatedFields = SearchPostSchema.safeParse({
    minPrice: formData.get("minPrice"),
    maxPrice: formData.get("maxPrice"),
    type: formData.get("type"),
    property: formData.get("property"),
    city: formData.get("city"),
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
