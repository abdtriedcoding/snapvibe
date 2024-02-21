import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/lib/auth'
import { Card } from '@/components/ui/card'
import { getPosts } from '@/app/actions/getPosts'
import { LoadMore } from './_components/load-more'
import { type PostWithExtras } from '@/lib/definitions'
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
  const session = await auth()
  const userId = session?.user?.id

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

      <Card className="relative h-[450px] w-full overflow-hidden rounded-none sm:rounded-md">
        <Image
          src={post.fileUrl}
          alt="Post Image"
          fill
          className="object-cover sm:rounded-md"
        />
      </Card>
      <PostActions post={post} userId={userId} />

      {post.caption && (
        <div className="flex items-center space-x-2 px-3 text-sm font-medium leading-none sm:px-0">
          <Link href={`/dashboard/${post.user.username}`} className="font-bold">
            {post.user.username}
          </Link>
          <p>{post.caption}</p>
        </div>
      )}

      <Comments
        postId={post.id}
        comments={post.comments}
        user={session?.user}
      />
    </div>
  )
}
