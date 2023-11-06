import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import { MeUser } from "../../../features/authSlice";
import "./UserDetailChat.css";

const UserDetailChat = () => {
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [receiverUrl, setReceiverUrl] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [sendMessage, setSendMessage] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { uuid } = useParams();

  useEffect(() => {
    getChatPersonal();
    getReceiver();
    dispatch(MeUser());
  }, [uuid, dispatch, messages]);

  const getChatPersonal = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/chats/${uuid}`);
      setMessages(resp.data);
      setReceiver(resp.data.receiver);
    } catch (error) {
      console.error(error);
    }
  };

  const getReceiver = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/users/${uuid}`);
      setReceiver(resp.data);
      setReceiverUrl(resp.data.url);
      setReceiverName(resp.data.name);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMessage = (e) => {
    setSendMessage(e.target.value);
  };

  const goSendMessage = async (e) => {
    e.preventDefault();
    const requestData = {
      receiverId: receiver.id,
      message: sendMessage,
    };
    try {
      const resp = await axios.post(`http://localhost:5000/chats`, requestData);
      console.log(resp.data);
      scrollToBottom();
      setSendMessage("");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const divRef = useRef(null);

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "auto", block: "end" });
    }
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* header */}
        <div className="sticky top-0 flex gap-3 items-center bg-primary p-3">
          <img
            src={receiverUrl}
            className="w-10 h-10 rounded-full border-2 border-white bg-white"
            alt="fotopenerima"
          />
          <p className="text-white font-bold">{receiverName}</p>
        </div>

        {/* content */}
        <div
          className="bg-background rounded-b-lg pt-5 min-h-screen overflow-y-scroll"
          ref={divRef}
        >
          {messages.map((data) => {
            const isCurrentUserSender = user.id === data.senderId;
            const messageClassName = isCurrentUserSender
              ? "sender"
              : "receiver";
            const urlPositionClassName = isCurrentUserSender
              ? "sender"
              : "receiver";

            return (
              <div
                className={`message flex items-start ${messageClassName}`}
                key={data.uuid}
              >
                {urlPositionClassName === "receiver" ? (
                  <>
                    <img
                      src={data.sender.url}
                      className="w-7 h-7 rounded-full border-2 border-tertiary"
                      alt="fotopengirim"
                    />
                    <div className="">
                      <p className={`text-sm ${messageClassName}`}>
                        {data.message}
                      </p>
                      <p className="text-xs text-gray-500 text-start ml-4">
                        {data.message_time}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="">
                      <p className={`text-sm ${messageClassName}`}>
                        {data.message}
                      </p>
                      <p className="text-xs text-gray-500 text-end mr-4">
                        {data.message_time}
                      </p>
                    </div>
                    <img
                      src={data.sender.url}
                      className="w-7 h-7 rounded-full border-2 border-tertiary"
                      alt="fotopengirim"
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div className="sticky bg-white justify-between bottom-[52px] p-2 z-50 shadow-xl">
          <form onSubmit={goSendMessage} className="grid grid-cols-4 gap-1 ">
            <input
              type="text"
              placeholder="Ketik Pesan dan Kirim"
              className="col-span-3 py-1 rounded-lg"
              value={sendMessage}
              onChange={handleMessage}
            />
            <button
              type="submit"
              className="col-span-1 bg-tertiary text-white rounded-lg py-1"
            >
              Kirim
            </button>
          </form>
        </div>

        {/* footer */}
        <ButtonNavigation />
      </div>
    </>
  );
};

export default UserDetailChat;
