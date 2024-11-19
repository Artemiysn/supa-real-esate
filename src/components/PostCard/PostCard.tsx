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
import { PostWithUsers } from "@/lib/data";
import AddToFavourites from "./AddToFavourites";
import { displayDate } from "@/lib/utils";
import SendMessageDialog from "../SendMessageDialog/SendMessageDialog";

type PostCardProps = {
  post: PostWithUsers;
  userId: string | undefined;
  callBackOnDelete?: any;
};

const PostCard: React.FC<PostCardProps> = ({ post, userId, callBackOnDelete }) => {
  const imgSrc = getImgSrcByPostId(post.id);

  return (
    <TooltipProvider>
      <div className="flex h-[200px] w-full mb-4 rounded-xl border bg-card text-card-foreground shadow p-2">
        <Link key={post.id} href={`/details/${post.id}`} className="mr-2">
          <Image
            src={imgSrc}
            alt="fallback"
            className="rounded h-full w-full"
            width={300}
            height={200}
            priority={false}
          />
        </Link>
        <div className="flex flex-col items-start grow">
          <div className="flex justify-between items-start w-full">
            <Tooltip delayDuration={300}>
              <TooltipTrigger >
                <Link key={post.id} href={`/details/${post.id}`}>
                  <h4 className="scroll-m-20 text-xl font-bold mb-2">
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
          <address className="text-slate-400 text-sm mb-4">
            <MapPin size={12} className="inline align-baseline mr-1" />
            <span className="align-baseline">{post?.address}</span>
          </address>
          <p className="rounded bg-orange-100 p-1 text-lg">$ {post?.price}</p>
          <div className="flex grow items-end justify-between w-full">
            <div data-type="post-in-list-badges" className="flex gap-2">
              <Badge variant="outline">
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
                <TooltipTrigger >
                  <Badge variant="outline">
                    <LandPlot size={16} className="pr-1" /> {post?.area}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Total area in &#13217;</TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={300}>
                <TooltipTrigger >
                  <Badge variant="outline">
                    <CookingPot size={16} className="pr-1" /> {post?.kitchen}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Kitchen area in &#13217;</TooltipContent>
              </Tooltip>
            </div>
            <div data-type="post-in-list-buttons" className="flex gap-2">
              <AddToFavourites post={post} userId={userId} callBackOnDelete={callBackOnDelete}/>
              {userId ? (
                <SendMessageDialog
                  buttonEl={
                    <Badge variant="outline">
                      <SendHorizontal size={16} className="pr-1" />
                    </Badge>
                  }
                  recepient={post.user}
                  userId={userId}
                  postTitle={post.title}
                />
              ) : (
                <Tooltip delayDuration={300}>
                  <TooltipTrigger>
                    <Badge variant="secondary" >
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
