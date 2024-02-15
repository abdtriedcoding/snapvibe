"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/utils";
import { CreatePost } from "@/lib/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createPost(values: z.infer<typeof CreatePost>) {
  const userId = await getUserId();
  if (!userId) return;

  const validatedFields = CreatePost.safeParse(values);

  if (!validatedFields.success) {
    return {
      message: "Missing Fields. Failed to Create Post.",
    };
  }

  const { fileUrl, caption } = validatedFields.data;

  try {
    await prisma.post.create({
      data: {
        caption,
        fileUrl,
        userId,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Post.",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
