import Image from "next/image";
import { auth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Timestamp from "./timestamp";
import PostOptions from "./post-options";
import PostActions from "./post-actions";
import { PostWithExtras } from "@/lib/definitions";
import Link from "next/link";
import Comments from "./comments";

const Post = async ({ post }: { post: PostWithExtras }) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;
  if (!session?.user) return null;

  return (
    <div className="flex flex-col space-y-2.5">
      <div className="flex items-center justify-between">
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
              <Timestamp createdAt={post.createdAt} />
            </p>
            <p className="text-xs font-medium">Dubai, United Arab Emirates</p>
          </div>
        </div>
        <PostOptions
          postId={post.id}
          postUserId={post.userId}
          userId={userId}
        />
      </div>

      <Card className="relative h-[450px] w-full overflow-hidden rounded-none sm:rounded-md">
        <Image
          src={post.fileUrl}
          alt="Post Image"
          fill
          className="sm:rounded-md object-cover"
        />
      </Card>
      <PostActions post={post} userId={userId} />

      {post.caption && (
        <div className="text-sm leading-none flex items-center space-x-2 font-medium px-3 sm:px-0">
          <Link href={`/dashboard/${post.user.username}`} className="font-bold">
            {post.user.username}
          </Link>
          <p>{post.caption}</p>
        </div>
      )}

      <Comments postId={post.id} comments={post.comments} user={session.user} />
    </div>
  );
};

export default Post;
