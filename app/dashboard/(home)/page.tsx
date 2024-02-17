import Post from "./_components/post";
import { getPosts } from "@/app/actions/getPosts";

const DashboardPage = async () => {
  const posts = await getPosts();
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default DashboardPage;
