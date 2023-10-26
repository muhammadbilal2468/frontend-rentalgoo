import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { adminisrentingImg } from "../../../assets";
import AdminCardHeader from "../../../components/AdminCardHeader/AdminCardHeader";

const AdminIDetailIsRenting = () => {
  const [isRentingProducts, setIsRentingProducts] = useState("");
  const [product, setProduct] = useState("");
  const [owner, setOwner] = useState("");
  const [renter, setRenter] = useState("");

  const { uuid } = useParams();

  useEffect(() => {
    getIsRentingProductById(uuid);
  }, [uuid, isRentingProducts]);

  const getIsRentingProductById = async (uuid) => {
    try {
      const resp = await axios.get(
        `http://localhost:5000/isrentingproducts/${uuid}`
      );
      setIsRentingProducts(resp.data);
      setProduct(resp.data.product);
      setOwner(resp.data.owner);
      setRenter(resp.data.renter);
      console.log(resp.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  console.log("remaining_time :", isRentingProducts.remaining_time);

  return (
    <div className="flex flex-col gap-4">
      <AdminCardHeader
        img={adminisrentingImg}
        title={"Detail Sedang Sewa"}
        desc={"Akses menampilkan detail data sedang sewa"}
      />

      <div>
        <div className="grid grid-cols-5 gap-10 bg-white p-8 rounded-xl">
          <div className="col-span-2">
            <img
              src={product.url}
              alt="Preview"
              className="w-full h-64 border-2 border-tertiary border-dashed rounded-lg p-2"
            />
          </div>
          <div className="col-span-3">
            <div className="grid grid-cols-2 mb-10">
              <div className="flex gap-3 items-center">
                <img
                  src={owner.url}
                  alt="fotoowner"
                  className="w-12 h-12 rounded-full border-2 border-primary"
                />
                <div className="">
                  <p className="text-xs">Pemilik</p>
                  <p className="font-bold">{owner.name}</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <img
                  src={renter.url}
                  alt="fotorenter"
                  className="w-12 h-12 rounded-full border-2 border-primary"
                />
                <div className="">
                  <p className="text-xs">Penyewa</p>
                  <p className="font-bold">{renter.name}</p>
                </div>
              </div>
            </div>
            <p className="">Nama Barang</p>
            <div className="grid grid-cols-2 gap-5">
              <p className="text-tertiary font-semibold border border-tirtext-tertiary p-2 rounded-lg mb-4">
                {product.name}
              </p>
              <p className="text-tertiary font-semibold border border-tirtext-tertiary p-2 rounded-lg mb-4">
                {isRentingProducts.amount} Pcs
              </p>
            </div>

            <p className="">Jaminan Penyewaan</p>
            <p className="text-tertiary font-semibold border border-tirtext-tertiary p-2 rounded-lg mb-4">
              {product.guarantee}
            </p>

            <p className="">Jangka Sewa</p>
            <p className="text-tertiary font-semibold border border-tirtext-tertiary p-2 rounded-lg mb-4">
              {isRentingProducts.time} {isRentingProducts.time_unit}
            </p>

            <p className="">Waktu Mulai</p>
            <p className="text-tertiary font-semibold border border-tirtext-tertiary p-2 rounded-lg mb-4">
              {isRentingProducts.start_date}
            </p>

            <p className="">Waktu Berakhir</p>
            <p className="text-tertiary font-semibold border border-tirtext-tertiary p-2 rounded-lg mb-4">
              {isRentingProducts.end_date}
            </p>

            <p className="">Sisa Waktu</p>
            <p className="text-tertiary font-semibold border border-tirtext-tertiary p-2 rounded-lg mb-4">
              {isRentingProducts.remaining_time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminIDetailIsRenting;
