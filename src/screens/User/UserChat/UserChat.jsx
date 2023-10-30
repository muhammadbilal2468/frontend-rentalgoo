import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import NotFoundPage from "../../../components/NotFoundPage/NotFoundPage";
import UserHeader from "../../../components/UserHeader/UserHeader";

const UserChat = () => {
  const [chatUser, setChatUser] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getListMyChat();
  }, []);

  const getListMyChat = async () => {
    const resp = await axios.get(`http://localhost:5000/chats`);
    setChatUser(resp.data);
  };

  const getChatPersonal = (uuid) => {
    navigate(`/user/detailchat/${uuid}`);
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <UserHeader title="Obrolan" />

        {/* content */}
        <div className="bg-background rounded-b-lg pb-5 min-h-screen">
          {Array.isArray(chatUser) && chatUser.length === 0 ? (
            <NotFoundPage desc={"Anda Belum Punya Obrolan"} />
          ) : (
            <div className="flex flex-col">
              {Array.isArray(chatUser) &&
                chatUser.map((data) => {
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
                          alt="fotouser"
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
          )}
        </div>

        {/* footer */}
        <ButtonNavigation />
      </div>
    </>
  );
};

export default UserChat;
