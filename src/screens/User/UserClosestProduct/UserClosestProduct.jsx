import axios from "axios";
import React, { useEffect, useState } from "react";
import CardClosestProduct from "../../../components/CardClosestProduct/CardClosestProduct";
import { useNavigate } from "react-router";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";

const UserClosestProduct = () => {
  const [closestProducts, setClosestProducts] = useState([]);
  const [limit, setLimit] = useState(6);

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
      await axios.post("http://localhost:5000/saveproducts", formData);
      console.log("berhasil Menyimpan");
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const minLimit = (e) => {
    e.preventDefault();
    setLimit(limit - 2);
    console.log("limit", limit);
  };
  const plusLimit = (e) => {
    e.preventDefault();
    setLimit(limit + 2);
    console.log("limit", limit);
  };

  return (
    <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
      {/* Header */}
      <div className="flex items-center gap-3  sticky top-0 bg-primary px-3 mb-5 py-2 z-50 text-white">
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
        <p className="">Barang Terdekat</p>
        <p></p>
      </div>

      {/* content */}
      <div className="bg-background rounded-b-lg pb-5 min-h-screen px-3">
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
      </div>

      {/* footer */}
      <ButtonNavigation />
    </div>
  );
};

export default UserClosestProduct;
