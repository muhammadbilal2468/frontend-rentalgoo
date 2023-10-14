import React from "react";
import { modalsuccessImg } from "../../assets";

const AdminModalInfo = ({ isOpen, title, desc }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center">
      <div className="fixed top-0 left-0 bottom-0 right-0 bg-black opacity-40" />
      <div className="flex flex-col gap-4 justify-center items-center bg-white py-5 px-10 rounded-lg z-80 w-3/12">
        <h3 className="text-2xl font-bold text-secondary text-center">
          {title}
        </h3>
        <img src={modalsuccessImg} alt="" className="w-3/4 h-52" />
        <p className="text-center">{desc}</p>
      </div>
    </div>
  );
};

export default AdminModalInfo;
