import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import formatRupiah from "../../../utils/FormatRupiah";

const UserDetailProduct = () => {
  const [product, setProduct] = useState("");
  const [user, setUser] = useState("");
  const { uuid } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    const resp = await axios.get(`https://confused-dove-overalls.cyclic.app/products/${uuid}`);
    setProduct(resp.data);
    setUser(resp.data.user);
  };

  const addAgreement = () => {
    navigate(`/user/addagreement/${uuid}`);
  };

  const getDetailUser = () => {
    navigate(`/user/detailuser/${user.uuid}`);
  };

  console.log(product.id);

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
          <p className="">Detail Barang</p>
          <p></p>
        </div>

        {/* content */}
        <div className="flex flex-col gap-3 bg-background rounded-b-lg py-5 min-h-screen px-5">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={getDetailUser}
          >
            <img
              src={user.url}
              alt=""
              className="w-9 h-9 rounded-full border-2 border-primary"
            />
            <p className=" font-semibold">{user.name}</p>
          </div>
          <img
            src={product.url}
            alt=""
            className="w-full rounded-lg border-2 border-primary"
          />
          <div className="flex items-center gap-2 font-bold text-lg">
            <p className="text-primary font-extrabold">
              {formatRupiah(product.price)} /
            </p>
            <p className="text-primary font-extrabold">{product.time_unit}</p>
          </div>
          <div className="flex items-start justify-between gap-20 text-sm border-b-2 pb-2">
            <p className="text-tertiary font-bold">Alamat</p>
            <p className="text-end">
              {user.province}, {user.citydistrict}, {user.subdistrict},{" "}
              {user.address}
            </p>
          </div>
          <div className="flex items-start justify-between gap-12 text-sm border-b-2 pb-2">
            <p className="text-tertiary font-bold">Stok :</p>
            <p>{product.stock}</p>
          </div>
          <div className="flex items-start justify-between gap-12 text-sm border-b-2 pb-2">
            <p className="text-tertiary font-bold">Kategori :</p>
            <p>{product.category}</p>
          </div>
          <div className="flex items-start justify-between gap-12 text-sm border-b-2 pb-2">
            <p className="text-tertiary font-bold">jaminan :</p>
            <p>{product.guarantee}</p>
          </div>
          <p className="text-tertiary font-bold text-sm">Deskripsi :</p>
          <p className="text-sm text-justify">{product.description}</p>
          <button
            className="w-full bg-primary text-white py-2 rounded-lg"
            onClick={addAgreement}
          >
            Sewa
          </button>
        </div>

        {/* footer */}
        <ButtonNavigation />
      </div>
    </>
  );
};

export default UserDetailProduct;
