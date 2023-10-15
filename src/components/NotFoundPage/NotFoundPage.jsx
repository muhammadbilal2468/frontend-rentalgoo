import React from "react";
import { notfoundImg } from "../../assets";

const NotFoundPage = ({ desc }) => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center bg-background rounded-b-lg pb-5 min-h-[480px] px-3">
      <img src={notfoundImg} className="w-4/5 h-60" alt="gambarnotfound" />
      <p className="text-secondary font-bold text-sm md:text-lg text-center">
        {desc}
      </p>
    </div>
  );
};

export default NotFoundPage;
