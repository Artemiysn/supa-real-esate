"use server";

import { db } from "../modules/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cache } from "react";

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

    const allCities: { city: string }[] = await db.posts.findMany({
      select: {
        city: true,
      },
      distinct: ["city"],
    });

    const uniqueCities = [...new Set(allCities.map(obj => obj.city.toLowerCase()))];

    const returnArr = uniqueCities.map((c) => {
      return {
        value: c,
        label: c,
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
