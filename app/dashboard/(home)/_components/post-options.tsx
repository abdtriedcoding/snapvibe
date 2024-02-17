"use client";

import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import SubmitButton from "./submit-button";
import { deletePost } from "@/app/actions/deletePost";

type Props = {
  postId: string;
  postUserId: string;
  userId: string;
  className?: string;
};

const PostOptions = ({ postId, postUserId, userId, className }: Props) => {
  const isPostMine = postUserId === userId;
  if (!isPostMine) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal
          className={cn(
            "h-5 w-5 cursor-pointer dark:text-neutral-400",
            className
          )}
        />
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-neutral-800 !p-0 overflow-hidden !gap-0">
        {isPostMine && (
          <form
            action={async () => {
              const { message } = await deletePost(postId);
              toast(message);
            }}
            className="flex items-center justify-center border-b border-zinc-300 dark:border-neutral-700 text-sm font-medium w-full"
          >
            <SubmitButton className="text-red-500 font-bold disabled:cursor-not-allowed w-full p-3">
              Delete post
            </SubmitButton>
          </form>
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
