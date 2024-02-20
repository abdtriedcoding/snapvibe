import PostsGrid from "../../p/[id]/_components/post-grid";
import { fetchSavedPostsByUsername } from "@/app/actions/userSavedPosts";

const SavedPosts = async ({
  params: { username },
}: {
  params: { username: string };
}) => {
  const savedPosts = await fetchSavedPostsByUsername(username);
  const posts = savedPosts?.map((savedPost) => savedPost.post);

  return <PostsGrid posts={posts} />;
};

export default SavedPosts;
