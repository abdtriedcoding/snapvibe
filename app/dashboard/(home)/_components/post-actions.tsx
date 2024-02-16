import Link from "next/link";
import { MessageCircle } from "lucide-react";

import LikeButton from "./like-button";
import ActionIcon from "./action-icon";
import ShareButton from "./share-button";
import BookmarkButton from "./bookmark-button";
import { PostWithExtras } from "@/lib/definitions";

const PostActions = ({
  post,
  userId,
}: {
  post: PostWithExtras;
  userId: string;
}) => {
  return (
    <div className="relative flex items-start w-full gap-x-2">
      <LikeButton post={post} userId={userId} />
      <Link href={`/dashboard/p/${post.id}`}>
        <ActionIcon>
          <MessageCircle className={"h-6 w-6"} />
        </ActionIcon>
      </Link>
      <ShareButton postId={post.id} />
      <BookmarkButton post={post} userId={userId} />
    </div>
  );
};

export default PostActions;
