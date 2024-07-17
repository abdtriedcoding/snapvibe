'use client'

import Link from 'next/link'
import { type User } from 'next-auth'
import { type PostWithExtras } from '@/lib/definitions'
import Timestamp from '@/app/(home)/_components/timestamp'
import PostOptions from '@/app/(home)/_components/post-options'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function MiniPost({
  post,
  user,
}: {
  post: PostWithExtras
  user: User | undefined
}) {
  const username = post.user.username
  const href = `/${username}`

  return (
    <div className="flex items-start space-x-2.5 p-3">
      <Link href={href}>
        <Avatar className="relative h-8 w-8">
          <AvatarImage
            src={post.user.image ?? '/default-userimage.jpg'}
            alt="Avatar"
          />
          <AvatarFallback>{post.user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5 text-sm leading-none">
          <Link href={href} className="font-semibold">
            {username}
          </Link>
          <p className="font-medium">{post.caption}</p>
        </div>
        <div className="flex h-5 items-center space-x-2.5">
          <Timestamp createdAt={post.createdAt} />
          <PostOptions
            postId={post.id}
            postUserId={post.user.id}
            userId={user?.id}
          />
        </div>
      </div>
    </div>
  )
}
