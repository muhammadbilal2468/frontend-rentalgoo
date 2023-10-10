import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MeUser } from "../../features/authSlice";

const ButtonNavigation = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(MeUser());
  }, [dispatch]);

  return (
    <div className="bg-white flex  sticky justify-between bottom-0 left-0 right-0 z-50 border-t-4 border-white px-3">
      <div className=" grid grid-cols-5 gap-3 justify-between items-center w-full">
        <Link to={"/"}>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:bg-blue-100 py-3 rounded-t-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m2 8l9.732-4.866a.6.6 0 0 1 .536 0L22 8m-2 3v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"
              />
            </svg>
          </div>
        </Link>
        <Link to={"/user/myproducts"}>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:bg-blue-100 py-3 rounded-t-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 15 15"
            >
              <path
                fill="currentColor"
                d="M1.5 2.5V2a.5.5 0 0 0-.49.402l.49.098Zm12 0l.49-.098A.5.5 0 0 0 13.5 2v.5Zm1 5V8a.5.5 0 0 0 .49-.598l-.49.098Zm-14 0l-.49-.098A.5.5 0 0 0 .5 8v-.5Zm3 3H3v.5h.5v-.5Zm8 0v.5h.5v-.5h-.5ZM0 15h15v-1H0v1Zm1-7.5v7h1v-7H1Zm12 0v7h1v-7h-1ZM1.5 3h12V2h-12v1Zm11.51-.402l1 5l.98-.196l-1-5l-.98.196ZM14.5 7H.5v1h14V7ZM.99 7.598l1-5l-.98-.196l-1 5l.98.196ZM1 1h13V0H1v1Zm2 6.5v3h1v-3H3Zm.5 3.5h8v-1h-8v1Zm8.5-.5v-3h-1v3h1Z"
              />
            </svg>
          </div>
        </Link>
        <Link to={"/user/myactivity"}>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:bg-blue-100 py-3 rounded-t-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M22 12h-4l-3 9L9 3l-3 9H2"
              />
            </svg>
          </div>
        </Link>
        <Link to={"/user/saveproducts"}>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:bg-blue-100 py-3 rounded-t-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="none" fillRule="evenodd">
                <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                <path
                  fill="currentColor"
                  d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v16.028c0 1.22-1.38 1.93-2.372 1.221L12 18.229l-5.628 4.02c-.993.71-2.372 0-2.372-1.22V5Zm3-1a1 1 0 0 0-1 1v15.057l5.128-3.663a1.5 1.5 0 0 1 1.744 0L18 20.057V5a1 1 0 0 0-1-1H7Z"
                />
              </g>
            </svg>
          </div>
        </Link>
        <Link to={`/user/profile/${user && user.uuid}`}>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:bg-blue-100 py-3 rounded-t-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 1536 1792"
            >
              <path
                fill="currentColor"
                d="M1201 784q47 14 89.5 38t89 73t79.5 115.5t55 172t22 236.5q0 154-100 263.5T1195 1792H341q-141 0-241-109.5T0 1419q0-131 22-236.5t55-172T156.5 895t89-73t89.5-38q-79-125-79-272q0-104 40.5-198.5T406 150T569.5 40.5T768 0t198.5 40.5T1130 150t109.5 163.5T1280 512q0 147-79 272zM768 128q-159 0-271.5 112.5T384 512t112.5 271.5T768 896t271.5-112.5T1152 512t-112.5-271.5T768 128zm427 1536q88 0 150.5-71.5T1408 1419q0-239-78.5-377T1104 897q-145 127-336 127T432 897q-147 7-225.5 145T128 1419q0 102 62.5 173.5T341 1664h854z"
              />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ButtonNavigation;
