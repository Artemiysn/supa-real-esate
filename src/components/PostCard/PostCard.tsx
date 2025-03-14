import Image from "next/image";
import { getImgSrcByPostId } from "@/lib/generatedImages";
import {
  LandPlot,
  MapPin,
  CookingPot,
  Building,
  House,
  SendHorizontal,
} from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import AddToFavourites from "./AddToFavourites";
import { displayDate } from "@/lib/utils";
import SendMessageDialog from "../SendMessageDialog/SendMessageDialog";
import fallback from "@/../public/fallback.png";
import { PostWithUsers } from "@/lib/dbTypes";

type PostCardProps = {
  post: PostWithUsers;
  userId: string | undefined;
  callBackOnDelete?: any;
};

const PostCard: React.FC<PostCardProps> = ({
  post,
  userId,
  callBackOnDelete,
}) => {
  const imgSrc = getImgSrcByPostId(post.id);

  return (
    <TooltipProvider>
      <div className="flex sm:flex-row flex-row-reverse sm:h-[200px] h-[250px] w-full max-w-[750px] mb-4 rounded-xl border bg-card text-card-foreground shadow p-2">
        <Link
          key={post.id}
          href={`/details/${post.id}`}
          className="sm:mr-2 ml-1 relative sm:min-w-[160px] min-w-[100px]"
        >
          <Image
            src={imgSrc}
            alt="fallback"
            className="rounded w-full max-h-[200px] sm:h-full"
            width={300}
            height={200}
            priority={false}
            placeholder="blur"
            blurDataURL={fallback.src}
          />
          <div className="absolute left-[-20px] top-2 flex flex-col gap-2">
            {post?.Categories.map((c) => (
              <Badge variant="flag" key={c.categoryId}>{c.category.name}</Badge>
            ))}
          </div>
        </Link>
        <div className="flex flex-col items-start grow">
          <div
            id={`postcard-title-date-${post.id}`}
            className="flex sm:flex-row flex-col sm:justify-between justify-start w-full mb-2 sm:mb-0"
          >
            <Tooltip delayDuration={300}>
              <TooltipTrigger>
                <Link key={post.id} href={`/details/${post.id}`}>
                  <h4 className="scroll-m-20 text-xl font-bold mb-0 sm:mb-2 text-left md:max-w-[350px] max-w-[200px] max-h-[60px] overflow-hidden">
                    {post?.title}
                  </h4>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={-3}>
                Details
              </TooltipContent>
            </Tooltip>
            <div>
              <p className="text-slate-400 pt-[2px]">
                {displayDate(post?.updatedAt)}
              </p>
            </div>
          </div>
          <address className="text-slate-400 text-sm mb-4 max-h-[60px] overflow-hidden">
            <MapPin size={12} className="inline align-baseline mr-1" />
            <span className="align-baseline">{post?.address}</span>
          </address>
          <p className="rounded bg-orange-100 p-1 text-lg">$ {post?.price}</p>
          <div
            id={`postcard-badges-${post.id}`}
            className="flex flex-col sm:flex-row grow sm:items-end items-start sm:justify-between justify-end w-full gap-y-2 sm:gap-y-0"
          >
            <div data-type="post-in-list-badges" className="flex gap-2 items-stretch h-6">
              <Badge variant="outline" className="h-full">
                {post?.property === "apartment" ? (
                  <>
                    <Building size={16} className="pr-1" />
                    Apartment
                  </>
                ) : (
                  <>
                    <House size={16} className="pr-1" />
                    House
                  </>
                )}
              </Badge>
              <Tooltip delayDuration={300}>
                <TooltipTrigger>
                  <Badge variant="outline" className="h-full">
                    <LandPlot size={16} className="pr-1" /> {post?.area}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Total area in &#13217;</TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={300}>
                <TooltipTrigger>
                  <Badge variant="outline" className="h-full">
                    <CookingPot size={16} className="pr-1" /> {post?.kitchen}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Kitchen area in &#13217;</TooltipContent>
              </Tooltip>
            </div>
            <div data-type="post-in-list-buttons" className="flex gap-2 items-stretch h-6">
              <AddToFavourites
                post={post}
                userId={userId}
                callBackOnDelete={callBackOnDelete}
              />
              {userId ? (
                <SendMessageDialog
                  buttonEl={
                    <Badge variant="outline" className="h-full">
                      <SendHorizontal size={16} />
                    </Badge>
                  }
                  recepient={post.user}
                  userId={userId}
                  postTitle={post.title}
                />
              ) : (
                <Tooltip delayDuration={300}>
                  <TooltipTrigger>
                    <Badge variant="secondary" className="h-full">
                      <SendHorizontal size={16} className="pr-1" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>Sign in to send message</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default PostCard;
