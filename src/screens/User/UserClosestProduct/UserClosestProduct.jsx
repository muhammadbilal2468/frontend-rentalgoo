import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Alert from "../../../components/Alert/Alert";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import CardClosestProduct from "../../../components/CardClosestProduct/CardClosestProduct";
import NotFoundPage from "../../../components/NotFoundPage/NotFoundPage";
import UserHeader from "../../../components/UserHeader/UserHeader";

const UserClosestProduct = () => {
  const [closestProducts, setClosestProducts] = useState([]);
  const [limit, setLimit] = useState(6);

  const [showAlertLocation, setShowAlertLocation] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getClosestProducts();
  }, [limit]);

  const getClosestProducts = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:5000/closestproducts?limit=${limit}`
      );
      setClosestProducts(resp.data);
      setLimit(resp.data.length);
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
      setAlertColor("#0087ff");
      setMsg(error.response.data.msg);
      console.log(error.response.data.msg);
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };

  const toggleAlertLocation = () => {
    setShowAlertLocation(!showAlertLocation);
  };

  const minLimit = (e) => {
    e.preventDefault();
    setLimit(limit - 2);
  };
  const plusLimit = (e) => {
    e.preventDefault();
    setLimit(limit + 2);
  };

  return (
    <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
      {/* Header */}
      <UserHeader title="Barang Terdekat" />

      {/* content */}
      <div className="bg-background rounded-b-lg py-5 min-h-screen px-3">
        {closestProducts.length === 0 ? (
          <NotFoundPage desc={"Belum Ada Barang Didekat Anda"} />
        ) : (
          <>
            {showAlertLocation && (
              <div
                id="alert-border-4"
                class="flex items-center gap-1 p-4 mb-4 text-yellow-800 border-t-4 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:bg-gray-800 dark:border-yellow-800"
                role="alert"
              >
                <svg
                  class="flex-shrink-0 w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div class="ml-3 text-xs font-medium">
                  Barang terdekat dideteksi antara titik lokasi pada data
                  location di{"   "}
                  <a
                    href="#"
                    class="font-semibold underline hover:no-underline"
                  >
                    profile{"   "}
                  </a>
                  setiap user .
                </div>
                <button
                  type="button"
                  class="ml-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700"
                  data-dismiss-target="#alert-border-4"
                  aria-label="Close"
                  onClick={toggleAlertLocation}
                >
                  <span class="sr-only">Dismiss</span>
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
            )}
            <div className="grid grid-cols-2 mb-5 gap-3">
              {closestProducts.map((data) => {
                return (
                  <CardClosestProduct
                    key={data.uuid}
                    data={data}
                    save={() => addSaveProduct(data)}
                    detail={getDetailProduct}
                  />
                );
              })}
            </div>
            <div className="px-3 mb-5 flex justify-center gap-5 w-full">
              {limit > 6 && (
                <button
                  onClick={minLimit}
                  className="bg-secondary text-white py-1 px-2 rounded-lg border-none text-sm"
                >
                  Lebih Sedikit
                </button>
              )}
              {closestProducts.length >= limit && (
                <button
                  onClick={plusLimit}
                  className="bg-secondary text-white py-1 px-2 rounded-lg border-none text-sm"
                >
                  Lebih Banyak
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* footer */}
      <ButtonNavigation />
      <Alert isOpen={showAlert} desc={msg} color={alertColor} />
    </div>
  );
};

export default UserClosestProduct;
