import Link from "next/link";
import PostsGrid from "./post-grid";
import { fetchPostById } from "@/app/actions/fetchPostById";
import { fetchPostsByUsername } from "@/app/actions/fetchPostByUsername";

const MorePosts = async ({ postId }: { postId: string }) => {
  const post = await fetchPostById(postId);
  const postUsername = post?.user.username;
  const posts = await fetchPostsByUsername(postUsername!, postId);

  return (
    <div className="flex flex-col space-y-3 max-w-3xl lg:max-w-4xl mx-auto pb-20">
      <p className="font-semibold text-sm text-neutral-600 dark:text-neutral-400">
        More posts from{" "}
        <Link
          href={`/dashboard/${postUsername}`}
          className="dark:text-white text-black hover:opacity-50"
        >
          {postUsername}
        </Link>
      </p>

      <PostsGrid posts={posts} />
    </div>
  );
};

export default MorePosts;
