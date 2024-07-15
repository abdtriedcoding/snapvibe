import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/lib/auth'
import { notFound } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import MiniPost from './minipost'
import { fetchPostById } from '@/app/actions/fetchPostById'
import Comment from '@/app/dashboard/_components/comment'
import Post from '@/app/dashboard/(home)/_components/post'
import CommentForm from '@/app/dashboard/_components/comment-form'
import PostOptions from '@/app/dashboard/(home)/_components/post-options'
import PostActions from '@/app/dashboard/(home)/_components/post-actions'

export default async function IndividualPost({ id }: { id: string }) {
  const post = await fetchPostById(id)
  const session = await auth()
  const user = session?.user
  const postUsername = post?.user.username ?? post?.user.name
  const userId = user?.id

  if (!post) {
    notFound()
  }

  return (
    <>
      <Card className="mx-auto hidden max-w-3xl md:flex lg:max-w-4xl">
        <div className="relative h-[450px] w-full max-w-sm overflow-hidden lg:max-w-lg">
          <Image
            src={post.fileUrl}
            alt="Post preview"
            fill
            className="object-cover md:rounded-l-md"
          />
        </div>

        <div className="flex max-w-sm flex-1 flex-col">
          <div className="flex items-center justify-between border-b px-5 py-3">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link
                  className="text-sm font-semibold"
                  href={`/dashboard/${postUsername}`}
                >
                  {postUsername}
                </Link>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex items-center space-x-2">
                  <Avatar className="relative h-8 w-8">
                    <AvatarImage
                      src={post.user.image ?? 'https://github.com/shadcn.png'}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{postUsername}</p>
                    <p className="text-sm font-medium dark:text-neutral-400">
                      {post.user.name}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <PostOptions
              postId={post.id}
              postUserId={post.user.id}
              userId={userId}
            />
          </div>

          <ScrollArea className="hidden h-[250px] py-1.5 md:inline">
            <MiniPost post={post} user={user} />
            {post.comments.length > 0 && (
              <div className="space-y-4 p-3">
                {post.comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} user={user} />
                ))}
              </div>
            )}
          </ScrollArea>

          {post.comments.length === 0 && (
            <div className="flex -mt-10 flex-col items-center justify-center gap-1.5">
              <p className="text-xl font-extrabold lg:text-2xl">
                No comments yet.
              </p>
              <p className="text-sm font-medium">Start the conversation.</p>
            </div>
          )}

          <div className="mt-auto hidden border-y p-2.5 md:block">
            <PostActions post={post} userId={userId} />
            <time className="text-[11px] font-medium uppercase text-zinc-500">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          <CommentForm postId={id} user={user} />
        </div>
      </Card>

      <div className="md:hidden">
        <Post post={post} />
      </div>
    </>
  )
}
