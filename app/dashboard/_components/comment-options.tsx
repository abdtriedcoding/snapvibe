"use client";

import { toast } from "sonner";
import { Comment } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { deleteComment } from "@/app/actions/deleteComment";
import SubmitButton from "../(home)/_components/submit-button";

const CommentOptions = ({ comment }: { comment: Comment }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal className="h-5 w-5 hidden group-hover:inline cursor-pointer dark:text-neutral-400" />
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-neutral-800 !p-0 overflow-hidden !gap-0">
        <form
          action={async () => {
            const { message } = await deleteComment(comment.id);
            toast(message);
          }}
          className="flex items-center justify-center border-b border-zinc-300 dark:border-neutral-700 text-sm font-medium w-full"
        >
          <SubmitButton className="text-red-500 font-bold disabled:cursor-not-allowed w-full p-3">
            Delete
          </SubmitButton>
        </form>

        <DialogClose className="flex items-center justify-center border-b border-zinc-300 dark:border-neutral-700 text-sm font-medium border-0 w-full p-3">
          Cancel
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default CommentOptions;
