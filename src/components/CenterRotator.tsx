"use client";

import { ThreeDots } from "react-loader-spinner";

const CenterRotator = () => {
  return (
    <div className="grid w-full h-full min-h-[300px] min-w-[300px]">
      <div className="place-self-center">
        <ThreeDots color="black" height={40} width={40} />
      </div>
    </div>
  );
};

export default CenterRotator;
