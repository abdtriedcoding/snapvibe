'use client'

import Link from 'next/link'
import { type User } from 'next-auth'
import { type CommentWithUser } from '@/lib/definitions'
import Timestamp from '@/app/dashboard/(home)/_components/timestamp'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import CommentOptions from './comment-options'

export default function Comment({
  comment,
  user,
}: {
  comment: CommentWithUser
  user: User | undefined
}) {
  const username = comment.user.username ?? comment.user.name

  return (
    <div className="flex items-start space-x-2.5">
      <Link href={`/dashboard/${username}`}>
        {/* In future need to fix this profile url and avatar fallback */}
        <Avatar className="h-6 w-6">
          <AvatarImage
            src={comment?.user?.image ?? 'https://github.com/shadcn.png'}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5 text-sm leading-none">
          <Link href={`/dashboard/${username}`} className="font-semibold">
            {username}
          </Link>
          <p className="font-medium">{comment.body}</p>
        </div>
        <div className="flex h-5 items-center space-x-2.5">
          <Timestamp createdAt={comment.createdAt} />
          {user && comment.userId === user.id && (
            <CommentOptions comment={comment} />
          )}
        </div>
      </div>
    </div>
  )
}
