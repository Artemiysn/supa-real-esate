"use server";

import { z } from "zod";
import { db } from "../modules/db";
import { MessageWithUser } from "@/lib/dbTypes";

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
