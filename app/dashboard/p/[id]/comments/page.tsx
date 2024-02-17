import { Suspense } from "react";
import GoBackButton from "../_components/goback-button";
import Comment from "@/app/dashboard/_components/comment";
import { UserAvatarSkeleton } from "@/components/loading-skeletons";
import { fetchPostComments } from "@/app/actions/fetchPostComments";

const CommentPage = async ({ params: { id } }: { params: { id: string } }) => {
  const comments = await fetchPostComments(id);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex space-x-2 items-center pb-4">
        <GoBackButton />
        <h2 className="text-2xl font-bold">Comments</h2>
      </div>
      <Suspense fallback={<UserAvatarSkeleton />}>
        {comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </Suspense>
    </div>
  );
};

export default CommentPage;
