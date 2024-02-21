import Post from "./_components/post";
import { getPosts } from "@/app/actions/getPosts";
import { LoadMore } from "./_components/load-more";

const DashboardPage = async () => {
  const posts = await getPosts(1);
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <LoadMore />
    </>
  );
};

export default DashboardPage;
