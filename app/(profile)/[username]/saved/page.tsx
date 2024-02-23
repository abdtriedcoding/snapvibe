import PostsGrid from '@/app/(post)/p/[id]/_components/post-grid'
import { fetchSavedPostsByUsername } from '@/app/actions/userSavedPosts'

export default async function SavedPosts({
  params: { username },
}: {
  params: { username: string }
}) {
  const savedPosts = await fetchSavedPostsByUsername(username)
  const posts = savedPosts?.map((savedPost) => savedPost.post)

  return <PostsGrid posts={posts} />
}
