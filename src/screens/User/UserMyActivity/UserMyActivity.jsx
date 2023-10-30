import React from "react";
import { Link } from "react-router-dom";
import {
  activityImg,
  finishrentownerImg,
  finishrentrenterImg,
  isrentingImg,
  isrentingoutImg,
  leaseagreementImg,
  rentalagreementImg,
} from "../../../assets";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import UserHeader from "../../../components/UserHeader/UserHeader";

const UserMyActivity = () => {
  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <UserHeader title="Aktifitas Saya" />

        {/* content */}
        <div className="bg-background rounded-b-lg pb-5 min-h-screen">
          <div className="relative bg-primary pt-8 rounded-b-xl px-3 h-16">
            <div className="w-full flex items-center bg-white border border-gray-400 rounded-lg py-2 px-6 border-b-4 border-b-primary">
              <p className="w-full text-center text-2xl text-primary font-extrabold tracking-widest">
                Aktifitas
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 justify-between mt-12 mx-4">
            <Link to={"/user/leaseagreements"}>
              <div className="flex flex-col gap-3 justify-center items-center w-full h-40 border border-gray-400 rounded-lg border-b-8 border-b-primary bg-white px-5 cursor-pointer">
                <img src={leaseagreementImg} alt="" className="w-2/4 h-18" />
                <p className="text-center text-sm font-bold">
                  Persetujuan Menyewakan
                </p>
              </div>
            </Link>
            <Link to={"/user/rentalagreements"}>
              <div className="flex flex-col gap-3 justify-center items-center w-full h-40 border border-gray-400 rounded-lg border-b-8 border-b-primary bg-white px-5 cursor-pointer">
                <img src={rentalagreementImg} alt="" className="w-2/4 h-18" />
                <p className="text-center text-sm font-bold">
                  Persetujuan Menyewa
                </p>
              </div>
            </Link>
            <Link to={"/user/isrentingouts"}>
              <div className="flex flex-col gap-3 justify-center items-center w-full h-40 border border-gray-400 rounded-lg border-b-8 border-b-primary bg-white px-5 cursor-pointer">
                <img src={isrentingoutImg} alt="" className="w-2/4 h-18" />
                <p className="text-center text-sm font-bold">
                  Sedang Menyewakan
                </p>
              </div>
            </Link>
            <Link to={"/user/isrentings"}>
              <div className="flex flex-col gap-3 justify-center items-center w-full h-40 border border-gray-400 rounded-lg border-b-8 border-b-primary bg-white px-5 cursor-pointer">
                <img src={isrentingImg} alt="" className="w-2/4 h-18" />
                <p className="text-center text-sm font-bold">Sedang Menyewa</p>
              </div>
            </Link>
            <Link to={"/user/finishrentowner"}>
              <div className="flex flex-col gap-3 justify-center items-center w-full h-40 border border-gray-400 rounded-lg border-b-8 border-b-primary bg-white px-5 cursor-pointer">
                <img src={finishrentownerImg} alt="" className="w-2/4 h-18" />
                <p className="text-center text-sm font-bold">
                  Selesai Menyewakan
                </p>
              </div>
            </Link>
            <Link to={"/user/finishrentrenter"}>
              <div className="flex flex-col gap-3 justify-center items-center w-full h-40 border border-gray-400 rounded-lg border-b-8 border-b-primary bg-white px-5 cursor-pointer">
                <img src={finishrentrenterImg} alt="" className="w-2/4 h-18" />
                <p className="text-center text-sm font-bold">Selesai Menyewa</p>
              </div>
            </Link>
          </div>
        </div>

        {/* footer */}
        <ButtonNavigation />
      </div>
    </>
  );
};

export default UserMyActivity;
