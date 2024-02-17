"use client";

import Link from "next/link";
import SubmitButton from "./submit-button";

import { MoreHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Props = {
  postId: string;
  postUserId: string;
  userId: string;
};

const PostOptions = ({ postId, postUserId, userId }: Props) => {
  const isPostMine = postUserId === userId;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal className="h-5 w-5 cursor-pointer dark:text-neutral-400" />
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-neutral-800 !p-0 overflow-hidden !gap-0">
        {isPostMine && (
          <SubmitButton className="text-red-500 font-bold disabled:cursor-not-allowed w-full p-3 border-b border-zinc-300 dark:border-neutral-700 focus:outline-none">
            Delete post
          </SubmitButton>
        )}

        {isPostMine && (
          <Link
            scroll={false}
            href={`/dashboard/p/${postId}/edit`}
            className="flex items-center justify-center text-sm font-bold w-full p-3 focus:outline-none"
          >
            Edit
          </Link>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PostOptions;
