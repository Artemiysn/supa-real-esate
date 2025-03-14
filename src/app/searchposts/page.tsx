import CenterRotator from "@/components/CenterRotator";
import { Suspense } from "react";
import PostList from "./PostList";
import SearchPostsForm from "./SearchPostsForm";
import { getServerAuthSession } from "@/modules/auth";

export type paramsForPostSearch = {
  type?: string | undefined;
  city?: string | undefined;
  area?: number | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  property?: string | undefined;
};

type SearchPostsProps = {
  searchParams: { [key: string]: string | undefined };
};

const SearchPosts: React.FC<SearchPostsProps> = async ({ searchParams }) => {
  const session = await getServerAuthSession();

  return (
    <div className="max-w-[1024px] lg:w-[1024px] mx-auto">
      <h3 className="scroll-m-20 text-2xl tracking-tight my-5 text-gray-700 sm:ml-8 ml-1 lg:ml-0">
        Search result for{" "}
        <b>{!Boolean(searchParams?.city) ? "all" : searchParams?.city}</b>
      </h3>
      <SearchPostsForm searchParams={searchParams} />
      <Suspense fallback={<CenterRotator />} key={searchParams.page}>
        <PostList searchParams={searchParams} userId={session?.user?.id}/>
      </Suspense>
    </div>
  );
};

export default SearchPosts;
