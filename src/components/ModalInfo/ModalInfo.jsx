import React from "react";
import { bannerImg } from "../../assets";

const ModalInfo = ({ isOpen, title, desc, img }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute re flex justify-center items-center top-0 left-0 bottom-0 right-0 z-50">
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-black opacity-10" />
      <div className="flex flex-col gap-4 justify-center items-center bg-white py-5 px-10 rounded-lg z-60 w-5/6">
        <h3 className="text-2xl font-bold text-secondary text-center">
          {title}
        </h3>
        <img src={img} alt="" className="w-3/4 h-36" />
        <p className="text-center">{desc}</p>
      </div>
    </div>
  );
};

export default ModalInfo;
