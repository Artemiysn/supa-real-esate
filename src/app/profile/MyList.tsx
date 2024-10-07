import { Button } from "@/components/ui/button";
import Link from "next/link";

const MyList = () => {
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h3 className="scroll-m-20 text-2xl tracking-tight mb-5 ">
          My List
        </h3>
        <Link href="/newpost"><Button>Create New Post</Button></Link>
      </div>
    </div>
  );
};

export default MyList;
