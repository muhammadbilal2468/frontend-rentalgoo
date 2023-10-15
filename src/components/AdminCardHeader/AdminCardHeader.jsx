import React from "react";

const AdminCardHeader = ({ img, title, desc }) => {
  return (
    <div className="flex bg-white justify-start items-center w-full rounded-xl p-3 gap-4 mb-8 bg-white-50">
      <img
        src={img}
        alt=""
        className="fill-white bg-tertiary w-20 p-4 rounded-lg text-white"
      />

      <div className="flex flex-col gap-1 justify-center">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="">{desc}</p>
      </div>
    </div>
  );
};

export default AdminCardHeader;
