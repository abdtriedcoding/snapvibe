"use client";

import { cn } from "@/lib/utils";
import { Bookmark } from "lucide-react";
import { useOptimistic } from "react";
import { Like, Post, SavedPost, User, Comment } from "@prisma/client";
import ActionIcon from "./action-icon";
import { bookmarkPost } from "@/app/actions/bookmarkPost";

export type CommentWithExtras = Comment & { user: User };
export type LikeWithExtras = Like & { user: User };

type PostWithExtras = Post & {
  comments: CommentWithExtras[];
  likes: LikeWithExtras[];
  savedBy: SavedPost[];
  user: User;
};

function BookmarkButton({
  post,
  userId,
}: {
  post: PostWithExtras;
  userId?: string;
}) {
  const predicate = (bookmark: SavedPost) =>
    bookmark.userId === userId && bookmark.postId === post.id;
  const [optimisticBookmarks, addOptimisticBookmark] = useOptimistic<
    SavedPost[]
  >(
    post.savedBy,
    // @ts-ignore
    (state: SavedPost[], newBookmark: SavedPost) =>
      state.find(predicate)
        ? //   here we check if the bookmark already exists, if it does, we remove it, if it doesn't, we add it
          state.filter((bookmark) => bookmark.userId !== userId)
        : [...state, newBookmark]
  );

  return (
    <form
      action={async () => {
        addOptimisticBookmark({ postId: post.id, userId });
        await bookmarkPost(post.id);
      }}
      className="ml-auto"
    >
      <ActionIcon>
        <Bookmark
          className={cn("h-6 w-6", {
            "dark:fill-white fill-black": optimisticBookmarks.some(predicate),
          })}
        />
      </ActionIcon>
    </form>
  );
}

export default BookmarkButton;
