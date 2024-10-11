'use client';

import { ThreeDots } from "react-loader-spinner";

const CenterRotator = () => {
  return (
    <div className="grid w-full h-full">
      <div className="place-self-center">
        <ThreeDots color="black" height={40} width={40}/>
      </div>
    </div>
  );
};

export default CenterRotator;
