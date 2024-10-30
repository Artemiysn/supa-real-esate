import CenterRotator from "@/components/CenterRotator";
import { PostType, PropertyType } from "@prisma/client";
import { Suspense } from "react";
import PostList from "./PostList";
import SearchPostsForm from "./SearchPostsForm";
import { getServerAuthSession } from "@/modules/auth";

export type paramsForPostSearch = {
  type?: PostType | undefined;
  city?: string | undefined;
  area?: number | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  property?: PropertyType | undefined;
};

type SearchPostsProps = {
  searchParams: { [key: string]: string | undefined };
};

const SearchPosts: React.FC<SearchPostsProps> = async ({ searchParams }) => {

  const session = await getServerAuthSession();

  return (
    <>
      <h3 className="scroll-m-20 text-2xl tracking-tight mb-5 text-gray-700 ml-8">
        Search result for{" "}
        <b>{!Boolean(searchParams?.city) ? "all" : searchParams?.city}</b>
      </h3>
      <SearchPostsForm searchParams={searchParams} />
      <Suspense fallback={<CenterRotator />} key={searchParams.page}>
        <PostList searchParams={searchParams} userId={session?.user?.id}/>
      </Suspense>
    </>
  );
};

export default SearchPosts;
