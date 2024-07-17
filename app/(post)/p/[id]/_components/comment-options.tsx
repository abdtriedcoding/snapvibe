'use client'

import { toast } from 'sonner'
import { MoreHorizontal } from 'lucide-react'
import { type Comment } from '@prisma/client'
import { deleteComment } from '@/app/actions/deleteComment'
import SubmitButton from '@/components/submit-button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function CommentOptions({ comment }: { comment: Comment }) {
  // TODO: need to add loading state
  function onhandleDelete() {
    toast.promise(deleteComment(comment.id), {
      loading: 'Deleting comment...',
      success: 'Comment deleted successfully',
      error: 'Failed to delete comment',
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal className="h-5 w-5 cursor-pointer dark:text-neutral-400" />
      </DialogTrigger>
      <DialogContent className="gap-0 bg-white p-0 dark:bg-neutral-800">
        <form
          action={onhandleDelete}
          className="flex w-full items-center justify-center border-b border-zinc-300 text-sm font-medium dark:border-neutral-700"
        >
          <SubmitButton className="w-full p-3 font-bold text-red-500 disabled:cursor-not-allowed">
            Delete comment
          </SubmitButton>
        </form>

        <DialogClose className="flex w-full items-center justify-center border-0 border-b border-zinc-300 p-3 text-sm font-medium dark:border-neutral-700">
          Cancel
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
