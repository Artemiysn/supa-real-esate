"use client";

import { addMessage, countAllMessages, getFirstUser } from "@/actions/actions";
import {
  fetchAllMessages,
  fetchNewerMessages,
  MessageWithUser,
} from "@/actions/actions";
import { createContext, useState, useEffect } from "react";

type MessagesContextType = {
  messages: MessageWithUser[];
  messagesLoading: boolean;
};

export const MessagesContext = createContext<MessagesContextType>({
  messages: [],
  messagesLoading: false,
});

const dateNow = new Date();

export const MessagesProvider = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string | undefined;
}) => {
  const [messages, setMessages] = useState<MessageWithUser[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      const firstFetch = async () => {
        setMessagesLoading(true);
        let messages = await fetchAllMessages(userId);
        console.log(messages);
        if (!messages.length) {
          // если сообщений нет найти первого пользователя и добавить сообщение от него, а после добавить сообщение в стейт
          const firstUser = await getFirstUser();
          if (!firstUser) return null;
          const createFirstMsg = await addMessage(
            firstUser.id,
            userId,
            "This is a test message from the very first user of the database"
          );
          messages = await fetchAllMessages(userId);
        }
        // добавить сообщения в стейет
        setMessages((prev) => messages);
        setMessagesLoading(false);
      };

      firstFetch();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const intervalId = setInterval(async () => {
        const lastMsgDateObj = messages.length
          ? new Date(messages[0].createdAt)
          : dateNow;

        const newMessages: MessageWithUser[] = await fetchNewerMessages(
          userId,
          lastMsgDateObj
        );

        if (newMessages?.length) {
          // показать поп ап, что пришло новое сообщение
          // доделать, чтобы был красивый поп ап, если юзер не на странице профиля
          alert("you have new message!");
          setMessages((prev) => newMessages.concat(prev));
        }
      }, 5000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [messages, userId]);

  return (
    <MessagesContext.Provider value={{ messages, messagesLoading }}>
      {children}
    </MessagesContext.Provider>
  );
};
