import { getServerAuthSession } from "@/auth";
import Unauthorized from "@/components/Unauthorized/Unauthorized";
import UpdateProfile from "./UpdateProfile";
import MyList from "./MyList";
import Messages from "./Messages";
import { Suspense } from "react";
import CenterRotator from "@/components/CenterRotator";
// страница только для авторизованных пользователей

const Profile = async () => {

  // with jwt set up this should be in middleware
  const session = await getServerAuthSession();
  if (!session) return <Unauthorized />

  return (
    <div className="flex w-full">
      <div id="profile-post" className="grow ml-8">
        <UpdateProfile user={session?.user}/>
        <Suspense fallback={<CenterRotator/>}>
          <MyList userId={session?.user?.id}/>
        </Suspense>
      </div>
      <div id="profile-messages" className="w-[400px] mr-8">
        <Messages />
      </div>
    </div>
  )
}

export default Profile