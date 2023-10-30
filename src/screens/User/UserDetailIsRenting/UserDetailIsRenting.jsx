import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import LocationMap from "../../../components/LocationMap/LocationMap";
import UserHeader from "../../../components/UserHeader/UserHeader";
import UserAvatar from "../../../components/UserAvatar/UserAvatar";

const UserDetailIsRenting = () => {
  const [isRenting, setIsRenting] = useState("");
  const [product, setProduct] = useState("");
  const [owner, setOwner] = useState("");
  const [showMaps, setShowMaps] = useState(false);

  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const { uuid } = useParams();

  useEffect(() => {
    getIsRentingOutById(uuid);
  }, [isRenting]);

  // --- Get IsRentingOut By ID
  const getIsRentingOutById = async (uuid) => {
    try {
      const resp = await axios.get(
        `http://localhost:5000/isrentingproducts/${uuid}`
      );
      setIsRenting(resp.data);
      setProduct(resp.data.product);
      setOwner(resp.data.owner);
      if (resp.data.owner.location) {
        const [lat, lon] = resp.data.owner.location.split(",");
        setLatitude(lat);
        setLongitude(lon);
      }
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const toggleShowMaps = () => {
    setShowMaps(!showMaps);
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto  border-x-4 border-primary">
        {/* Header */}
        <UserHeader title="Detail Barang Disewakan" />

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
                    Detail Persetujuan Menyewakan
                  </p>
                </div>
                <p></p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-white rounded-lg ">
            <div className="bg-primary w-full py-2 rounded-lg">
              <p className="text-sm text-center text-white">
                {isRenting.remaining_time}
              </p>
            </div>
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
              <p className="text-sm text-tertiary font-extrabold">Alamat :</p>
              <p
                className="flex items-center gap-1 text-sm justify-end cursor-pointer text-tertiary font-bold"
                onClick={toggleShowMaps}
              >
                Lihat
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 512 512"
                  onClick={toggleShowMaps}
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="48"
                    d="m112 184l144 144l144-144"
                  />
                </svg>
              </p>
            </div>
            {showMaps ? (
              <>
                <p className="text-sm">
                  {owner.citydistrict}, {owner.subdistrict}, {owner.address}
                </p>
                <LocationMap
                  latitude={latitude}
                  longitude={longitude}
                  address={owner.address}
                />
              </>
            ) : (
              <div className=""></div>
            )}
            <div
              className="w-full h-60 bg-cover bg-no-repeat bg-center rounded-lg border-2 border-primary"
              style={{ backgroundImage: `url(${product.url})` }}
            ></div>
            <p className="text-xl text-primary font-bold">{product.name}</p>
            <div className="flex items-center justify-between gap-10 text-sm border-b-2 py-1.5">
              <p className="text-sm text-tertiary font-extrabold">Jaminan</p>
              <p className="text-sm text-end">{product.guarantee}</p>
            </div>
            <div className="flex items-center justify-between gap-10 text-sm border-b-2 py-1.5">
              <p className="text-sm text-tertiary font-extrabold">
                Jumlah Barang
              </p>
              <p className="text-sm text-end">{isRenting.amount}</p>
            </div>
            <div className="flex items-center justify-between gap-10 text-sm border-b-2 py-1.5">
              <p className="text-sm text-tertiary font-extrabold">Waktu</p>
              <p className="text-sm text-end">
                {isRenting.time} {isRenting.time_unit}
              </p>
            </div>
            <div className="flex items-start justify-between gap-10 text-sm border-b-2 py-1.5">
              <p className="text-sm text-tertiary font-extrabold">
                Waktu Mulai
              </p>
              <p className="text-sm text-end">{isRenting.start_date}</p>
            </div>
            <div className="flex items-start justify-between gap-10 text-sm border-b-2 py-1.5">
              <p className="text-sm text-tertiary font-extrabold">
                Waktu Berakhir
              </p>
              <p className="text-sm text-end">{isRenting.end_date}</p>
            </div>
          </div>
        </div>

        {/* footer */}
        <ButtonNavigation />
      </div>
    </>
  );
};

export default UserDetailIsRenting;
