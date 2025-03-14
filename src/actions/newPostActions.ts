"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
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
      .gt(0, "Please provide floor number, number must be positive")
      .max(3000, "Please select lower floor")
      .int("floor must be an integer"),
    year: z.coerce
      .number()
      .gt(1, "Please provide year, number must be positive")
      .max(3000, "Please select real year")
      .int("year must be an integer"),
    lat: z.coerce
      .number()
      .min(-90, "Please select correct lontitude")
      .max(90, "Please select correct lontitude")
      .optional(),
    lon: z.coerce
      .number()
      .min(-180, "Please select correct lontitude")
      .max(180, "Please select correct lontitude")
      .optional(),
  })
  .required()
  .transform((data) => {
    if (data.lat === 0 && data.lon === 0) {
      return { ...data, lat: null, lon: null };
    }
    return data;
  });

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
