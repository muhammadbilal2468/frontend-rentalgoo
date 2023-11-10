import React from "react";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { loginImg, logoImg } from "../../assets";

const Auth = () => {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen bg-gray-200 py-7 px-9">
      <div className="relative grid grid-cols-2 gap-10 h-full w-full">
        <div className="absolute left-0 top-0 ">
          <Link to={"/landing-page"}>
            <img src={logoImg} alt="logoImg" className="w-10 md:w-12 " />
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center col-span-2 lg:col-span-1">
          <Outlet />
        </div>
        <div className="bg-primary rounded-xl p-5 hidden lg:block">
          <div
            id="indicators-carousel"
            className="relative w-full p-20 h-full bg-tertiary backdrop-blur hover:blur-0 hover:bg-opacity-80 bg-opacity-60 bg-blur-md rounded-2xl shadow-lg ease-out duration-300"
            data-carousel="static"
          >
            <img
              src={loginImg}
              alt=""
              className="absolute top-0 left-0 right-0 bottom-0 bg-cover h-full w-full rounded-2xl"
              style={{ filter: "brightness(0.3)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
