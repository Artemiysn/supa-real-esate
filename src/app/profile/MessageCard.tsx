import { MessageWithUser } from "@/actions/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { displayDateAndTime } from "@/lib/utils";

type MessageCardProps = {
  message: MessageWithUser;
};

const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  return (
    <div className="w-full flex items-stretch rounded-xl border bg-card text-card-foreground shadow relative mb-4">
      <div className="w-[60px] grid border-r border-orange-100 border-solid">
        <div className="place-self-center ">
          <Avatar className="mb-2">
            {/* no-refferer fixes google img deisplay */}
            <AvatarImage
              src={message.author?.image as string}
              alt="user"
              referrerPolicy="no-referrer"
            />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
          <b>{message.author?.name}</b>
        </div>
      </div>
      <div className="grow p-2 w-full">
        <div className="h-[120px] text-ellipsis overflow-hidden whitespace-nowrap">
          {message.content}
        </div>
        <p className="text-slate-400 pt-1">
          {displayDateAndTime(message?.updatedAt)}
        </p>
      </div>
      {!message.watched ? (
        <span className="text-xs absolute top-0 left-2 bg-white rainbow-text bg-opacity-50 rounded-md p-0.5">
          New!
        </span>
      ) : null}
    </div>
  );
};

export default MessageCard;
