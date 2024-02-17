import Image from "next/image";
import { auth } from "@/lib/auth";
import { Like, Post, SavedPost, User, Comment } from "@prisma/client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type CommentWithExtras = Comment & { user: User };
export type LikeWithExtras = Like & { user: User };

type PostWithExtras = Post & {
  comments: CommentWithExtras[];
  likes: LikeWithExtras[];
  savedBy: SavedPost[];
  user: User;
};

async function Post({ post }: { post: PostWithExtras }) {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="flex flex-col space-y-2.5">
      <div className="flex items-center justify-between px-3 sm:px-0">
        <div className="flex space-x-3 items-center">
          <Avatar className="relative h-8 w-8">
            <AvatarImage
              src={post.user.image ?? "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="space-x-1">
              <span className="font-semibold">{post.user.username}</span>
            </p>
            <p className="text-xs text-black dark:text-white font-medium">
              Dubai, United Arab Emirates
            </p>
          </div>
        </div>
      </div>

      <Card className="relative h-[450px] w-full overflow-hidden rounded-none sm:rounded-md">
        <Image
          src={post.fileUrl}
          alt="Post Image"
          fill
          className="sm:rounded-md object-cover"
        />
      </Card>
    </div>
  );
}

export default Post;
