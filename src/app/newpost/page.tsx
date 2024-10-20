import  NewPost from "./NewPost"
import { Suspense } from "react";
import CenterRotator from "@/components/CenterRotator";
import { getServerAuthSession } from "@/auth";
import Unauthorized from "@/components/Unauthorized/Unauthorized";
 
export default async function page() {

  const session = await getServerAuthSession();
  if (!session) return <Unauthorized />;

  return (
    <Suspense fallback={<CenterRotator/>} >
      <NewPost />
    </Suspense>
  )
}