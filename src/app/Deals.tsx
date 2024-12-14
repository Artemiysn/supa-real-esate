import { getPostsWithCategoriesOnly } from "@/actions/actions";
import PostCardDeal from "@/components/PostCardDeal/PostCardDeal";
import PostCardDealLoader from "@/components/PostCardDeal/PostCardDealLoader";

const Deals = async ({
  delay,
  take,
}: {
  delay: number | null;
  take: number;
}) => {
  const posts = await getPostsWithCategoriesOnly(take, delay);
  if (!posts.length) return <NoDeals />;
  return (
    <>
      <div className="flex gap-4 flex-wrap">
        {posts.map((post) => (
          <PostCardDeal post={post} />
        ))}
      </div>
    </>
  );
};

export default Deals;

const NoDeals = () => {
  return (
    <div className="flex flex-row w-full mt-8 justify-between flex-wrap">
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

export const DealsPreloader = ({ take }: { take: number }) => {

  const els = [];
  for (let i = 0; i < take; i++) {
    els.push(<PostCardDealLoader key={i} />);
  }
  return <div className="flex gap-4">{els}</div>;
};
