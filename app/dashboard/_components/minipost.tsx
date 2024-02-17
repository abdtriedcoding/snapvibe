"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { PostWithExtras } from "@/lib/definitions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Timestamp from "../(home)/_components/timestamp";
import PostOptions from "../(home)/_components/post-options";

function MiniPost({ post }: { post: PostWithExtras }) {
  const username = post.user.username;
  const href = `/dashboard/${username}`;
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div className="group p-3 px-3.5  flex items-start space-x-2.5">
      <Link href={href}>
        <Avatar className="h-6 w-6">
          <AvatarImage
            src={post.user?.image ?? "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5 leading-none text-sm">
          <Link href={href} className="font-semibold">
            {username}
          </Link>
          <p className="font-medium">{post.caption}</p>
        </div>
        <div className="flex h-5 items-center space-x-2.5">
          <Timestamp createdAt={post.createdAt} />
          <PostOptions
            postId={post.id}
            userId={session.user.id}
            postUserId={post.userId}
            className="hidden group-hover:inline"
          />
        </div>
      </div>
    </div>
  );
}

export default MiniPost;
