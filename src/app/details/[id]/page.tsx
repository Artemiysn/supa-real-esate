import { getServerAuthSession } from "@/auth";
import { getPostDetails, PostWithUsers } from "@/lib/data";
import DetailsCarousel from "../DetailsCarousel";
import { MapPin, SendHorizontal, Star } from "lucide-react";
import { displayDate } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import DetailsBlock from "../DetailsBlock";
import Location from "../Location";
import { Button } from "@/components/ui/button";
import CenterRotator from "@/components/CenterRotator";
import { Suspense } from "react";
import AddToFavourites from "@/components/PostInList/AddToFavourites";

type DetailsProps = {
  params: {
    id: string;
  };
};

const Details: React.FC<DetailsProps> = async ({ params }) => {
  // with jwt set up this should be in middleware
  const session = await getServerAuthSession();

  return (
    <Suspense fallback={<CenterRotator />} key={params.id}>
      <DetailsComponent userId={session?.user?.id} postId={params.id} />
    </Suspense>
  );
};

export default Details;

const DetailsComponent: React.FC<{
  userId: string | undefined;
  postId: string | undefined;
}> = async ({ userId, postId }) => {
  const post: PostWithUsers = await getPostDetails(postId, userId);

  return (
    <div className="flex w-full">
      <div id="pics-and-descr" className="grow ml-8 pr-8">
        <DetailsCarousel />
        <div id="main-post-block" className="flex w-full justify-between my-8">
          <div id="title-block" className="flex flex-col justify-between">
            <h4 className="scroll-m-20 text-3xl font-bold mb-2">
              {post?.title}
            </h4>
            <address className="text-slate-400 mb-4">
              <MapPin size={12} className="inline align-baseline mr-1" />
              <span className="align-baseline">{post?.address}</span>
            </address>
            <p className="text-lg">
              <span className="bg-orange-100 rounded p-1 ">
                $ {post?.price}
              </span>
            </p>
          </div>
          <div className="flex gap-2 items-start pt-1">
            <span>{displayDate(post?.updatedAt)}</span>
            <TooltipProvider>
              <AddToFavourites post={post} userId={userId} />
            </TooltipProvider>
          </div>
        </div>
        <p className="mb-4">{post?.description}</p>
      </div>
      <div id="general-and-map" className="w-[400px] mr-8 px-4 pb-4">
        <DetailsBlock post={post} />
        {/* <Location /> */}
        <div className="flex w-full justify-between items-center pl-2">
          <span className="text-slate-500 italic ">
            Posted by: &nbsp; {post.user.name}
          </span>
          <Button variant="outline" disabled={userId === post?.user?.id}>
            <SendHorizontal className="mr-2 inline-block stroke-orange-300" />
            Send a message
          </Button>
        </div>
      </div>
    </div>
  );
};
