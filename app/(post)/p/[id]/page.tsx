import { Suspense } from 'react'
import { Separator } from '@/components/ui/separator'
import {
  MorePostsSkelton,
  SinglePostSkeleton,
} from '@/components/loading-skeletons'
import MorePosts from './_components/more-posts'
import IndividualPost from './_components/individual-post'

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
