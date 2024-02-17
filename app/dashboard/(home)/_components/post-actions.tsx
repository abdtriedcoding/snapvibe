import LikeButton from "./like-button";
import { Like, Post, SavedPost, User, Comment } from "@prisma/client";

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
    </div>
  );
};

export default PostActions;
