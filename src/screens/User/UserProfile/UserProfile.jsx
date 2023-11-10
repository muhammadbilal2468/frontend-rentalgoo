import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { modalconfirmImg, modalsuccessImg } from "../../../assets";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import UserModalConfirm from "../../../components/UserModalConfirm/UserModalConfirm";
import UserModalInfo from "../../../components/UserModalInfo/UserModalInfo";
import { LogoutUser, reset } from "../../../features/authSlice";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);

  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uuid } = useParams();

  useEffect(() => {
    getMe();
  }, [uuid]);

  const getMe = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/me`);
      setUser(resp.data);
      setUrl(resp.data.url);
    } catch (error) {
      setMsg(error.response);
    }
  };

  const handleChangeFile = async (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setFile(selectedImage);
    setUrl(imageUrl);
  };

  const updatePhotoMe = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const resp = await axios.patch(
        `http://localhost:5000/photome/${uuid}`,
        formData
      );
      setTitleModal("Berhasil");
      setMsg(resp.data.msg);
      setShowModalInfo(true);
      setTimeout(() => {
        setShowModalInfo(false);
        getMe();
      }, 1500);
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };

  const editProfile = () => {
    navigate(`/user/editprofile/${user.uuid}`);
  };

  const logout = () => {
    dispatch(LogoutUser());
    dispatch(reset());
    navigate("/auth/login");
  };

  const handleModalLogout = async () => {
    setTitleModal("Keluar");
    setMsg("apakah anda yakin keluar dari akun ini ?");
    setShowModalConfirm(!showModalConfirm);
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <div className="flex items-center gap-3 justify-between sticky top-0 bg-primary px-3 py-2 z-50 text-white">
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
          <p className="">Profile Saya</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="cursor-pointer"
            onClick={editProfile}
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="m16.474 5.408l2.118 2.117m-.756-3.982L12.109 9.27a2.118 2.118 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621Z" />
              <path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" />
            </g>
          </svg>
        </div>

        {/* content */}
        <div className="bg-background rounded-b-lg min-h-screen px-5 pt-5">
          <div className="relative flex justify-center w-full mb-5">
            <img
              src={url}
              className="w-40 h-40 rounded-full border-4 border-primary"
              alt="fotouser"
            />
            <div className="absolute -bottom-2 right-24 flex items-center justify-center">
              <form onSubmit={updatePhotoMe}>
                {url === user.url ? (
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center border-2 border-gray-300  rounded-xl cursor-pointer bg-primary p-2"
                  >
                    <div className="flex flex-col items-center justify-center ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="white"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                        >
                          <path d="M9.533 11.15A1.823 1.823 0 0 0 9 12.438V15h2.578c.483 0 .947-.192 1.289-.534l7.6-7.604a1.822 1.822 0 0 0 0-2.577l-.751-.751a1.822 1.822 0 0 0-2.578 0L9.533 11.15Z" />
                          <path d="M21 12c0 4.243 0 6.364-1.318 7.682C18.364 21 16.242 21 12 21c-4.243 0-6.364 0-7.682-1.318C3 18.364 3 16.242 3 12c0-4.243 0-6.364 1.318-7.682C5.636 3 7.758 3 12 3" />
                        </g>
                      </svg>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleChangeFile}
                    />
                  </label>
                ) : (
                  <button
                    type="submit"
                    className="text-white bg-primary p-3 rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      className="animate-ping"
                    >
                      <g fill="none" fillRule="evenodd">
                        <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                        <path
                          fill="currentColor"
                          d="M21.546 5.111a1.5 1.5 0 0 1 0 2.121L10.303 18.475a1.6 1.6 0 0 1-2.263 0L2.454 12.89a1.5 1.5 0 1 1 2.121-2.121l4.596 4.596L19.424 5.111a1.5 1.5 0 0 1 2.122 0Z"
                        />
                      </g>
                    </svg>
                  </button>
                )}
              </form>
            </div>
          </div>

          <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 mb-5">
            <div className="flex flex-col pb-3">
              <dt className="mb-1 text-primary text-xs">Nama Lengkap</dt>
              <dd className="font-semibold">{user.name}</dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-primary text-xs">Email</dt>
              <dd className="font-semibold">{user.email}</dd>
            </div>
            <div className="flex flex-col pt-3">
              <dt className="mb-1 text-primary text-xs">Phone number</dt>
              <dd className="font-semibold">{user.nohp}</dd>
            </div>
          </dl>

          <div className="text-gray-900 border-gray-200 rounded-lg w-full">
            <button
              type="button"
              className="relative inline-flex gap-2 items-center w-full py-4 text-base font-medium border-b border-gray-200 rounded-t-lg "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
              >
                <path
                  fill="#1d3354"
                  d="M13 0c-1.7 0-3 1.3-3 3v6c0 1.7 1.3 3 3 3h6l4 4v-4c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3H13zm4.188 3h1.718l1.688 6h-1.5l-.407-1.5h-1.5L16.813 9H15.5l1.688-6zM18 4c-.1.4-.212.888-.313 1.188l-.28 1.312h1.187l-.282-1.313C18.113 4.888 18 4.4 18 4zM3 10c-1.7 0-3 1.3-3 3v6c0 1.7 1.3 3 3 3v4l4-4h6c1.7 0 3-1.3 3-3v-6h-3c-1.9 0-3.406-1.3-3.906-3H3zm4.594 2.906c1.7 0 2.5 1.4 2.5 3c0 1.4-.481 2.288-1.281 2.688c.4.2.874.306 1.374.406l-.374 1c-.7-.2-1.426-.512-2.126-.813c-.1-.1-.275-.093-.375-.093C6.112 18.994 5 18 5 16c0-1.7.994-3.094 2.594-3.094zm0 1.094c-.8 0-1.188.9-1.188 2c0 1.2.388 2 1.188 2c.8 0 1.218-.9 1.218-2s-.418-2-1.218-2z"
                />
              </svg>
              FAQ
            </button>
            <Link to={"/user/add-suggestion"}>
              <button
                type="button"
                className="relative inline-flex gap-3 items-center w-full py-4 text-base font-medium border-b border-gray-200 rounded-t-lg "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#1d3354"
                    d="M15.002 2a3.001 3.001 0 1 0 0 6.003c.46 0 .89-.105 1.283-.293a.5.5 0 0 1 .43.903c-.52.248-1.097.39-1.713.39a4.001 4.001 0 1 1 4.001-4.005v.5a1.501 1.501 0 0 1-2.646.972a2 2 0 1 1-.312-3.176A.5.5 0 0 1 17 3.5v1.998a.501.501 0 1 0 1.003 0v-.496A3.001 3.001 0 0 0 15.001 2ZM14 5a1 1 0 1 0 2 0a1 1 0 0 0-2 0Zm1 5a4.978 4.978 0 0 0 3-1v3.276c0 1.418-1.164 2.566-2.6 2.566h-4.59l-4.011 2.961a1.009 1.009 0 0 1-1.4-.199a.978.978 0 0 1-.199-.59v-2.172h-.6c-1.436 0-2.6-1.149-2.6-2.566v-6.71C2 4.149 3.164 3 4.6 3h5.816A5 5 0 0 0 15 10Z"
                  />
                </svg>
                Berikan Saran
              </button>
            </Link>
            <button
              type="button"
              className="relative inline-flex items-center w-full py-4 text-base rounded-b-lg text-secondary font-bold"
              onClick={handleModalLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h7v2H5v14h7v2H5Zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5l-5 5Z"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* footer */}
        <ButtonNavigation />
        <UserModalInfo
          isOpen={showModalInfo}
          title={titleModal}
          img={modalsuccessImg}
          desc={msg}
        />
        <UserModalConfirm
          isOpen={showModalConfirm}
          title={titleModal}
          img={modalconfirmImg}
          desc={msg}
          cancelText={"Batal"}
          confirmText={"Keluar"}
          onCancel={handleModalLogout}
          onConfirm={logout}
        />
      </div>
    </>
  );
};

export default UserProfile;
