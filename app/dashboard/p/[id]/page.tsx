import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import {
  MorePostsSkelton,
  SinglePostSkeleton,
} from "@/components/loading-skeletons";

import IndividualPost from "./_components/individual-post";
import MorePosts from "./_components/more-posts";

const PostPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <Suspense fallback={<SinglePostSkeleton />}>
        <IndividualPost id={id} />
      </Suspense>

      <Separator className="my-12 max-w-3xl lg:max-w-4xl mx-auto" />

      <Suspense fallback={<MorePostsSkelton />}>
        <MorePosts postId={id} />
      </Suspense>
    </>
  );
};

export default PostPage;
