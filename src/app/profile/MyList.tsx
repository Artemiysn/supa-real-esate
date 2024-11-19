import { fetchUserPostsWithPages } from "@/actions/actions";
import NotFound from "@/components/NotFound";
import PostCard from "@/components/PostCard/PostCard";
import { Button } from "@/components/ui/button";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

import Link from "next/link";

type MyListProps = {
  userId: string | undefined;
  searchParams: { [key: string]: string | undefined };
};

const defaultPostsPerPageProfile = "5";

const MyList: React.FC<MyListProps> = async ({ userId, searchParams }) => {
  
  const currentPage = parseInt((searchParams.page as string) || "1");
  const postsPerPage = parseInt(
    (searchParams.pageSize as string) || defaultPostsPerPageProfile
  );

  const { posts, total } = await fetchUserPostsWithPages(
    userId,
    currentPage,
    postsPerPage
  );

  return (
    <>
      <div className="p-5 mb-4">
        <div className="flex justify-between mb-2">
          <h3 className="scroll-m-20 text-2xl tracking-tight mb-5 ">My List</h3>
          <Link href="/newpost" rel="preload">
            <Button>Create New Post</Button>
          </Link>
        </div>
        {!total ? (
          <NotFound text={"Looks like you don't have posts yet..."} />
        ) : (
          <>
            <div id="post-list" className="min-h-[200px] mb-5">
              {posts.map((post) => (
                <PostCard post={post} userId={userId} key={post.id} />
              ))}
            </div>
            <PaginationWithLinks
              page={currentPage}
              pageSize={postsPerPage}
              totalCount={total}
              pageSizeSelectOptions={{
                pageSizeOptions: [5, 10, 25, 50],
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default MyList;
