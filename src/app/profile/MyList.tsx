import { Button } from "@/components/ui/button";
import { fetchUserPosts } from "@/lib/data";
import Link from "next/link";

type MyListProps = {
  userId: string | undefined;
}


const MyList: React.FC<MyListProps> = async ({userId}) => {

  const posts = await fetchUserPosts(userId);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h3 className="scroll-m-20 text-2xl tracking-tight mb-5 ">
          My List
        </h3>
        <Link href="/newpost"><Button>Create New Post</Button></Link>
      </div>
      <div id="post-list" className="min-h-[400px]">

      </div>
    </div>
  );
};

export default MyList;
