import PostInList from "@/components/PostInList/PostInList";
import { fetchPostsByParams } from "@/lib/data";
import { paramsForPostSearch } from "./page";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

type PostListProps = {
  searchParams: { [key: string]: string | undefined };
};

const defaultPostsPerPageProfile = "5";

const PostList: React.FC<PostListProps> = async ({ searchParams }) => {

  const currentPage = parseInt((searchParams.page as string) || "1");
  const postsPerPage = parseInt(
    (searchParams.pageSize as string) || defaultPostsPerPageProfile
  );

  const { posts, total } = await fetchPostsByParams(
    searchParams as paramsForPostSearch,
    currentPage,
    postsPerPage
  );

  return (
    <div className="flex w-full">
      <div id="post-list" className="grow ml-8 pr-8 mb-4">
        <div id="post-list" className="min-h-[400px] mb-5">
          {posts.map((post) => (
            <PostInList post={post} />
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
      </div>
      <div id="map-block" className="w-[400px] mr-8 px-4 pb-4">
        <h4 className="scroll-m-20 text-xl font-bold pb-2 pl-2">Location</h4>
      </div>
    </div>
  );
};

export default PostList;
