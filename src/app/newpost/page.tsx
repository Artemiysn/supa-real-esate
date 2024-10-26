"use client";

import { SessionProvider } from "next-auth/react";
import NewPost from "./NewPost";

export default function page() {
  return (
    <SessionProvider>
      <NewPost />
    </SessionProvider>
  );
}


