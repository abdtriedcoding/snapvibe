import { Suspense } from "react";
import Post from "./_components/post";
import { getPosts } from "@/app/actions/getPosts";
import { PostsSkeleton } from "@/components/loading-skeletons";

const DashboardPage = async () => {
  const posts = await getPosts();
  return (
    <Suspense fallback={<PostsSkeleton />}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Suspense>
  );
};

export default DashboardPage;
