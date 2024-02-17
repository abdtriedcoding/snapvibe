import { notFound } from "next/navigation";
import PostView from "../../_components/postview";
import { fetchPostById } from "@/app/actions/fetchPostById";

type Props = {
  params: {
    id: string;
  };
};

const PostModal = async ({ params: { id } }: Props) => {
  const post = await fetchPostById(id);

  if (!post) {
    notFound();
  }

  return <PostView id={id} post={post} />;
};

export default PostModal;
