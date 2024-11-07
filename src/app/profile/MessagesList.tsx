"use client";

import { useContext } from "react";
import { MessagesContext } from "../contexts/MessagesContext";
import CenterRotator from "@/components/CenterRotator";
import MessageCard from "./MessageCard";

const MessagesList = () => {
  const { messages, messagesLoading } = useContext(MessagesContext);

  return (
    <div className="min-h-[600px] w-[400px]">
      <h3 className="scroll-m-20 text-2xl tracking-tight mb-5 pl-5 pt-5">
        Messages
      </h3>
      {messagesLoading ? (
        <CenterRotator />
      ) : (
        messages.map((m) => <MessageCard message={m} key={m.id}/>)
      )}
    </div>
  );
};

export default MessagesList;
