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
import { PostWithUsers } from "@/lib/data";
import fallback from "@/../public/fallback.png";

type PostCardDealProps = {
  post: PostWithUsers;
};

const PostCardDeal: React.FC<PostCardDealProps> = ({ post }) => {
  const imgSrc = getImgSrcByPostId(post.id);

  return (
    <TooltipProvider>
      <div className="flex h-[180px] w-[300px] rounded-xl border bg-card text-card-foreground shadow p-2">
        <Link key={post.id} href={`/details/${post.id}`} className="mr-2">
          <Image
            src={imgSrc}
            alt="fallback"
            className="rounded h-full w-full"
            width={260}
            height={180}
            priority={false}
            placeholder="blur"
            blurDataURL={fallback.src}
          />
        </Link>
        <div className="flex flex-col items-start grow">
          <Tooltip delayDuration={300}>
            <TooltipTrigger>
              <Link key={post.id} href={`/details/${post.id}`}>
                <h4 className="scroll-m-20 text-xl font-bold mb-2 w-full">
                  {post?.title}
                </h4>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={-3}>
              Details
            </TooltipContent>
          </Tooltip>
          <address className="text-slate-400 text-sm mb-2">
            <MapPin size={12} className="inline align-baseline mr-1" />
            <span className="align-baseline">{post?.address}</span>
          </address>
          <p className="rounded bg-orange-100 p-1 text-lg mb-1">$ {post?.price}</p>
          <div className="flex grow gap-2 w-full">
            {post?.Categories.map((c) => (
              <Badge variant="destructive">{c.category.name}</Badge>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default PostCardDeal;
