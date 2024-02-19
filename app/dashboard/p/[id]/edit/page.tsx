import { notFound } from "next/navigation";
import EditPost from "../_components/edit-post";
import { fetchPostById } from "@/app/actions/fetchPostById";

type Props = {
  params: {
    id: string;
  };
};

const EditPostPage = async ({ params: { id } }: Props) => {
  const post = await fetchPostById(id);

  if (!post) {
    notFound();
  }

  return <EditPost id={id} post={post} />;
};

export default EditPostPage;
