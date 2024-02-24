import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Separator } from '@/components/ui/separator'
import {
  MorePostsSkelton,
  SinglePostSkeleton,
} from '@/components/loading-skeletons'
import MorePosts from './_components/more-posts'
import IndividualPost from './_components/individual-post'
import { fetchPostById } from '@/app/actions/fetchPostById'

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}): Promise<Metadata> {
  // TODO: we can make a better seprate query for this to reduce responce time and load
  const post = await fetchPostById(id)

  return {
    title: post?.caption,
    ...(post?.fileUrl && {
      openGraph: {
        images: [post?.fileUrl],
      },
    }),
  }
}

export default function PostPage({
  params: { id },
}: {
  params: { id: string }
}) {
  return (
    <>
      <Suspense fallback={<SinglePostSkeleton />}>
        <IndividualPost id={id} />
      </Suspense>

      <Separator className="mx-auto my-12 max-w-3xl lg:max-w-4xl" />

      <Suspense fallback={<MorePostsSkelton />}>
        <MorePosts postId={id} />
      </Suspense>
    </>
  )
}
