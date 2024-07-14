'use client'

import { cn } from '@/lib/utils'
import { useOptimistic } from 'react'
import { Bookmark } from 'lucide-react'
import { type SavedPost } from '@prisma/client'
import { type PostWithExtras } from '@/lib/definitions'
import { bookmarkPost } from '@/app/actions/bookmarkPost'
import ActionIcon from './action-icon'
import { toast } from 'sonner'

export default function BookmarkButton({
  post,
  userId,
}: {
  post: PostWithExtras
  userId: string | undefined
}) {
  const exists = (bookmark: SavedPost) =>
    bookmark.userId === userId && bookmark.postId === post.id

  const [optimisticBookmarks, addOptimisticBookmark] = useOptimistic<
    SavedPost[]
  >(
    post.savedBy,
    // @ts-expect-error hack to use optimistick hook typings
    (state: SavedPost[], newBookmark: SavedPost) =>
      //   here we check if the bookmark already exists, if it does, we remove it, if it doesn't, we add it
      state.find(exists)
        ? state.filter((bookmark) => bookmark.userId !== userId)
        : [...state, newBookmark]
  )

  return (
    <form
      action={async () => {
        if (!userId) {
          return toast.error('You need to login first')
        }
        addOptimisticBookmark({ postId: post.id, userId })
        await bookmarkPost(post.id)
      }}
      className="ml-auto"
    >
      <ActionIcon>
        <Bookmark
          className={cn('h-6 w-6', {
            'fill-black dark:fill-white': optimisticBookmarks.some(exists),
          })}
        />
      </ActionIcon>
    </form>
  )
}
