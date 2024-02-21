import Link from "next/link";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { PostWithExtras } from "@/lib/definitions";

import LikeButton from "./like-button";
import ActionIcon from "./action-icon";
import ShareButton from "./share-button";
import BookmarkButton from "./bookmark-button";

const PostActions = ({
  post,
  userId,
  className,
}: {
  post: PostWithExtras;
  userId: string | undefined;
  className?: string;
}) => {
  return (
    <div className={cn("relative flex items-start w-full gap-x-2", className)}>
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
