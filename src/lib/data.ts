import { db } from "@/modules/db";

export const fetchUserPosts = async (userId: string | undefined) => {
  if (typeof userId === "undefined") return [];

//   await new Promise(r => setTimeout(r, 5000));

  return db.Posts.findMany({
    where: { userId: userId },
  });
};
