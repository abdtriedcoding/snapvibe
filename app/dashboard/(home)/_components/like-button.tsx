"use client";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useOptimistic } from "react";

import ActionIcon from "./action-icon";
import { Like } from "@prisma/client";
import { likePost } from "@/app/actions/likePost";
import { PostWithExtras } from "@/lib/definitions";

const LikeButton = ({
  post,
  userId,
}: {
  post: PostWithExtras;
  userId: string;
}) => {
  const predicate = (like: Like) =>
    like.userId === userId && like.postId === post.id;
  const [optimisticLikes, addOptimisticLike] = useOptimistic<Like[]>(
    post.likes,
    // @ts-ignore
    (state: Like[], newLike: Like) =>
      // here we check if the like already exists, if it does, we remove it, if it doesn't, we add it
      state.some(predicate)
        ? state.filter((like) => like.userId !== userId)
        : [...state, newLike]
  );

  return (
    <div className="flex flex-col">
      <form
        action={async () => {
          addOptimisticLike({ postId: post.id, userId });

          await likePost(post.id);
        }}
      >
        <ActionIcon>
          <Heart
            className={cn("h-6 w-6", {
              "text-red-500 fill-red-500": optimisticLikes.some(predicate),
            })}
          />
        </ActionIcon>
      </form>
      {optimisticLikes.length > 0 && (
        <p className="text-sm font-bold">
          {optimisticLikes.length}{" "}
          {optimisticLikes.length === 1 ? "like" : "likes"}
        </p>
      )}
    </div>
  );
};

export default LikeButton;
