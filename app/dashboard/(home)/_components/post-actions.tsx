import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Like, Post, SavedPost, User, Comment } from "@prisma/client";

import LikeButton from "./like-button";
import ActionIcon from "./action-icon";
import ShareButton from "./share-button";

export type CommentWithExtras = Comment & { user: User };
export type LikeWithExtras = Like & { user: User };

type PostWithExtras = Post & {
  comments: CommentWithExtras[];
  likes: LikeWithExtras[];
  savedBy: SavedPost[];
  user: User;
};

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
    </div>
  );
};

export default PostActions;
