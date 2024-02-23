"use server";

import prisma from "@/lib/prisma";
import { unstable_noStore } from "next/cache";

// TODO: need to use this query in future refactor of code
export async function fetchPostComments(id: string) {
  unstable_noStore();

  try {
    const data = await prisma.comment.findMany({
      where: {
        postId: id,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post comments");
  }
}
