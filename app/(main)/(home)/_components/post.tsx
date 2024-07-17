import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/lib/auth'
import { type PostWithExtras } from '@/lib/definitions'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Comments from './comments'
import Timestamp from './timestamp'
import PostActions from './post-actions'
import PostOptions from './post-options'

export default async function Post({ post }: { post: PostWithExtras }) {
  const session = await auth()
  const user = session?.user
  const userId = user?.id

  return (
    <div className="flex flex-col space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="relative h-8 w-8">
            <AvatarImage
              src={post.user?.image ?? '/default-userimage.jpg'}
              alt="Avatar"
            />
            <AvatarFallback>{post.user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="space-x-1">
            <span className="text-sm font-semibold">
              {post.user.username} .
            </span>
            <Timestamp createdAt={post.createdAt} />
          </p>
        </div>
        <PostOptions
          postId={post.id}
          postUserId={post.userId}
          userId={userId}
        />
      </div>

      <AspectRatio ratio={16 / 9}>
        <Image
          src={post.fileUrl}
          alt="Post Image"
          fill
          className="rounded-md object-cover"
        />
      </AspectRatio>

      <PostActions post={post} userId={userId} />

      {post.caption && (
        <div className="flex items-center space-x-2 text-sm font-medium leading-none">
          <Link href={`/${post.user.username}`} className="font-bold">
            {post.user.username}
          </Link>
          <p>{post.caption}</p>
        </div>
      )}

      <Comments postId={post.id} comments={post.comments} user={user} />
    </div>
  )
}
