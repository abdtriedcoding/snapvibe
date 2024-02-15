"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function deletePost(id: string) {
  const userId = await getUserId();

  const post = await prisma.post.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard");
    return { message: "Post Deleted Successfully." };
  } catch (error) {
    return { message: "Failed to Delete Post." };
  }
}
