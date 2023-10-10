import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";

const UserChat = () => {
  const [chatUser, setChatUser] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getListMyChat();
  }, []);

  const getListMyChat = async () => {
    const resp = await axios.get(`https://confused-dove-overalls.cyclic.app/chats`);
    setChatUser(resp.data);
  };

  const getChatPersonal = (uuid) => {
    navigate(`/user/detailchat/${uuid}`);
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <div className="flex items-center gap-3  sticky top-0 bg-primary px-3 py-2 z-50 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            className="cursor-pointer"
          >
            <path
              fill="currentColor"
              d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12l4.58-4.59z"
            />
          </svg>
          <p className="">Obrolan</p>
          <p></p>
        </div>

        {/* content */}
        <div className="bg-background rounded-b-lg pb-5 min-h-screen">
          <div className="flex flex-col">
            {chatUser.map((data) => {
              return (
                <div
                  className="flex items-center justify-between px-3 py-5 border-b-2 border-t-primary hover:bg-blue-50 cursor-pointer"
                  key={data.uuid}
                  onClick={() => getChatPersonal(data.uuid)}
                >
                  <div className="flex gap-2">
                    <img
                      src={data.url}
                      className="w-12 h-12 rounded-full border-2 border-tertiary"
                      alt=""
                    />
                    <div className="">
                      <p className="text-base font-bold text-tertiary">
                        {data.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {data.last_message}
                      </p>
                    </div>
                  </div>
                  <p>{data.last_message_time}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* footer */}
        <ButtonNavigation />
      </div>
    </>
  );
};

export default UserChat;
