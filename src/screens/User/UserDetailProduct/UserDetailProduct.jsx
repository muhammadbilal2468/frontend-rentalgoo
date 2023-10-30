import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import formatRupiah from "../../../utils/FormatRupiah";
import UserHeader from "../../../components/UserHeader/UserHeader";
import UserAvatar from "../../../components/UserAvatar/UserAvatar";

const UserDetailProduct = () => {
  const [product, setProduct] = useState("");
  const [user, setUser] = useState("");
  const { uuid } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    const resp = await axios.get(`http://localhost:5000/products/${uuid}`);
    setProduct(resp.data);
    setUser(resp.data.user);
  };

  const addAgreement = () => {
    navigate(`/user/addagreement/${uuid}`);
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <UserHeader title="Detail Barang" />

        {/* content */}
        <div className="flex flex-col gap-2 bg-background rounded-b-lg py-4 min-h-screen mx-4">
          <UserAvatar
            status="Pemilik"
            name={user.name}
            img={user.url}
            uuid={user.uuid}
          />
          <div
            className="w-full h-60 bg-cover bg-no-repeat bg-center rounded-lg border-2 border-primary"
            style={{ backgroundImage: `url(${product.url})` }}
          ></div>
          <div className="flex items-center gap-2 font-bold text-lg">
            <p className="text-primary font-extrabold">
              {formatRupiah(product.price)} /
            </p>
            <p className="text-primary font-extrabold">{product.time_unit}</p>
          </div>
          <p className="text-sm text-secondary font-bold">
            {product.leased}x disewa
          </p>
          <div className="flex items-start justify-between gap-20 text-sm border-b-2 py-1.5">
            <p className="text-tertiary font-bold">Alamat</p>
            <p className="text-end">
              {user.province}, {user.citydistrict}, {user.subdistrict},{" "}
              {user.address}
            </p>
          </div>
          <div className="flex items-center justify-between gap-20 text-sm border-b-2 py-1.5">
            <p className="text-tertiary font-bold">Stok :</p>
            <p>{product.stock}</p>
          </div>
          <div className="flex items-center justify-between gap-20 text-sm border-b-2 py-1.5">
            <p className="text-tertiary font-bold">Kategori :</p>
            <p>{product.category}</p>
          </div>
          <div className="flex items-center justify-between gap-20 text-sm border-b-2 py-1.5">
            <p className="text-tertiary font-bold">jaminan :</p>
            <p>{product.guarantee}</p>
          </div>
          <p className="text-tertiary font-bold text-sm">Deskripsi :</p>
          <p className="text-sm text-justify">{product.description}</p>
          <button
            className="w-full bg-primary text-white py-2 mt-5 rounded-lg"
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
