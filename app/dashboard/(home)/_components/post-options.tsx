"use client";

import Link from "next/link";
import SubmitButton from "./submit-button";

import { MoreHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { deletePost } from "@/app/actions/deletePost";
import { toast } from "sonner";

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
          <form
            action={async () => {
              const { message } = await deletePost(postId);
              toast(message);
            }}
            className="postOption"
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
