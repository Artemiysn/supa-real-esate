import { getPostsWithCategoriesOnly } from "@/actions/actions";
import PostCardDeal from "@/components/PostCardDeal/PostCardDeal";

const Deals = async () => {
  const posts = await getPostsWithCategoriesOnly(2);
  if (!posts.length) return <NoDeals />;
  return (
    <div className="flex gap-4 mt-4">
      {posts.map((post) => (
        <PostCardDeal post={post} />
      ))}
    </div>
  );
};

export default Deals;

const NoDeals = () => {
  return (
    <div className="flex flex-row w-full mt-8 justify-between">
      <div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          10+
        </h3>
        <p>Years of experience</p>
      </div>
      <div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          12+
        </h3>
        <p>Awards gained</p>
      </div>
      <div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          7000+
        </h3>
        <p>Property ready</p>
      </div>
    </div>
  );
};
