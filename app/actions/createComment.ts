"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createComment(postId: string, body: string) {
  const userId = await getUserId();

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  try {
    await prisma.comment.create({
      data: {
        body,
        postId,
        userId,
      },
    });
    revalidatePath("/dashboard");
    return { message: "Created Comment." };
  } catch (error) {
    return { message: "Failed to Create Comment." };
  }
}
