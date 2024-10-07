import { getServerAuthSession } from "@/auth";
import Unauthorized from "@/components/Unauthorized/Unauthorized";

const NewPost = async () => {

  // with jwt set up this should be in middleware 
  const session = await getServerAuthSession();
  if (!session) return <Unauthorized />;

  return <div>page</div>;
};

export default NewPost;
