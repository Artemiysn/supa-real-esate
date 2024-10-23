import Image from "next/image";
import fallback from "@/../../public/fallback.png";
import {
  LandPlot,
  MapPin,
  CookingPot,
  Building,
  House,
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

type PostInListProps = {
  post: PostWithUsers;
  userId: string | undefined;
};

const PostInList: React.FC<PostInListProps> = ({ post, userId }) => {
  return (
    <TooltipProvider>
      <div className="flex h-[200px] w-full mb-4 rounded-xl border bg-card text-card-foreground shadow p-2">
        <Link key={post.id} href={`/details/${post.id}`} className="mr-2">
          <Image
            src={fallback.src}
            alt="fallback"
            width={300}
            height={200}
            className="rounded h-full w-full"
          />
        </Link>
        <div className="flex flex-col items-start grow">
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
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
          <address className="text-slate-400 size text-sm mb-4">
            <MapPin size={12} className="inline align-baseline mr-1" />
            <span className="align-baseline">{post?.address}</span>
          </address>
          <p className="rounded bg-orange-100 p-1 text-lg">$ {post?.price}</p>
          <div className="flex grow items-end justify-between w-full">
            <div data-type="post-in-list-badges" className="flex gap-2">
              <Badge variant="outline">
                {/* <LandPlot size={16} className="pr-1" /> {post?.area} */}
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
                <TooltipTrigger asChild>
                  <Badge variant="outline">
                    <LandPlot size={16} className="pr-1" /> {post?.area}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Total area in &#13217;</TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Badge variant="outline">
                    <CookingPot size={16} className="pr-1" /> {post?.kitchen}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Kitchen area in &#13217;</TooltipContent>
              </Tooltip>
            </div>
            <div data-type="post-in-list-buttons" className="flex gap-2">
                <AddToFavourites post={post} userId={userId} />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default PostInList;
