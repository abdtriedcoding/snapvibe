import PostsGrid from "../p/[id]/_components/post-grid";
import { fetchPostsByUsername } from "@/app/actions/fetchPostByUsername";

const ProfilePage = async ({
  params: { username },
}: {
  params: { username: string };
}) => {
  // const posts = await fetchPostsByUsername(username);

  // return <PostsGrid posts={posts} />;
  return <>Page</>
};

export default ProfilePage;
