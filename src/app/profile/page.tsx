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
    <div className="flex w-full">
      <div id="profile-post" className="grow ml-8">
        <UpdateProfile user={session?.user} />
        <Suspense fallback={<CenterRotator />} key={searchParams?.page}>
          <MyList userId={session?.user?.id} searchParams={searchParams} />
        </Suspense>
      </div>
      <div id="profile-messages" className="w-[400px] mr-8">
        <Suspense fallback={<CenterRotator />} key={searchParams?.page}>
          <MessagesList userId={session?.user?.id}/>
        </Suspense>
      </div>
    </div>
  );
};

export default Profile;
