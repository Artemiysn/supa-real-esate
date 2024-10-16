import { getServerAuthSession } from "@/auth";
import Unauthorized from "@/components/Unauthorized/Unauthorized";
import { getPostDetails } from "@/lib/data";
import type { Posts as PostType } from "@prisma/client";
import DetailsCarousel from "../DetailsCarousel";
import { MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { displayDate } from "@/lib/utils";

type DetailsProps = {
  params: {
    id: string;
  };
};

const Details: React.FC<DetailsProps> = async ({ params }) => {
  // with jwt set up this should be in middleware
  const session = await getServerAuthSession();
  if (!session) return <Unauthorized />;

  const post: PostType = await getPostDetails(params.id);

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
          <div className="h-[120px] ">
            <span className="text-slate-400">{displayDate(post?.updatedAt)}</span>
          </div>
        </div>
        <p>
            {post?.description}
        </p>
      </div>
      <div
        id="general-and-map"
        className="w-[400px] mr-8 bg-gray-50 min-h-[600px] h-full rounded-xl border bg-card text-card-foreground shadow p-4 "
      ></div>
    </div>
  );
};

export default Details;
