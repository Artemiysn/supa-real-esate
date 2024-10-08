import { getServerAuthSession } from "@/auth";
import { Button } from "@/components/ui/button";
import Unauthorized from "@/components/Unauthorized/Unauthorized";
import UpdateProfile from "./UpdateProfile";
import MyList from "./MyList";
import Messages from "./Messages";
// страница только для авторизованных пользователей

const Profile = async () => {

  // with jwt set up this should be in middleware
  const session = await getServerAuthSession();
  if (!session) return <Unauthorized />

  return (
    <div className="flex w-full">
      <div id="profile-post" className="grow ml-8">
        <UpdateProfile user={session?.user}/>
        <MyList />
      </div>
      <div id="profile-messages" className="w-[400px] mr-8">
        <Messages />
      </div>
    </div>
  )
}

export default Profile