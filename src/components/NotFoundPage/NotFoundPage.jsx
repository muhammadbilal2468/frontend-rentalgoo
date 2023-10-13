import React from "react";
import { notfoundImg } from "../../assets";

const NotFoundPage = ({ desc }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-background rounded-b-lg pb-5 min-h-screen px-3">
      <img src={notfoundImg} className="w-4/5 h-60" alt="" />
      <p>{desc}</p>
    </div>
  );
};

export default NotFoundPage;
