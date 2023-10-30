import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Alert from "../../../components/Alert/Alert";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import NotFoundPage from "../../../components/NotFoundPage/NotFoundPage";
import UserHeader from "../../../components/UserHeader/UserHeader";
import UserCardHeader from "../../../components/UserCardHeader/UserCardHeader";

const UserFinishRentOwner = () => {
  const [finishRent, setFinishRent] = useState([]);

  const [alertColor, setAlertColor] = useState("");
  const [msg, setMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getFinishRent();
  }, []);

  const getFinishRent = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/finishrentbyowner`);
      setFinishRent(resp.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteFinishRent = async (uuid) => {
    try {
      const resp = await axios.delete(
        `http://localhost:5000/finishrentbyowner/${uuid}`
      );
      setMsg(resp.data.msg);
      setAlertColor("#00ff04");
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
    getFinishRent();
  };

  const getDetailProduct = (uuid) => {
    navigate(`/user/detailproduct/${uuid}`);
  };

  const getDetailUser = (uuid) => {
    navigate(`/user/detailuser/${uuid}`);
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <UserHeader title="Selesai Menyewakan" />

        {/* content */}
        <div className="bg-background rounded-b-lg pb-5 min-h-screen">
          {finishRent.length === 0 ? (
            <NotFoundPage desc={"Belum Ada Riwayat Menyewakan Barang"} />
          ) : (
            <>
              <UserCardHeader
                count={finishRent.length}
                title="Barang Selesai Disewakan"
              />

              <ul className="flex flex-col gap-2 w-full px-4">
                {finishRent.map((data) => {
                  return (
                    <li
                      className="grid grid-cols-2 gap-2 justify-between bg-white w-full p-3 rounded-lg border-4 border-b-primary cursor-pointer"
                      key={data.uuid}
                    >
                      <div className="flex flex-col justify-between gap-2">
                        <div
                          className="flex flex-col"
                          onClick={() => getDetailUser(data.owner.uuid)}
                        >
                          <div className="flex gap-2 items-center">
                            <img
                              src={data.owner.url}
                              className="w-5 h-5 rounded-full"
                              alt="fotopemilik"
                            />
                            <p>{data.owner.name}</p>
                          </div>
                          <p className="text-xl text-primary font-bold">
                            {data.product.name}
                          </p>
                        </div>
                        <p className="text-tertiary text-sm font-extrabold">
                          {data.status}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <img
                          src={data.product.url}
                          className="w-full h-28 rounded-md"
                          alt="fotoproduk"
                        />
                        <div className="flex gap-1">
                          <button
                            className="text-sm text-white py-1 bg-tertiary w-full rounded-md"
                            onClick={() => getDetailProduct(data.product.uuid)}
                          >
                            Lihat Produk
                          </button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="28"
                            viewBox="0 0 24 24"
                            className="bg-secondary text-white py-1 rounded-md"
                            onClick={() => deleteFinishRent(data.uuid)}
                          >
                            <path
                              fill="currentColor"
                              d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>

        {/* footer */}
        <ButtonNavigation />
        <Alert isOpen={showAlert} desc={msg} color={alertColor} />
      </div>
    </>
  );
};

export default UserFinishRentOwner;
