import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import formatRupiah from "../../../utils/FormatRupiah";
import API_BASE_URL from "../../../config/config";

const AdminDetailSaveProduct = () => {
  const [product, setProduct] = useState("");
  const [owner, setOwner] = useState("");
  const [user, setUser] = useState("");

  const { uuid } = useParams();

  useEffect(() => {
    getSaveProductById(uuid);
  }, [uuid]);

  const getSaveProductById = async (uuid) => {
    try {
      const resp = await axios.get(`${API_BASE_URL}/saveproducts/${uuid}`);
      setProduct(resp.data.product);
      setOwner(resp.data.owner);
      setUser(resp.data.user);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-start items-center w-full rounded-xl p-3 gap-4 mb-8 bg-white">
        <svg
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-white bg-tertiary w-20 p-4 rounded-lg "
        >
          <path d="M7.0625 10.3438C7.0625 9.7397 7.55219 9.25001 8.15625 9.25001H21.2812C21.8853 9.25001 22.375 9.7397 22.375 10.3438C22.375 10.9478 21.8853 11.4375 21.2812 11.4375H8.15625C7.55219 11.4375 7.0625 10.9478 7.0625 10.3438Z" />
          <path d="M7.0625 14.7188C7.0625 14.1147 7.55219 13.625 8.15625 13.625H21.2812C21.8853 13.625 22.375 14.1147 22.375 14.7188C22.375 15.3228 21.8853 15.8125 21.2812 15.8125H8.15625C7.55219 15.8125 7.0625 15.3228 7.0625 14.7188Z" />
          <path d="M7.0625 19.0938C7.0625 18.4897 7.55219 18 8.15625 18H21.2812C21.8853 18 22.375 18.4897 22.375 19.0938C22.375 19.6978 21.8853 20.1875 21.2812 20.1875H8.15625C7.55219 20.1875 7.0625 19.6978 7.0625 19.0938Z" />
          <path d="M7.0625 23.4688C7.0625 22.8647 7.55219 22.375 8.15625 22.375H21.2812C21.8853 22.375 22.375 22.8647 22.375 23.4688C22.375 24.0728 21.8853 24.5625 21.2812 24.5625H8.15625C7.55219 24.5625 7.0625 24.0728 7.0625 23.4688Z" />
          <path d="M7.0625 27.8438C7.0625 27.2397 7.55219 26.75 8.15625 26.75H21.2812C21.8853 26.75 22.375 27.2397 22.375 27.8438C22.375 28.4478 21.8853 28.9375 21.2812 28.9375H8.15625C7.55219 28.9375 7.0625 28.4478 7.0625 27.8438Z" />
          <path d="M25.6562 9.25001C25.0522 9.25001 24.5625 9.7397 24.5625 10.3438C24.5625 10.9478 25.0522 11.4375 25.6562 11.4375H27.8438C28.4478 11.4375 28.9375 10.9478 28.9375 10.3438C28.9375 9.7397 28.4478 9.25001 27.8438 9.25001H25.6562Z" />
          <path d="M25.6562 13.625C25.0522 13.625 24.5625 14.1147 24.5625 14.7188C24.5625 15.3228 25.0522 15.8125 25.6562 15.8125H27.8438C28.4478 15.8125 28.9375 15.3228 28.9375 14.7188C28.9375 14.1147 28.4478 13.625 27.8438 13.625H25.6562Z" />
          <path d="M25.6562 18C25.0522 18 24.5625 18.4897 24.5625 19.0938C24.5625 19.6978 25.0522 20.1875 25.6562 20.1875H27.8438C28.4478 20.1875 28.9375 19.6978 28.9375 19.0938C28.9375 18.4897 28.4478 18 27.8438 18H25.6562Z" />
          <path d="M25.6562 22.375C25.0522 22.375 24.5625 22.8647 24.5625 23.4688C24.5625 24.0728 25.0522 24.5625 25.6562 24.5625H27.8438C28.4478 24.5625 28.9375 24.0728 28.9375 23.4688C28.9375 22.8647 28.4478 22.375 27.8438 22.375H25.6562Z" />
          <path d="M25.6562 26.75C25.0522 26.75 24.5625 27.2397 24.5625 27.8438C24.5625 28.4478 25.0522 28.9375 25.6562 28.9375H27.8438C28.4478 28.9375 28.9375 28.4478 28.9375 27.8438C28.9375 27.2397 28.4478 26.75 27.8438 26.75H25.6562Z" />
          <path d="M5.6484 1.91412C5.39979 1.66551 5.04684 1.55157 4.6998 1.60789C4.35276 1.6642 4.05395 1.88391 3.89672 2.19837L2.80297 4.38587C2.72703 4.53775 2.6875 4.70521 2.6875 4.87501V33.3125H1.59375C0.989689 33.3125 0.5 33.8022 0.5 34.4063C0.5 35.0103 0.989689 35.5 1.59375 35.5H34.4062C35.0103 35.5 35.5 35.0103 35.5 34.4063C35.5 33.8022 35.0103 33.3125 34.4062 33.3125H33.3125V4.87501C33.3125 4.70521 33.273 4.53775 33.197 4.38587L32.1033 2.19837C31.946 1.88391 31.6472 1.6642 31.3002 1.60789C30.9532 1.55157 30.6002 1.66551 30.3516 1.91412L28.9375 3.32822L27.5234 1.91412C27.0963 1.48698 26.4037 1.48698 25.9766 1.91412L24.5625 3.32822L23.1484 1.91412C22.7213 1.48698 22.0287 1.48698 21.6016 1.91412L20.1875 3.32822L18.7734 1.91412C18.3463 1.48698 17.6537 1.48698 17.2266 1.91412L15.8125 3.32822L14.3984 1.91412C13.9713 1.48698 13.2787 1.48698 12.8516 1.91412L11.4375 3.32822L10.0234 1.91412C9.59626 1.48698 8.90374 1.48698 8.4766 1.91412L7.0625 3.32822L5.6484 1.91412ZM5.17463 4.53394L6.2891 5.64841C6.71624 6.07555 7.40876 6.07555 7.8359 5.64841L9.25 4.23431L10.6641 5.64841C11.0912 6.07555 11.7838 6.07555 12.2109 5.64841L13.625 4.23431L15.0391 5.64841C15.4662 6.07555 16.1588 6.07555 16.5859 5.64841L18 4.23431L19.4141 5.64841C19.8412 6.07555 20.5338 6.07555 20.9609 5.64841L22.375 4.23431L23.7891 5.64841C24.2162 6.07555 24.9088 6.07555 25.3359 5.64841L26.75 4.23431L28.1641 5.64841C28.5912 6.07555 29.2838 6.07555 29.7109 5.64841L30.8254 4.53394L31.125 5.13321V33.3125H4.875V5.13321L5.17463 4.53394Z" />
        </svg>

        <div className="flex flex-col gap-1 justify-center">
          <h3 className="text-2xl font-bold">Detail Barang Tersimpan</h3>
          <p className="">Akses melihat data barang tersimpan pengguna</p>
        </div>
      </div>

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
                  src={user.url}
                  alt="fotouser"
                  className="w-12 h-12 rounded-full border-2 border-primary"
                />
                <div className="">
                  <p className="text-xs">Penyimpan</p>
                  <p className="font-bold">{user.name}</p>
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

            <p className="">Deskripsi</p>
            <p className="text-tertiary font-semibold border border-tirtext-tertiary p-2 rounded-lg mb-4">
              {product.description}
            </p>

            <p className="">Jaminan Penyewaan</p>
            <p className="text-tertiary font-semibold border border-tirtext-tertiary p-2 rounded-lg mb-4">
              {product.guarantee}
            </p>

            <p className="">Harga</p>
            <div className="grid grid-cols-2 gap-5">
              <p className="text-tertiary font-semibold border border-tirtext-tertiary p-2 rounded-lg mb-4">
                {formatRupiah(product.price)}
              </p>
              <p className="text-tertiary font-semibold border border-tirtext-tertiary p-2 rounded-lg mb-4">
                / {product.time_unit}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailSaveProduct;
