import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { adminagreementImg } from "../../../assets";
import AdminCardHeader from "../../../components/AdminCardHeader/AdminCardHeader";
import formatRupiah from "../../../utils/FormatRupiah";

const AdminDetailAgreementProducts = () => {
  const [agreementProducts, setAgreementProducts] = useState("");
  const [product, setProduct] = useState("");
  const [owner, setOwner] = useState("");
  const [renter, setRenter] = useState("");

  const { uuid } = useParams();

  useEffect(() => {
    getAgreementProductById(uuid);
  }, [uuid]);

  const getAgreementProductById = async (uuid) => {
    try {
      const resp = await axios.get(
        `http://localhost:5000/agreementproducts/${uuid}`
      );
      setAgreementProducts(resp.data);
      setProduct(resp.data.product);
      setOwner(resp.data.owner);
      setRenter(resp.data.renter);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <AdminCardHeader
        img={adminagreementImg}
        title={"Detail Persetujuan Sewa"}
        desc={"Akses melihat detail data persetujuan sewa pengguna"}
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
            <p className="text-tertiary font-semibold border border-tirtext-tertiary p-2 rounded-lg mb-4">
              {product.name}
            </p>

            <p className="">Kategori</p>
            <p className="text-tertiary font-semibold border border-tirtext-tertiary p-2 rounded-lg mb-4">
              {product.category}
            </p>

            <p className="">Jaminan Penyewaan</p>
            <p className="text-tertiary font-semibold border border-tirtext-tertiary p-2 rounded-lg mb-4">
              {product.guarantee}
            </p>

            <p className="">Jangka Sewa</p>
            <p className="text-tertiary font-semibold border border-tirtext-tertiary p-2 rounded-lg mb-4">
              {agreementProducts.time} {agreementProducts.time_unit}
            </p>

            <p className="">Status Persetujuan</p>
            <p className="text-tertiary font-semibold border border-tirtext-tertiary p-2 rounded-lg mb-4">
              {agreementProducts.status}
            </p>

            <p className="">Total Bayar</p>
            <p className="text-tertiary font-semibold border border-tirtext-tertiary p-2 rounded-lg mb-4">
              {formatRupiah(agreementProducts.total_price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailAgreementProducts;
