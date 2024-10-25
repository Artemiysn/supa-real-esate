"use client";

import { SearchX } from "lucide-react";

type NotFoundProps = {
    text: string;
}

const NotFound: React.FC<NotFoundProps> = ({text}) => {
  return (
    <div className="grid w-full h-full max-h-[400px]">
      <div className="place-self-center">
        <SearchX height={60} width={60} className="block mb-2 text-gray-400 mx-auto" />
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-gray-400">
            {text}
        </h3>
      </div>
    </div>
  );
};

export default NotFound;