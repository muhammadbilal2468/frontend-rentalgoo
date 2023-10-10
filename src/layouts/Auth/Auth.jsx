import React from "react";
import { Outlet, useNavigate } from "react-router";
import { loginImg, logoImg } from "../../assets";
import { Link } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen bg-gray-200 py-7 px-9">
      <div className="relative grid grid-cols-2 gap-10 h-full w-full">
        <div className="absolute left-0 top-0 ">
          <Link to={"/landing-page"}>
            <img src={logoImg} alt="" className="w-10 md:w-12 " />
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center col-span-2 lg:col-span-1">
          <Outlet />
        </div>
        <div className="bg-primary rounded-xl p-10 hidden lg:block">
          <div
            id="indicators-carousel"
            className="relative w-full p-20 h-full bg-tertiary backdrop-blur hover:blur-0 hover:bg-opacity-80 bg-opacity-60 bg-blur-md rounded-2xl shadow-lg ease-out duration-300"
            data-carousel="static"
          >
            <h3 className="text-3xl text-white">
              Temukan Barang Lebih Banyak !!
            </h3>
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
              <div
                className="hidden duration-700 ease-in-out"
                data-carousel-item="active"
              >
                <img
                  src="/docs/images/carousel/carousel-1.svg"
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 "
                  alt="..."
                />
              </div>
              <div
                className="hidden duration-700 ease-in-out"
                data-carousel-item
              >
                <img
                  src="/docs/images/carousel/carousel-2.svg"
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt="..."
                />
              </div>
            </div>
            <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
              <button
                type="button"
                className="w-3 h-3 rounded-full bg-white"
                aria-current="true"
                aria-label="Slide 1"
                data-carousel-slide-to="0"
              ></button>
              <button
                type="button"
                className="w-3 h-3 rounded-full bg-white"
                aria-current="false"
                aria-label="Slide 2"
                data-carousel-slide-to="1"
              ></button>
            </div>
            <button
              type="button"
              className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary border-4 border-white">
                <svg
                  className="w-4 h-4 text-white "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round" // Perbaiki di sini
                    strokeLinejoin="round" // Perbaiki di sini
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary border-4 border-white">
                <svg
                  className="w-4 h-4 text-white "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round" // Perbaiki di sini
                    strokeLinejoin="round" // Perbaiki di sini
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
