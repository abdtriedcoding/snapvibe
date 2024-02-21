"use server";

import prisma from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function getPosts(pageNumber: number) {
  noStore();

  try {
    const data = await prisma.post.findMany({
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: true,
        savedBy: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (pageNumber - 1) * 1,
      take: 1,
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts");
  }
}
