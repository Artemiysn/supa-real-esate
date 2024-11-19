import Unauthorized from "@/components/Unauthorized/Unauthorized";
import { getServerAuthSession } from "@/modules/auth";
import FavouredPosts from "./FavouredPosts";

const page: React.FC = async () => {
  const session = await getServerAuthSession();
  if (!session) return <Unauthorized />;
  return (
    <div className="p-5 mb-4 max-w-[700px]">
      <h3 className="scroll-m-20 text-2xl tracking-tight mb-5 ">
        Favoured List
      </h3>
      <FavouredPosts
        userId={session.user.id}
      />
    </div>
  );
};

export default page;
