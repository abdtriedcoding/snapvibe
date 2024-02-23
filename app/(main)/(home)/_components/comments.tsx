'use client'

import Link from 'next/link'
import { type z } from 'zod'
import { toast } from 'sonner'
import { type User } from 'next-auth'
import { useOptimistic } from 'react'
import { useForm } from 'react-hook-form'
import { CommentSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { type CommentWithUser } from '@/lib/definitions'
import { type Comment } from '@prisma/client'
import { createComment } from '@/app/actions/createComment'
import CommentsDialog from '@/app/(main)/(post)/p/[id]/_components/comments-dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

export default function Comments({
  postId,
  comments,
  user,
}: {
  postId: string
  comments: CommentWithUser[]
  user: User | undefined
}) {
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      body: '',
    },
  })

  const [optimisticComments, addOptimisticComment] = useOptimistic<
    CommentWithUser[]
  >(
    comments,
    // @ts-expect-error hack to use optimistick hook typings
    (state: Comment[], newComment: string) => [
      { body: newComment, userId: user?.id, postId, user },
      ...state,
    ]
  )

  const body = form.watch('body')
  const commentsCount = optimisticComments.length

  async function onSubmit(data: z.infer<typeof CommentSchema>) {
    if (!user) {
      return toast.error('You must be login first')
    }

    const { body } = data
    form.reset()
    addOptimisticComment(body)
    await createComment(postId, body)
  }

  return (
    <div className="space-y-0.5">
      {commentsCount > 1 && (
        // TODO: need to check is this entire comments table even required
        <CommentsDialog comments={comments} user={user}>
          <p className="w-fit cursor-pointer text-sm font-medium text-neutral-500">
            View all {commentsCount} comments
          </p>
        </CommentsDialog>
      )}

      {optimisticComments.slice(0, 3).map((comment, i) => {
        const username = comment.user?.username
        return (
          <div
            key={i}
            className="flex items-center space-x-2 text-sm font-medium"
          >
            <Link href={`/${username}`} className="font-semibold">
              {username}
            </Link>
            <p>{comment.body}</p>
          </div>
        )
      })}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center space-x-2 border-b border-gray-300 py-1 pb-3 dark:border-neutral-800"
        >
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem className="flex w-full">
                <FormControl>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 border-none bg-transparent text-sm font-medium placeholder-neutral-500 focus:outline-none dark:text-white dark:placeholder-neutral-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {body.trim().length > 0 && (
            <button
              type="submit"
              className="text-sm font-semibold text-sky-500 hover:text-white disabled:cursor-not-allowed disabled:hover:text-sky-500"
            >
              Post
            </button>
          )}
        </form>
      </Form>
    </div>
  )
}
