import React from "react";
import { bannerImg } from "../../assets";

const ModalInfo = ({ isOpen, title, desc }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed flex justify-center items-center top-0 left-0 bottom-0 right-0 z-50">
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-black opacity-60" />
      <div className="flex flex-col gap-4 justify-center items-center bg-white w-[400px] py-5 px-10 rounded-lg z-60">
        <h3 className="text-2xl font-bold text-secondary">{title}</h3>
        <img src={bannerImg} alt="" className="w-3/4 h-36" />
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default ModalInfo;
