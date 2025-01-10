"use client";

import { getFavouredPosts } from "@/actions/fetchPostsActions";
import CenterRotator from "@/components/CenterRotator";
import NotFound from "@/components/NotFound";
import PostCard from "@/components/PostCard/PostCard";
import { PostWithUsers } from "@/lib/dbTypes";
import { useEffect, useState } from "react";

type FavouredPostsProps = {
  userId: string | undefined;
};

const FavouredPosts: React.FC<FavouredPostsProps> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [postsData, setPostsData] = useState<PostWithUsers[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const posts = await getFavouredPosts();
        setPostsData(posts);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const callBackOnDelete = (postId: string | bigint) => {
    setPostsData((prev) => prev.filter((p) => p.id !== postId));
  };

  return (
    <>
      {isLoading ? (
        <CenterRotator />
      ) : (
        <>
          {!postsData.length ? (
            <NotFound
              text={"Looks like you don't have any favoured posts yet"}
            />
          ) : (
            <div id="post-list" className="min-h-[200px] mb-5">
              {postsData.map((post) => (
                <PostCard
                  post={post}
                  userId={userId}
                  key={post.id}
                  callBackOnDelete={() => callBackOnDelete(post.id)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FavouredPosts;
