import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import formatRupiah from "../../../utils/FormatRupiah";
import UserHeader from "../../../components/UserHeader/UserHeader";
import UserAvatar from "../../../components/UserAvatar/UserAvatar";
import API_BASE_URL from "../../../config/config";

const UserDetailProduct = () => {
  const [product, setProduct] = useState("");
  const [user, setUser] = useState("");
  const { uuid } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    const resp = await axios.get(`${API_BASE_URL}/products/${uuid}`);
    setProduct(resp.data);
    setUser(resp.data.user);
  };

  const addAgreement = () => {
    navigate(`/user/addagreement/${uuid}`);
  };

  const back = () => {
    window.history.back();
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* content */}
        <div className="flex flex-col gap-2 bg-background min-h-screen">
          <div
            className="relative w-full h-72 bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${product.url})` }}
          >
            <svg
              width="25"
              height="20"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-6 cursor-pointer"
              onClick={back}
            >
              <path
                d="M18.7119 2.10782C18.8246 1.98856 18.9127 1.84826 18.9712 1.69493C19.0297 1.54161 19.0574 1.37827 19.0528 1.21424C19.0481 1.05021 19.0112 0.888701 18.9442 0.738931C18.8771 0.589162 18.7812 0.454068 18.662 0.341361C18.5427 0.228655 18.4024 0.140543 18.2491 0.0820583C18.0957 0.0235733 17.9324 -0.0041405 17.7684 0.000499709C17.6043 0.00513992 17.4428 0.042043 17.2931 0.109102C17.1433 0.176161 17.0082 0.272063 16.8955 0.391332L6.27672 11.6347C6.05743 11.8667 5.93524 12.1738 5.93524 12.493C5.93524 12.8122 6.05743 13.1193 6.27672 13.3512L16.8955 24.5959C17.0075 24.7178 17.1425 24.8162 17.2928 24.8854C17.4432 24.9547 17.6057 24.9933 17.7711 24.9992C17.9365 25.0051 18.1014 24.978 18.2563 24.9196C18.4112 24.8612 18.5529 24.7727 18.6732 24.659C18.7935 24.5454 18.8901 24.409 18.9572 24.2578C19.0244 24.1065 19.0609 23.9434 19.0645 23.7779C19.0681 23.6125 19.0388 23.4479 18.9782 23.2939C18.9177 23.1399 18.8272 22.9994 18.7119 22.8806L8.90268 12.493L18.7119 2.10782Z"
                fill="#ffff"
              />
            </svg>
          </div>
          <div className="grid grid-cols-3 gap-6 my-4">
            <div className="flex flex-col justify-between items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9.839 18.761h5.313a1.53 1.53 0 0 0 1.527-1.528v-5.76h5.237v5.76A6.767 6.767 0 0 1 15.152 24H9.839zM14.16 5.237H8.85a1.53 1.53 0 0 0-1.53 1.527v5.761H2.085V6.764A6.763 6.763 0 0 1 8.85 0h5.31z"
                />
              </svg>
              <p className="text-base font-semibold">{product.stock}</p>
              <p className="text-[10px] text-slate-500">stok</p>
            </div>
            <div className="flex flex-col justify-between items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m10 10h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1M17 3c-2.206 0-4 1.794-4 4s1.794 4 4 4s4-1.794 4-4s-1.794-4-4-4M7 13c-2.206 0-4 1.794-4 4s1.794 4 4 4s4-1.794 4-4s-1.794-4-4-4"
                />
              </svg>
              <p className="text-base font-semibold">{product.category}</p>
              <p className="text-[10px] text-slate-500">Kategori</p>
            </div>
            <div className="flex flex-col justify-between items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M19 3H1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m-6 4h4v1h-4zm-2 7.803a2.31 2.31 0 0 0-.529-.303c-1.18-.508-2.961-1.26-2.961-2.176c0-.551.359-.371.518-1.379c.066-.418.385-.007.445-.961c0-.38-.174-.475-.174-.475s.088-.562.123-.996c.036-.453-.221-1.8-1.277-2.097c-.186-.188-.311-.111.258-.412c-1.244-.059-1.534.592-2.196 1.071c-.564.42-.717 1.085-.689 1.439c.037.433.125.996.125.996s-.175.094-.175.474c.061.954.38.543.445.961c.158 1.008.519.828.519 1.379c0 .916-1.781 1.668-2.961 2.176a2.503 2.503 0 0 0-.471.26V5h9zM18 11h-5v-1h5z"
                />
              </svg>
              <p className="text-base font-semibold">{product.guarantee}</p>
              <p className="text-[10px] text-slate-500">Jaminan</p>
            </div>
          </div>

          <div className="mx-4">
            <UserAvatar
              status="Pemilik"
              name={user.name}
              img={user.url}
              uuid={user.uuid}
            />
            <div className="flex justify-between items-center my-3">
              <div className="flex items-center gap-2 font-bold text-lg">
                <p className="text-primary font-extrabold">
                  {formatRupiah(product.price)} /
                </p>
                <p className="text-primary font-extrabold">
                  {product.time_unit}
                </p>
              </div>
              <p className="text-[10px] bg-secondary text-white font-bold px-4 py-1 rounded-lg">
                {product.leased}x disewa
              </p>
            </div>
            <p className="font-bold text-sm mt-3">Alamat</p>
            <p className="text-sm mb-3">
              {user.province}, {user.citydistrict}, {user.subdistrict},{" "}
              {user.address}
            </p>
            <hr className="mb-3" />
            <p className="font-bold text-sm">Deskripsi :</p>
            <p className="text-sm text-justify">{product.description}</p>
            <button
              className="w-full bg-primary text-white py-2 mt-5 rounded-lg"
              onClick={addAgreement}
            >
              Sewa
            </button>
          </div>
        </div>

        {/* footer */}
        <ButtonNavigation />
      </div>
    </>
  );
};

export default UserDetailProduct;
