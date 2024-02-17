import prisma from "@/lib/prisma";
import { unstable_noStore } from "next/cache";

export async function fetchPostsByUsername(username: string, postId?: string) {
  unstable_noStore();

  try {
    const data = await prisma.post.findMany({
      where: {
        user: {
          username,
        },
        NOT: {
          id: postId,
        },
      },
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
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts");
  }
}
