import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { SinglePostSkeleton } from "@/components/loading-skeletons";

import IndividualPost from "./_components/individual-post";

const PostPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div>
      <Suspense fallback={<SinglePostSkeleton />}>
        <IndividualPost id={id} />
      </Suspense>

      <Separator className="my-12 max-w-3xl lg:max-w-4xl mx-auto" />

      {/* <Suspense>
        <MorePosts postId={id} />
      </Suspense> */}
    </div>
  );
};

export default PostPage;
