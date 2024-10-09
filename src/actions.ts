"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/auth";

const NewPostSchema = z
  .object({
    title: z.string().min(1, 'Please select title'),
    price: z.coerce
      .number()
      .gt(0, 'Please select price, price must be greater then 0')
      .int('Price must be an integer'),
    address: z.string().min(3, 'Please provide address, minimum 3 symbols'),
    description: z.string().min(1, 'Please provide description'),
    type: z.enum(["rent", "sell"], {
      invalid_type_error: "Please select rent or sell"
    }),
    property: z.enum(["apartment", "house"], {
      invalid_type_error: "Please select apartment or house",
    }),
    city: z.string().min(1, "Please select city"),
    area: z.coerce
      .number()
      .gt(1, 'Please provide area, number must be positive')
      .int('Area size must be an integer'),
    kitchen: z.coerce
      .number()
      .gt(1, 'Please provide kitchen area m2, number must be positive')
      .int('Kitchen Area size must be an integer'),
    floor: z.coerce
      .number()
      .gt(1, 'Please provide floor number, number must be positive')
      .int('floor must be an integer'),
    year: z.coerce
      .number()
      .gt(1, 'Please provide year, number must be positive')
      .int('year must be an integer'),
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

  // искусственная задержка для теста
  // await new Promise(r => setTimeout(r, 2000));

  const user = sessionData?.user;

  console.log(formData);

  // Validate form using Zod
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

  // console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  console.log(validatedFields.data);

  // добавить в базу


  revalidatePath('/profile');
  redirect('/profile');
  
}
