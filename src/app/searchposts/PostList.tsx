import PostCard from "@/components/PostCard/PostCard";
import { fetchPostsByParams } from "@/actions/fetchPostsActions";
import { paramsForPostSearch } from "./page";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import NotFound from "@/components/NotFound";
import dynamic from "next/dynamic";
import CenterRotator from "@/components/CenterRotator";

const MapWithIcons = dynamic(
  () => import("@/components/MapWithIcons/MapWithIcons"),
  {
    loading: () => <CenterRotator />,
    ssr: false,
  }
);

type PostListProps = {
  searchParams: { [key: string]: string | undefined };
  userId: string | undefined;
};

const defaultPostsPerPageProfile = "5";

const PostList: React.FC<PostListProps> = async ({ searchParams, userId }) => {
  const currentPage = parseInt((searchParams.page as string) || "1");
  const postsPerPage = parseInt(
    (searchParams.pageSize as string) || defaultPostsPerPageProfile
  );

  const { posts, total } = await fetchPostsByParams(
    searchParams as paramsForPostSearch,
    currentPage,
    postsPerPage,
    userId
  );

  return (
    <>
      {!total ? (
        <NotFound text={"Looks like nothing was found..."} />
      ) : (
        <div className="flex w-full lg:pt-0 pt-12">
          <div
            id="post-list"
            className="grow sm:ml-8 ml:2 lg:ml-0 lg:pr-4 sm:pr-8 pr-2 mb-4"
          >
            <div id="post-list" className="min-h-[400px] mb-5 sm:ml-0 ml-1">
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
          </div>
          <MapWithIcons posts={posts} hideOnSmallScreens={true}/>
        </div>
      )}
    </>
  );
};

export default PostList;
