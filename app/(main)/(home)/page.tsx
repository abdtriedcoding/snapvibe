import Post from './_components/post'
import { getPosts } from '@/app/actions/getPosts'
// import { LoadMore } from './_components/load-more'

export default async function HomePage() {
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
