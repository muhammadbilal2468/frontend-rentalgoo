import React from "react";

const UserRemainingTime = (props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <span className="text-xl font-bold mb-2">Sisa Waktu </span>
      <div className="flex justify-center gap-6">
        <div className="flex flex-col gap-1 relative">
          <div className="p-3 flex justify-between items-center bg-primary rounded-lg">
            <div className="relative h-2.5 w-2.5 !-left-[17px] rounded-full bg-white"></div>
            <span className="text-xl font-semibold text-[#a5b4fc]">
              {props.day}
            </span>
            <div className="relative h-2.5 w-2.5 -right-[17px] rounded-full bg-white"></div>
          </div>
          <span className="text-[#8486A9] text-center">Hari</span>
        </div>
        <div className="flex flex-col gap-1 relative">
          <div className="p-3 flex justify-between items-center bg-primary rounded-lg">
            <div className="relative h-2.5 w-2.5 !-left-[17px] rounded-full bg-white"></div>
            <span className="text-xl font-semibold text-[#a5b4fc]">
              {props.hour}
            </span>
            <div className="relative h-2.5 w-2.5 -right-[17px] rounded-full bg-white"></div>
          </div>
          <span className="text-[#8486A9] text-center">Jam</span>
        </div>
        <div className="flex flex-col gap-1 relative">
          <div className="p-3 flex justify-between items-center bg-primary rounded-lg">
            <div className="relative h-2.5 w-2.5 !-left-[17px] rounded-full bg-white"></div>
            <span className="text-xl font-semibold text-[#a5b4fc]">
              {props.minute}
            </span>
            <div className="relative h-2.5 w-2.5 -right-[17px] rounded-full bg-white"></div>
          </div>
          <span className="text-[#8486A9] text-center">Menit</span>
        </div>
        <div className="flex flex-col gap-1 relative">
          <div className="p-3 flex justify-between items-center bg-primary rounded-lg">
            <div className="relative h-2.5 w-2.5 !-left-[17px] rounded-full bg-white"></div>
            <span className="text-xl font-semibold text-[#a5b4fc]">
              {props.second}
            </span>
            <div className="relative h-2.5 w-2.5 -right-[17px] rounded-full bg-white"></div>
          </div>
          <span className="text-[#8486A9] text-center">Detik</span>
        </div>
      </div>
    </div>
  );
};

export default UserRemainingTime;
