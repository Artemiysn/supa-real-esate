import Unauthorized from "@/components/Unauthorized/Unauthorized";
import { getServerAuthSession } from "@/modules/auth";
import FavouredPosts from "./FavouredPosts";

const page: React.FC = async () => {
  const session = await getServerAuthSession();
  if (!session) return <Unauthorized />;
  return (
    <div className="max-w-[1024px] lg:w-[1024px] lg:mx-auto lg:px-0 px-2">
      <div className="mb-4 max-w-[700px]">
        <h3 className="scroll-m-20 text-2xl tracking-tight mb-5 lg:mt-0 mt-5">
          Favoured List
        </h3>
        <FavouredPosts userId={session.user.id} />
      </div>
    </div>
  );
};

export default page;
