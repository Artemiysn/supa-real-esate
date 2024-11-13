"use client";

import { useContext } from "react";
import { MessagesContext } from "../contexts/MessagesContext";
import CenterRotator from "@/components/CenterRotator";
import MessageCard from "./MessageCard";
import SendMessageDialog from "@/components/SendMessageDialog/SendMessageDialog";

const MessagesList = ({ userId }: { userId: string | undefined }) => {

  const { messages, messagesLoading } = useContext(MessagesContext);

  return (
    <div className="min-h-[600px] w-[400px]">
      <h3 className="scroll-m-20 text-2xl tracking-tight mb-5 pt-5">
        Messages
      </h3>
      {messagesLoading ? (
        <CenterRotator />
      ) : (
        messages.map((m) => (
          <SendMessageDialog
            buttonEl={<MessageCard message={m} key={m.id} />}
            recepient={m.author}
            userId={userId}
            messageText={m.content}
            postTitle={null}
            key={m.id}
          />
        ))
      )}
    </div>
  );
};

export default MessagesList;
