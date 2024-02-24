'use client'

import Post from './post'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { getPosts } from '@/app/actions/getPosts'
import { useInView } from 'react-intersection-observer'
import { type PostWithExtras } from '@/lib/definitions'
import { PostSkeleton } from '@/components/loading-skeletons'

export default function LoadMore() {
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [posts, setPosts] = useState<PostWithExtras[]>([])

  const { ref, inView } = useInView()

  const loadMorePosts = async () => {
    const nextPage = page + 1
    const newPosts = await getPosts(nextPage)
    if (newPosts && newPosts.length > 0) {
      setPosts((prevPosts: PostWithExtras[]) => [...prevPosts, ...newPosts])
      setPage(nextPage)
    } else {
      setHasMore(false)
    }
  }

  useEffect(() => {
    if (inView && hasMore) {
      ;(async () => {
        await loadMorePosts()
      })().catch(() => {
        toast.error('Error loading more posts')
      })
    }
  }, [inView, hasMore])

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {hasMore && (
        <div ref={ref}>
          <PostSkeleton />
        </div>
      )}
    </>
  )
}
