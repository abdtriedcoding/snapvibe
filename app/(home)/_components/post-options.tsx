'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import { MoreHorizontal } from 'lucide-react'
import SubmitButton from '@/components/submit-button'
import { deletePost } from '@/app/actions/deletePost'
import { type PostOptionProps } from '@/lib/definitions'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export default function PostOptions({
  postId,
  postUserId,
  userId,
}: PostOptionProps) {
  const isPostMine = postUserId === userId
  if (!isPostMine) return null

  // TODO: need to add loading state
  function onhandleDelete() {
    toast.promise(deletePost(postId), {
      loading: 'Deleting post...',
      success: 'Post deleted successfully',
      error: 'Failed to delete post',
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal className="h-5 w-5 cursor-pointer dark:text-neutral-400" />
      </DialogTrigger>
      <DialogContent className="gap-0 bg-white p-0 dark:bg-neutral-800">
        {isPostMine && (
          <form
            action={onhandleDelete}
            className="flex w-full items-center justify-center border-b border-zinc-300 text-sm font-medium dark:border-neutral-700"
          >
            <SubmitButton className="w-full p-3 font-bold text-red-500 disabled:cursor-not-allowed">
              Delete post
            </SubmitButton>
          </form>
        )}

        {isPostMine && (
          <Link
            scroll={false}
            href={`/p/${postId}/edit`}
            className="flex w-full items-center justify-center p-3 text-sm font-bold focus:outline-none"
          >
            Edit
          </Link>
        )}
      </DialogContent>
    </Dialog>
  )
}
