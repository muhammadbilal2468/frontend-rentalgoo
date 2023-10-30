import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Alert from "../../../components/Alert/Alert";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import CardProduct from "../../../components/CardProduct/CardProduct";
import UserHeader from "../../../components/UserHeader/UserHeader";

const UserDetailUser = () => {
  const [user, setUser] = useState("");
  const [products, setProducts] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const { uuid } = useParams();

  useEffect(() => {
    getUser();
    getProducts();
  }, []);

  const getUser = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/users/${uuid}`);
      setUser(resp.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getProducts = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/hisproducts/${uuid}`);
      setProducts(resp.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getDetailProduct = (uuid) => {
    navigate(`/user/detailproduct/${uuid}`);
  };

  const addSaveProduct = async (data) => {
    const formData = new FormData();
    formData.append("productId", data.id);
    formData.append("ownerId", data.user.id);
    try {
      const resp = await axios.post(
        "http://localhost:5000/saveproducts",
        formData
      );
      setMsg(resp.data.msg);
      setAlertColor("#00ff04");
    } catch (error) {
      setMsg(error.response.data.msg);
      setAlertColor("#0087ff");
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };

  const goSendMessage = async (e) => {
    e.preventDefault();
    const requestData = {
      receiverId: user.id,
      message: "Hallo Min",
    };
    try {
      const resp = await axios.post(`http://localhost:5000/chats`, requestData);
      alert("pesan berhasil terkirim");
      navigate(`/user/detailchat/${uuid}`);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <UserHeader title="Profil Pengguna" />

        {/* content */}
        <div className="bg-background rounded-b-lg min-h-screen px-5 pt-5">
          <div className="flex flex-col gap-2 items-center">
            <img
              src={user.url}
              alt="fotouser"
              className="w-32 h-32 rounded-full border-4 border-tertiary"
            />
            <p className="text-2xl text-tertiary font-bold">{user.name}</p>
            <div className="flex justify-center items-start w-5/6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="20"
                viewBox="0 0 14 14"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11.5 5c0 2.49-4.5 8.5-4.5 8.5S2.5 7.49 2.5 5a4.5 4.5 0 0 1 9 0Z" />
                  <circle cx="7" cy="5" r="1.5" />
                </g>
              </svg>
              <p className="text-sm text-gray-500 text-center">
                {user.province}, {user.citydistrict}, {user.subdistrict}{" "}
                {user.address}
              </p>
            </div>
            <button
              className="flex items-center gap-2 bg-tertiary rounded-lg text-white py-1 px-6"
              onClick={goSendMessage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 26 26"
              >
                <path
                  fill="currentColor"
                  d="M3 4C1.344 4 0 5.344 0 7v12c0 1.656 1.344 3 3 3h20c1.656 0 3-1.344 3-3V7c0-1.656-1.344-3-3-3H3zm0 2h20c.551 0 1 .449 1 1v.5l-11 5.938L2 7.5V7c0-.551.449-1 1-1zM2 7.781l6.531 5.094l-6.406 6.563l7.813-5.563L13 15.844l3.063-1.969l7.812 5.563l-6.406-6.563L24 7.781V19a.95.95 0 0 1-.125.438c-.165.325-.486.562-.875.562H3c-.389 0-.71-.237-.875-.563A.95.95 0 0 1 2 19V7.781z"
                />
              </svg>
              Kirim Pesan
            </button>
          </div>

          <p className="flex items-center gap-2 mt-8 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M1 4h2v2H1V4zm4 0h14v2H5V4zM1 9h2v2H1V9zm4 0h14v2H5V9zm-4 5h2v2H1v-2zm4 0h14v2H5v-2z"
              />
            </svg>{" "}
            Barang
          </p>
          <div className="grid grid-cols-2 gap-5">
            {products.map((data) => {
              return (
                <CardProduct
                  key={data.uuid}
                  data={data}
                  save={() => addSaveProduct(data)}
                  detail={getDetailProduct}
                />
              );
            })}
          </div>
        </div>

        {/* footer */}
        <ButtonNavigation />
        <Alert isOpen={showAlert} desc={msg} color={alertColor} />
      </div>
    </>
  );
};

export default UserDetailUser;
