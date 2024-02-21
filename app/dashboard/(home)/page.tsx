import Link from 'next/link'
import Image from 'next/image'
import { getPosts } from '@/app/actions/getPosts'
import { LoadMore } from './_components/load-more'
import { type PostWithExtras } from '@/lib/definitions'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import getCurrentUser from '@/app/actions/get-current-user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Comments from './_components/comments'
import Timestamp from './_components/timestamp'
import PostOptions from './_components/post-options'
import PostActions from './_components/post-actions'

export default async function DashboardPage() {
  const posts = await getPosts(1)
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {/* TODO: fix this lode more functionality */}
      {/* <LoadMore /> */}
    </>
  )
}

async function Post({ post }: { post: PostWithExtras }) {
  const user = await getCurrentUser()
  const userId = user?.id

  return (
    <div className="flex flex-col space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="relative h-8 w-8">
            {/* TODO: add default image */}
            <AvatarImage
              src={post.user.image ?? 'https://github.com/shadcn.png'}
            />
            <AvatarFallback>{post.user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="space-x-1">
            {/* TODO: need to see if username is really needed */}
            <span className="text-sm font-semibold">
              {post.user.username ?? post.user.name} .
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
          {/* In future need to fix this username */}
          <Link href={`/dashboard/${post.user.username}`} className="font-bold">
            {post.user.username ?? post.user.name}
          </Link>
          <p>{post.caption}</p>
        </div>
      )}

      <Comments postId={post.id} comments={post.comments} user={user} />
    </div>
  )
}
