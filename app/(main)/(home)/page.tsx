import Post from './_components/post'
import LoadMore from './_components/load-more'
import { getPosts } from '@/app/actions/getPosts'

export default async function HomePage() {
  const posts = await getPosts(1)
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <LoadMore />
    </>
  )
}
