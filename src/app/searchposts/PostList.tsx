import PostInList from "@/components/PostInList/PostInList";
import { fetchPostsByParams } from "@/lib/data";
import { paramsForPostSearch } from "./page";

type PostListProps = {
    searchParams: { [key: string]: string | undefined };
  };

const PostList: React.FC<PostListProps> = async ({ searchParams }) => {

  const posts = await fetchPostsByParams(searchParams as paramsForPostSearch);
  
  // добавить пагинацию

  return (
    <div className="flex w-full">
      <div id="post-list" className="grow ml-8 pr-8">
        <div id="post-list" className="min-h-[400px] mb-5">
          {posts.map((post) => (
            <PostInList post={post} />
          ))}
        </div>
      </div>
      <div id="map-block" className="w-[400px] mr-8 px-4 pb-4">
        <h4 className="scroll-m-20 text-xl font-bold pb-2 pl-2">Location</h4>
      </div>
    </div>
  );
};

export default PostList;
