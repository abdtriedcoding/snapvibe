"use client";

import { cn } from "@/lib/utils";
import { useOptimistic } from "react";
import { Bookmark } from "lucide-react";

import ActionIcon from "./action-icon";
import { SavedPost } from "@prisma/client";
import { PostWithExtras } from "@/lib/definitions";
import { bookmarkPost } from "@/app/actions/bookmarkPost";

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
