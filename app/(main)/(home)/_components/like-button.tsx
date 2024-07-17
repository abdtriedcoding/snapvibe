'use client'

import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Heart } from 'lucide-react'
import { useOptimistic } from 'react'
import { type Like } from '@prisma/client'
import { likePost } from '@/app/actions/likePost'
import { type PostWithExtras } from '@/lib/definitions'
import ActionIcon from './action-icon'

export default function LikeButton({
  post,
  userId,
}: {
  post: PostWithExtras
  userId: string | undefined
}) {
  const exists = (like: Like) =>
    like.userId === userId && like.postId === post.id

  const [optimisticLikes, addOptimisticLike] = useOptimistic<Like[]>(
    post.likes,
    // @ts-expect-error hack to use optimistick hook typings
    (state: Like[], newLike: Like) =>
      // here we check if the like already exists, if it does, we remove it, if it doesn't, we add it
      state.find(exists)
        ? state.filter((like) => like.userId !== userId)
        : [...state, newLike]
  )

  return (
    <div className="flex flex-col">
      <form
        action={async () => {
          if (!userId) {
            return toast.error('You need to login first')
          }
          addOptimisticLike({ postId: post.id, userId })
          await likePost(post.id)
        }}
      >
        <ActionIcon>
          <Heart
            className={cn('h-6 w-6', {
              'fill-red-500 text-red-500': optimisticLikes.some(exists),
            })}
          />
        </ActionIcon>
      </form>
      {optimisticLikes.length > 0 && (
        <p className="text-sm font-bold dark:text-white">
          {optimisticLikes.length}{' '}
          {optimisticLikes.length === 1 ? 'like' : 'likes'}
        </p>
      )}
    </div>
  )
}
