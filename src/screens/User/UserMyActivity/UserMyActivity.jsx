import React from "react";
import { Link } from "react-router-dom";
import { activityImg } from "../../../assets";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";

const UserMyActivity = () => {
  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <div className="flex items-center gap-3  sticky top-0 bg-primary px-3 py-2 z-50 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            className="cursor-pointer"
          >
            <path
              fill="currentColor"
              d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12l4.58-4.59z"
            />
          </svg>
          <p className="">Aktifitas Saya</p>
          <p></p>
        </div>

        {/* content */}
        <div className="bg-background rounded-b-lg pb-5 min-h-screen">
          <div className="relative bg-primary pt-8 rounded-b-xl px-3 h-20">
            <div className="w-full flex items-center bg-white border border-gray-400 rounded-lg py-2 px-6 border-b-4 border-b-primary">
              <img
                src={activityImg}
                alt="hambaraktifitas"
                className="w-20 h-16"
              />
              <p className="w-full text-center text-2xl text-primary font-extrabold tracking-widest">
                Aktifitas
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 justify-between mt-16 mx-4">
            <Link to={"/user/leaseagreements"}>
              <div className="flex flex-col gap-3 justify-center items-center w-full h-32 border border-gray-400 rounded-lg border-b-8 border-b-primary bg-white px-5 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  className="text-primary"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M3.464 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.464 8.535C4.93 22 7.286 22 12 22c4.714 0 7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464Zm7.08 4.053a.75.75 0 1 0-1.087-1.034l-2.314 2.43l-.6-.63a.75.75 0 1 0-1.086 1.034l1.143 1.2a.75.75 0 0 0 1.086 0l2.857-3ZM13 8.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5h-5Zm-2.457 6.267a.75.75 0 1 0-1.086-1.034l-2.314 2.43l-.6-.63a.75.75 0 1 0-1.086 1.034l1.143 1.2a.75.75 0 0 0 1.086 0l2.857-3ZM13 15.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5h-5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-center text-sm font-bold">
                  Persetujuan Menyewakan
                </p>
              </div>
            </Link>
            <Link to={"/user/rentalagreements"}>
              <div className="flex flex-col gap-3 justify-center items-center w-full h-32 border border-gray-400 rounded-lg border-b-8 border-b-primary bg-white px-5 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  className="text-primary"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinejoin="round"
                      d="M6 15.8L7.143 17L10 14M6 8.8L7.143 10L10 7"
                    />
                    <path d="M13 9h5m-5 7h5m4-4c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536" />
                  </g>
                </svg>
                <p className="text-center text-sm font-bold">
                  Persetujuan Menyewa
                </p>
              </div>
            </Link>
            <Link to={"/user/isrentingouts"}>
              <div className="flex flex-col gap-3 justify-center items-center w-full h-32 border border-gray-400 rounded-lg border-b-8 border-b-primary bg-white px-5 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  className="text-primary"
                >
                  <path
                    fill="currentColor"
                    d="M15 3H9V1h6v2m-3 15.5c0 1.27.37 2.44 1 3.44c-.33.06-.66.06-1 .06a9 9 0 0 1 0-18c2.12 0 4.07.74 5.62 2l1.42-1.44c.51.44.96.9 1.41 1.41l-1.42 1.42A9.162 9.162 0 0 1 21 12.5a6.5 6.5 0 0 0-9 6M13 7h-2v7h2V7m9 11.5v-4l-1.17 1.17A3.99 3.99 0 0 0 18 14.5c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.68 0 3.12-1.03 3.71-2.5H20a2.5 2.5 0 1 1-.23-3.27L18 18.5h4Z"
                  />
                </svg>
                <p className="text-center text-sm font-bold">
                  Sedang Menyewakan
                </p>
              </div>
            </Link>
            <Link to={"/user/isrentings"}>
              <div className="flex flex-col gap-3 justify-center items-center w-full h-32 border border-gray-400 rounded-lg border-b-8 border-b-primary bg-white px-5 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  className="text-primary"
                >
                  <path
                    fill="currentColor"
                    d="M11 8h2v6h-2V8m4-7H9v2h6V1m-3 19c-3.87 0-7-3.13-7-7s3.13-7 7-7c3.54 0 6.45 2.62 6.93 6.03c.72.05 1.41.2 2.07.47a9.162 9.162 0 0 0-1.97-5.11l1.42-1.42c-.45-.51-.9-.97-1.41-1.41L17.62 6c-1.55-1.26-3.5-2-5.62-2a9 9 0 0 0 0 18c.34 0 .67 0 1-.06c-.37-.59-.65-1.25-.82-1.94H12m10-1.5v-4l-1.17 1.17A3.99 3.99 0 0 0 18 14.5c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.68 0 3.12-1.03 3.71-2.5H20a2.5 2.5 0 1 1-.23-3.27L18 18.5h4Z"
                  />
                </svg>
                <p className="text-center text-sm font-bold">Sedang Menyewa</p>
              </div>
            </Link>
            <Link to={"/user/finishrentowner"}>
              <div className="flex flex-col gap-3 justify-center items-center w-full h-32 border border-gray-400 rounded-lg border-b-8 border-b-primary bg-white px-5 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  className="text-primary"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm8.73 8.684a1 1 0 1 0-1.46-1.368l-3.083 3.29l-1.523-1.353a1 1 0 0 0-1.328 1.494l2.25 2a1 1 0 0 0 1.393-.063l3.75-4Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-center text-sm font-bold">
                  Selesai Menyewakan
                </p>
              </div>
            </Link>
            <Link to={"/user/finishrentrenter"}>
              <div className="flex flex-col gap-3 justify-center items-center w-full h-32 border border-gray-400 rounded-lg border-b-8 border-b-primary bg-white px-5 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  className="text-primary"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="4" />
                    <path d="m9 12l2.25 2L15 10" />
                  </g>
                </svg>
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
