import { getServerAuthSession } from "@/modules/auth";
import Unauthorized from "@/components/Unauthorized/Unauthorized";
import UpdateProfile from "./UpdateProfile";
import MessagesList from "./MessagesList";
import { Suspense } from "react";
import CenterRotator from "@/components/CenterRotator";
import MyList from "./MyList";

type ProfileProps = {
  searchParams: { [key: string]: string | undefined };
};

const Profile: React.FC<ProfileProps> = async ({ searchParams }) => {
  // with jwt set up this should be in middleware
  const session = await getServerAuthSession();
  if (!session) return <Unauthorized />;

  return (
    <div className="flex lg:flex-row flex-col-reverse w-full lg:px-0 px-2 max-w-[1024px] lg:w-[1024px] lg:mx-auto">
      <div id="profile-post" className="grow">
        <UpdateProfile user={session?.user} />
        <Suspense fallback={<CenterRotator />} key={searchParams?.page}>
          <MyList userId={session?.user?.id} searchParams={searchParams} />
        </Suspense>
      </div>
      <div id="profile-messages" className="sm:w-[400px] w-full">
        <Suspense fallback={<CenterRotator />} key={searchParams?.page}>
          <MessagesList userId={session?.user?.id} />
        </Suspense>
      </div>
    </div>
  );
};

export default Profile;
