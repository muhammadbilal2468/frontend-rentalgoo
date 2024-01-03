import React, { useEffect, useState } from "react";
import UserHeader from "../../../components/UserHeader/UserHeader";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import UserAvatar from "../../../components/UserAvatar/UserAvatar";
import formatRupiah from "../../../utils/FormatRupiah";

const UserDetailFinishRentRenter = () => {
  const [finishRent, setFinishRent] = useState("");
  const [product, setProduct] = useState("");
  const [owner, setOwner] = useState("");

  const navigate = useNavigate();

  const { uuid } = useParams();

  useEffect(() => {
    getFinishRentById(uuid);
  }, []);

  const getFinishRentById = async (uuid) => {
    try {
      const resp = await axios.get(
        `http://localhost:5000/finishrentbyrenter/${uuid}`
      );
      setFinishRent(resp.data);
      setProduct(resp.data.product);
      setOwner(resp.data.owner);
    } catch (error) {
      console.log(error.response.data.msg);
      navigate("/user/finishrentrenter");
    }
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <UserHeader title="Riwayat Menyewa" />

        {/* content */}
        <div className="bg-background rounded-b-lg pb-5 min-h-screen px-4">
          <div className="bg-white rounded-lg overflow-hidden shadow-md bg-white-50 mb-5 my-3 border-b-4 border-b-primary">
            <div className="p-3">
              <div className="flex items-center">
                <div className="mr-4 bg-primary rounded-xl p-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 36 36"
                    fill="#FFFFFF"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0.5 1.66667C0.5 1.02233 1.02233 0.5 1.66667 0.5H5.16667C5.70201 0.5 6.16866 0.864347 6.2985 1.38371L7.24424 5.16667H34.3333C34.6804 5.16667 35.0094 5.32119 35.2311 5.58826C35.4527 5.85533 35.544 6.20722 35.48 6.54834L31.98 25.215C31.8766 25.7668 31.3947 26.1667 30.8333 26.1667H28.5H12.1667H9.83333C9.27192 26.1667 8.79011 25.7668 8.68665 25.215L5.19306 6.58254L4.25576 2.83333H1.66667C1.02233 2.83333 0.5 2.311 0.5 1.66667ZM7.73908 7.5L10.8016 23.8333H29.8651L32.9276 7.5H7.73908ZM12.1667 26.1667C9.58934 26.1667 7.5 28.256 7.5 30.8333C7.5 33.4107 9.58934 35.5 12.1667 35.5C14.744 35.5 16.8333 33.4107 16.8333 30.8333C16.8333 28.256 14.744 26.1667 12.1667 26.1667ZM28.5 26.1667C25.9227 26.1667 23.8333 28.256 23.8333 30.8333C23.8333 33.4107 25.9227 35.5 28.5 35.5C31.0773 35.5 33.1667 33.4107 33.1667 30.8333C33.1667 28.256 31.0773 26.1667 28.5 26.1667ZM12.1667 28.5C13.4553 28.5 14.5 29.5447 14.5 30.8333C14.5 32.122 13.4553 33.1667 12.1667 33.1667C10.878 33.1667 9.83333 32.122 9.83333 30.8333C9.83333 29.5447 10.878 28.5 12.1667 28.5ZM28.5 28.5C29.7887 28.5 30.8333 29.5447 30.8333 30.8333C30.8333 32.122 29.7887 33.1667 28.5 33.1667C27.2113 33.1667 26.1667 32.122 26.1667 30.8333C26.1667 29.5447 27.2113 28.5 28.5 28.5Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">
                    Detail Riwayat Menyewa
                  </p>
                </div>
                <p></p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-white rounded-lg ">
            <UserAvatar
              status="Pemilik"
              name={owner.name}
              img={owner.url}
              uuid={owner.uuid}
            />
            <div className="grid grid-cols-2 gap-2 justify-between items-center">
              <p className="text-sm text-tertiary font-extrabold">
                No Hp Pemilik
              </p>
              <p className="text-sm text-end justify-end">{owner.nohp}</p>
            </div>
            <div
              className="w-full h-60 bg-cover bg-no-repeat bg-center rounded-lg border-2 border-primary"
              style={{ backgroundImage: `url(${product.url})` }}
            ></div>
            <p className="text-xl text-primary font-bold">{product.name}</p>
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
                    d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m0 2v12h7V6zm16 12V6h-1.24c.24.54.19 1.07.19 1.13c-.07.67-.54 1.37-.71 1.62l-2.33 2.55l3.32-.02l.01 1.22l-5.2-.03l-.04-1s3.05-3.23 3.2-3.52c.14-.28.71-1.95-.7-1.95c-1.23.05-1.09 1.3-1.09 1.3l-1.54.01s.01-.66.38-1.31H13v12h2.58l-.01-.86l.97-.01s.91-.16.92-1.05c.04-1-.81-1-.96-1c-.13 0-1.07.05-1.07.87h-1.52s.04-2.06 2.59-2.06c2.6 0 2.46 2.02 2.46 2.02s.04 1.25-1.11 1.72l.52.37zM8.92 16h-1.5v-5.8l-1.8.56V9.53l3.14-1.12h.16z"
                  />
                </svg>
                <p className="text-base font-semibold">{finishRent.amount}</p>
                <p className="text-[10px] text-slate-500">Jumlah Barang</p>
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
                    fill-rule="evenodd"
                    d="m16.137 4.728l1.83 1.83C20.656 9.248 22 10.592 22 12.262c0 1.671-1.344 3.015-4.033 5.704c-2.69 2.69-4.034 4.034-5.705 4.034c-1.67 0-3.015-1.344-5.704-4.033l-1.83-1.83c-1.545-1.546-2.318-2.318-2.605-3.321c-.288-1.003-.042-2.068.45-4.197l.283-1.228c.413-1.792.62-2.688 1.233-3.302c.614-.613 1.51-.82 3.302-1.233l1.228-.284c2.13-.491 3.194-.737 4.197-.45c1.003.288 1.775 1.061 3.32 2.606m-4.99 9.6c-.673-.672-.668-1.638-.265-2.403a.75.75 0 0 1 1.04-1.046c.34-.18.713-.276 1.085-.272a.75.75 0 0 1-.014 1.5a.88.88 0 0 0-.609.277c-.387.387-.286.775-.177.884c.11.109.497.21.884-.177c.784-.784 2.138-1.044 3.005-.177c.673.673.668 1.639.265 2.404a.75.75 0 0 1-1.04 1.045a2.201 2.201 0 0 1-1.472.232a.75.75 0 1 1 .302-1.47c.177.037.463-.021.708-.266c.387-.388.286-.775.177-.884c-.11-.109-.497-.21-.884.177c-.784.784-2.138 1.044-3.005.176m-1.126-4.035a2 2 0 1 0-2.829-2.828a2 2 0 0 0 2.829 2.828"
                    clip-rule="evenodd"
                  />
                </svg>
                <p className="text-base font-semibold">
                  {formatRupiah(finishRent.total_price)}
                </p>
                <p className="text-[10px] text-slate-500">Total Bayar</p>
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
            <div className="bg-primary w-full py-2 rounded-lg">
              <p className="animate-pulse text-sm text-center text-white font-bold">
                {finishRent.status}
              </p>
            </div>
            <div className="flex items-start justify-between gap-10 text-sm border-b-2 py-1.5">
              <p className="text-sm text-tertiary font-extrabold">
                Waktu Mulai
              </p>
              <p className="text-sm text-end">{finishRent.start_date}</p>
            </div>
            <div className="flex items-start justify-between gap-10 text-sm border-b-2 py-1.5">
              <p className="text-sm text-tertiary font-extrabold">
                Waktu Berakhir
              </p>
              <p className="text-sm text-end">{finishRent.end_date}</p>
            </div>
          </div>
        </div>

        {/* footer */}
        <ButtonNavigation />
      </div>
    </>
  );
};

export default UserDetailFinishRentRenter;
