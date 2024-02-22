import PostsGrid from '@/app/dashboard/p/[id]/_components/post-grid'
import { fetchPostsByUsername } from '@/app/actions/fetchPostByUsername'

export default async function ProfilePage({
  params: { username },
}: {
  params: { username: string }
}) {
  const posts = await fetchPostsByUsername(username)
  return <PostsGrid posts={posts} />
}
