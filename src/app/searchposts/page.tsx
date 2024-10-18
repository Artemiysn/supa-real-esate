import CenterRotator from "@/components/CenterRotator";
import PostInList from "@/components/PostInList/PostInList";
import { fetchPostsByParams } from "@/lib/data";
import { PostType } from "@prisma/client";
import { Suspense, useState } from "react";
import { useFormState } from "react-dom";
import PostList from "./PostList";

export type paramsForPostSearch = {
  type?: PostType | undefined;
  city?: string | undefined;
  area?: number | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
};

type SearchPostsProps = {
  searchParams: { [key: string]: string | undefined };
};

const SearchPosts: React.FC<SearchPostsProps> = async ({ searchParams }) => {

  return (
    // нужен key для suspense
    <Suspense fallback={<CenterRotator />}>
      <PostList searchParams={searchParams}/>
    </Suspense>
  );
};

export default SearchPosts;
