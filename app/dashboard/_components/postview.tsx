"use client";

import Link from "next/link";
import Image from "next/image";
import useMount from "@/hook/useMount";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import { PostWithExtras } from "@/lib/definitions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Comment from "./comment";
import MiniPost from "./minipost";
import ViewPost from "./view-post";
import CommentForm from "./comment-form";
import PostActions from "../(home)/_components/post-actions";

const PostView = ({ id, post }: { id: string; post: PostWithExtras }) => {
  const mount = useMount();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const username = post.user.username;
  const href = `/dashboard/${username}`;
  const isPostModal = pathname === `/dashboard/p/${id}`;

  if (!mount || !session?.user) return null;

  return (
    <Dialog open={isPostModal} onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="flex gap-0 flex-col md:flex-row items-start p-0 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl h-full max-h-[500px] lg:max-h-[700px] xl:max-h-[800px]">
        <div className="flex flex-col justify-between md:h-full md:order-2 w-full max-w-md">
          <DialogHeader className="flex border-b space-y-0 space-x-2.5 flex-row items-center py-4 pl-3.5 pr-6">
            <Link href={href}>
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={post.user?.image ?? "https://github.com/shadcn.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
            <Link href={href} className="font-semibold text-sm">
              {username}
            </Link>
          </DialogHeader>

          <ScrollArea className="hidden md:inline border-b flex-1 py-1.5">
            <MiniPost post={post} />
            {post.comments.length > 0 && (
              <>
                {post.comments.map((comment) => {
                  return <Comment key={comment.id} comment={comment} />;
                })}
              </>
            )}
          </ScrollArea>

          <ViewPost />

          <div className="px-2 hidden md:block mt-auto border-b p-2.5">
            <PostActions post={post} userId={session.user?.id} />
            <time className="text-[11px]  uppercase text-zinc-500 font-medium">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <CommentForm postId={id} className="hidden md:inline-flex" />
        </div>

        <div className="relative overflow-hidden h-96 md:h-[500px] lg:h-[700px] xl:h-[800px] max-w-3xl w-full">
          <Image
            src={post.fileUrl}
            fill
            objectFit="cover"
            alt="Post Image"
            className="md:rounded-l-md object-cover"
          />
        </div>

        <PostActions
          post={post}
          userId={session.user.id}
          className="md:hidden border-b p-2.5"
        />
        <CommentForm postId={id} className="md:hidden" />
        <ViewPost className="md:hidden" />
      </DialogContent>
    </Dialog>
  );
};

export default PostView;
