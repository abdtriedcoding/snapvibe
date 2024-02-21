'use client'

import { type z } from 'zod'
import { toast } from 'sonner'
import { type User } from 'next-auth'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { CommentSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { createComment } from '@/app/actions/createComment'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

export default function CommentForm({
  postId,
  user,
}: {
  postId: string
  user: User | undefined
}) {
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      body: '',
    },
  })

  const { isSubmitting, isValid } = form.formState

  async function onSubmit(data: z.infer<typeof CommentSchema>) {
    if (!user) {
      return toast.error('You need to login first')
    }

    toast.promise(createComment(postId, data.body), {
      loading: 'Creating comment...',
      success: 'Comment created successfully',
      error: 'Failed to create comment',
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex w-full items-center space-x-2 border-b border-gray-200 px-3 py-3 dark:border-neutral-800"
      >
        {isSubmitting && (
          <div className="absolute flex w-full items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full">
                <FormControl>
                  <input
                    disabled={isSubmitting}
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 border-none bg-transparent text-sm font-medium placeholder-neutral-400 focus:outline-none disabled:opacity-30 dark:text-neutral-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <button
          disabled={!isValid || isSubmitting}
          type="submit"
          className="text-sm font-semibold text-sky-500 hover:text-sky-700 disabled:cursor-not-allowed disabled:text-sky-500/40 disabled:hover:text-sky-500/40 dark:hover:text-white dark:disabled:text-slate-500 dark:disabled:hover:text-slate-500"
        >
          Post
        </button>
      </form>
    </Form>
  )
}
