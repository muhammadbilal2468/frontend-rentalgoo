import React, { useState } from "react";
import { useNavigate } from "react-router";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import ModalInfo from "../../../components/UserModalInfo/UserModalInfo";
import { modalsuccessImg } from "../../../assets";
import axios from "axios";
import UserHeader from "../../../components/UserHeader/UserHeader";

const UserAddSuggestion = () => {
  const [message, setMessage] = useState("");

  const [showModalInfo, setShowModalInfo] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const createSuggestion = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("message", message);
    try {
      const resp = await axios.post(
        "http://localhost:5000/suggestions",
        formData
      );
      setTitleModal("Berhasil");
      setMsg(resp.data.msg);
      setShowModalInfo(true);
      setTimeout(() => {
        setShowModalInfo(false);
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log(error.response.data.msg);
      setMsg(error.response.data.msg);
    }
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <UserHeader title="Berikan Saran" />

        {/* content */}
        <div className="bg-background rounded-b-lg pb-5 min-h-screen px-4 mt-5">
          <form onSubmit={createSuggestion}>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-extrabold text-tertiary dark:text-white"
            >
              Saran
            </label>
            <textarea
              id="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 mb-3"
              placeholder="Ketik Saran Anda..."
              required
            ></textarea>

            <p>{msg}</p>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg "
            >
              Kirim
            </button>
          </form>
        </div>

        {/* footer */}
        <ButtonNavigation />
        <ModalInfo
          isOpen={showModalInfo}
          title={titleModal}
          img={modalsuccessImg}
          desc={msg}
        />
      </div>
    </>
  );
};

export default UserAddSuggestion;
