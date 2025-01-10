"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "../modules/db";
import { User } from "@prisma/client";

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
