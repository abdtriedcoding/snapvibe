import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { type PostWithExtras } from '@/lib/definitions'
import LikeButton from './like-button'
import ActionIcon from './action-icon'
import ShareButton from './share-button'
import BookmarkButton from './bookmark-button'

export default function PostActions({
  post,
  userId,
}: {
  post: PostWithExtras
  userId: string | undefined
}) {
  return (
    <div className="relative flex w-full items-start gap-x-2">
      <LikeButton post={post} userId={userId} />
      <Link href={`/dashboard/p/${post.id}`}>
        <ActionIcon>
          <MessageCircle className={'h-6 w-6'} />
        </ActionIcon>
      </Link>
      <ShareButton postId={post.id} />
      <BookmarkButton post={post} userId={userId} />
    </div>
  )
}
