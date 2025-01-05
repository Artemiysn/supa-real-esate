import { MessageWithUser } from "@/actions/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { displayDateAndTime } from "@/lib/utils";

type MessageCardProps = {
  message: MessageWithUser;
};

const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  return (
    <div className="w-full flex items-stretch rounded-xl border bg-card text-card-foreground shadow relative mb-4 cursor-pointer hover:bg-gray-100">
      <div className="min-w-[110px] grid">
        <div className="place-self-center flex flex-col items-center">
          <Avatar className="mb-2">
            {/* no-refferer fixes google img deisplay */}
            <AvatarImage
              src={message.author?.image as string}
              alt="user"
              referrerPolicy="no-referrer"
            />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
          <b className="overflow-hidden">{message.author?.name}</b>
        </div>
      </div>
      <div className="grow p-2 w-full">
        <div className="h-[120px] text-left text-ellipsis overflow-hidden mb-8px">
          {message.content}
        </div>
        <p className="text-slate-400 pt-2 max-w-[80%] border-t border-orange-200 text-left">
          {displayDateAndTime(message?.updatedAt)}
        </p>
      </div>
      {!message.watched && (
        <span className="text-xs absolute top-1 left-2 bg-white rainbow-text bg-opacity-50 rounded-md p-0.5">
          New!
        </span>
      )}
    </div>
  );
};

export default MessageCard;
