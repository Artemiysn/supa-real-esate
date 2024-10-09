"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/auth";

// убирает два ключа из объекта дальше
// const CreateInvoice = FormSchema.omit({ id: true, date: true });

// z.object.required(..)//необходимые ключи

const NewPostSchema = z
  .object({
    // user_id: z.string({
    //     required_error: 'user id not found'
    // }),
    title: z.string({
      required_error: "Please select title",
    }),
    price: z
      .number({
        required_error: "Please provide price",
      })
      .positive(),
    address: z.string({
      required_error: "Please provide address",
    }),
    description: z.string({
      required_error: "Please provide description",
    }),
    type: z.enum(["rent", "sell"], {
      required_error: "Please select rent or sell",
    }),
    property: z.enum(["apartment", "house"], {
      required_error: "Please select apartment or house",
    }),
    city: z.string({
      required_error: "Please select city",
    }),
    area: z
      .number({
        required_error: "Please provide area m2",
      })
      .positive(),
    kitchen: z
      .number({
        required_error: "Please provide kitchen area m2",
      })
      .positive(),
    floor: z
      .number({
        required_error: "Please provide floor number",
      })
      .positive(),
    year: z
      .number({
        required_error: "Please provide year",
      })
      .positive(),
  })
  .required();

export type State = {
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

// customerId: z.string({
//   invalid_type_error: 'Please select a customer.',
// }),
// amount: z.coerce
//   .number()
//   .gt(0, { message: 'Please enter an amount greater than $0.' }),
// status: z.enum(['pending', 'paid'], {
//   invalid_type_error: 'Please select an invoice status.',
// }),
// date: z.string(),
// });
