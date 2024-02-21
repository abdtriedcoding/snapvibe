"use client";

import Post from "./post";
import { useEffect, useState } from "react";
import { getPosts } from "@/app/actions/getPosts";
import { PostWithExtras } from "@/lib/definitions";
import { useInView } from "react-intersection-observer";
import { PostSkeleton } from "@/components/loading-skeletons";

export function LoadMore() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState<PostWithExtras[]>([]);

  const { ref, inView } = useInView();

  const loadMorePosts = async () => {
    const nextPage = page + 1;
    const newPosts = await getPosts(nextPage);
    if (newPosts && newPosts.length > 0) {
      setPosts((prevPosts: PostWithExtras[]) => [...prevPosts, ...newPosts]);
      setPage(nextPage);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (inView && hasMore) {
      loadMorePosts();
    }
  }, [inView, hasMore]);

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {hasMore && (
        <div ref={ref}>
          <PostSkeleton />
        </div>
      )}
    </>
  );
}
