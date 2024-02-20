"use server";

import prisma from "@/lib/prisma";
import { unstable_noStore } from "next/cache";

export async function fetchProfile(username: string) {
  unstable_noStore();

  try {
    const data = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        posts: {
          orderBy: {
            createdAt: "desc",
          },
        },
        saved: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch profile");
  }
}
