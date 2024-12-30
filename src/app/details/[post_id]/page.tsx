import { getServerAuthSession } from "@/modules/auth";
import { getPostDetails, PostWithUsers } from "@/lib/data";
import DetailsCarousel from "../DetailsCarousel";
import { MapPin, SendHorizontal } from "lucide-react";
import { displayDate, isGPSCoordinate } from "@/lib/utils";
import DetailsBlock from "../DetailsBlock";
import CenterRotator from "@/components/CenterRotator";
import { Suspense } from "react";
import AddToFavourites from "@/components/PostCard/AddToFavourites";
import dynamic from "next/dynamic";
import SendMessageDialog from "@/components/SendMessageDialog/SendMessageDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

const MapWithIcons = dynamic(
  () => import("@/components/MapWithIcons/MapWithIcons"),
  {
    loading: () => <CenterRotator />,
    ssr: false,
  }
);

type DetailsProps = {
  params: {
    post_id: string;
  };
};

const Details: React.FC<DetailsProps> = async ({ params }) => {
  // with jwt set up this should be in middleware
  const session = await getServerAuthSession();
  return (
    <Suspense fallback={<CenterRotator />} key={params.post_id}>
      <DetailsComponent userId={session?.user?.id} post_id={params.post_id} />
    </Suspense>
  );
};

export default Details;

const DetailsComponent: React.FC<{
  userId: string | undefined;
  post_id: string | undefined;
}> = async ({ userId, post_id }) => {
  const post: PostWithUsers = await getPostDetails(post_id, userId);

  return (
    <div className="flex lg:flex-row flex-col lg:mx-auto px-4 lg:w-[1024px] lg:px-0 w-full mt-4">
      <div id="pics-and-descr" className="lg:grow lg:pr-8">
        <DetailsCarousel />
        <div
          id="main-post-block"
          className="flex sm:flex-row flex-col gap-2 w-full justify-between mt-8 mb-4"
        >
          <div id="title-block" className="flex flex-col justify-between">
            <h4 className="scroll-m-20 text-3xl font-bold mb-2">
              {post?.title}
            </h4>
            <address className="text-slate-400 mb-4">
              <MapPin size={12} className="inline align-baseline mr-1" />
              <span className="align-baseline">{post?.address}</span>
            </address>
            <p className="text-lg mb-4">
              <span className="bg-orange-100 rounded p-1 ">
                $ {post?.price}
              </span>
            </p>
            <div className="flex gap-2">
              {post?.Categories.map((c) => (
                <Badge variant="destructive">{c.category.name}</Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2 items-start pt-1">
            <span>{displayDate(post?.updatedAt)}</span>
            <TooltipProvider>
              <AddToFavourites post={post} userId={userId} />
            </TooltipProvider>
          </div>
        </div>
        <p className="mb-8">{post?.description}</p>
        <div className="flex w-full justify-between items-center lg:mb-0 mb-4">
          <span className="text-slate-500 italic ">
            Posted by: &nbsp; {post.user.name}
          </span>
          {userId ? (
            <SendMessageDialog
              buttonEl={
                <div className="p-2 rounded-md border cursor:pointer">
                  <SendHorizontal className="mr-2 inline-block stroke-orange-300" />
                  Send a message
                </div>
              }
              recepient={post.user}
              userId={userId}
              postTitle={post.title}
            />
          ) : (
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger>
                  <div className="p-2 rounded-md border bg-gray-100 cursor:pointer">
                    <SendHorizontal className="mr-2 inline-block stroke-orange-300" />
                    Send a message
                  </div>
                </TooltipTrigger>
                <TooltipContent>Sign in to send message</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      <div id="general-and-map" className="lg:min-w-[400px] lg:px-4 pb-4 lg:translate-x-0 translate-x-[-0.5rem]">
        <DetailsBlock post={post} />
        {isGPSCoordinate(post.lat, post.lon) && <MapWithIcons posts={[post]} hideOnSmallScreens={false} />}
      </div>
    </div>
  );
};
