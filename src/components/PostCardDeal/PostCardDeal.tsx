import Image from "next/image";
import { getImgSrcByPostId } from "@/lib/generatedImages";
import { MapPin } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import fallback from "@/../public/fallback.png";
import { PostWithUsers } from "@/lib/dbTypes";

type PostCardDealProps = {
  post: PostWithUsers;
};

const PostCardDeal: React.FC<PostCardDealProps> = ({ post }) => {
  const imgSrc = getImgSrcByPostId(post.id);

  return (
    <TooltipProvider>
      <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-2 items-stretch">
        <Link
          key={post.id}
          href={`/details/${post.id}`}
          className="relative h-[200px] w-[200px] flex items-center justify-center mb-2"
        >
          <Image
            src={imgSrc}
            alt="fallback"
            className="rounded h-full w-full object-cover"
            width={260}
            height={180}
            priority={false}
            placeholder="blur"
            blurDataURL={fallback.src}
          />
          <div className="absolute left-[-20px] top-2 flex flex-col gap-2">
            {post?.Categories.map((c) => (
              <Badge variant="flag">{c.category.name}</Badge>
            ))}
          </div>
        </Link>
        <div className="flex flex-col items-start grow">
          <Tooltip delayDuration={300}>
            <TooltipTrigger>
              <Link key={post.id} href={`/details/${post.id}`}>
                <h4 className="scroll-m-20 font-bold mb-2 w-full text-left">
                  {post?.title}
                </h4>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={-3}>
              Details
            </TooltipContent>
          </Tooltip>
          <address className="text-slate-400 text-xs mb-2 max-w-[200px]">
            <MapPin size={12} className="inline align-baseline mr-1" />
            <span className="align-baseline">{post?.address}</span>
          </address>
          <p className="rounded bg-orange-100 p-1 text-sm mb-2">
            $ {post?.price}
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default PostCardDeal;
