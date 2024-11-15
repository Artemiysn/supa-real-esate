"use client";

import { addMessage, countAllMessages, getFirstUser } from "@/actions/actions";
import {
  fetchAllMessages,
  fetchNewerMessages,
  MessageWithUser,
} from "@/actions/actions";
import { createContext, useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

type MessagesContextType = {
  messages: MessageWithUser[];
  messagesLoading: boolean;
  refetchMessages: any;
  deleteMessageById: any;
};

export const MessagesContext = createContext<MessagesContextType>({
  messages: [],
  messagesLoading: false,
  refetchMessages: undefined,
  deleteMessageById: undefined,
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
  const { toast } = useToast();

  const refetchMessages = useCallback(async () => {
    if (!userId) return null;
    const msgs = await fetchAllMessages(userId);
    setMessages(msgs);
  }, []);

  const deleteMessageById = useCallback((messageId: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== messageId));
  }, []);

  useEffect(() => {
    if (userId) {
      const firstFetch = async () => {
        setMessagesLoading(true);
        let messages = await fetchAllMessages(userId);
        if (!messages.length) {
          const firstUser = await getFirstUser();
          if (!firstUser) return null;
          const createFirstMsg = await addMessage(
            firstUser.id,
            userId,
            {},
            "This is a test message from the very first user of the database"
          );
          // one time only refetch for test pruposes
          messages = await fetchAllMessages(userId);
        }
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
          toast({
            variant: "default",
            description: `You have ${newMessages.length} new messages. Latest from ${newMessages[0]?.author?.name}`,
            duration: 15000,
          });
          setMessages((prev) => newMessages.concat(prev));
        }
      }, 5000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [messages, userId]);

  return (
    <MessagesContext.Provider
      value={{ messages, messagesLoading, refetchMessages, deleteMessageById }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
