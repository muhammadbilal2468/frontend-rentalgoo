import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import NotFoundPage from "../../../components/NotFoundPage/NotFoundPage";
import UserHeader from "../../../components/UserHeader/UserHeader";
import UserCardHeader from "../../../components/UserCardHeader/UserCardHeader";

const UserIsRenting = () => {
  const [isRentings, setIsRentings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getIsRentingOuts();
  }, []);

  const getIsRentingOuts = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:5000/isrentingproductsbyrenter`
      );
      setIsRentings(resp.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getDetail = (uuid) => {
    navigate(`/user/detailisrenting/${uuid}`);
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <UserHeader title="Sedang Menyewa" />

        {/* content */}
        <div className="bg-background rounded-b-lg pb-5 min-h-screen ove">
          {isRentings.length === 0 ? (
            <NotFoundPage desc={"Belum Ada Barang Sedang Disewa"} />
          ) : (
            <>
              <UserCardHeader
                count={isRentings.length}
                title="Barang Sedang Disewa"
              />

              <ul className="flex flex-col gap-2 w-full px-4">
                {isRentings.map((data) => {
                  return (
                    <li
                      className="flex gap-2 justify-between bg-white w-full p-3 rounded-lg border-4 border-b-primary cursor-pointer"
                      key={data.uuid}
                      onClick={() => getDetail(data.uuid)}
                    >
                      <div className="flex flex-col gap-2">
                        <p className="text-lg text-primary font-bold">
                          {data.product.name}
                        </p>
                        <div className="flex gap-2 items-center">
                          <img
                            src={data.owner.url}
                            className="w-5 h-5 rounded-full"
                            alt="fotoowner"
                          />
                          <p className="text-xs font-bold">{data.owner.name}</p>
                        </div>
                        <div className="">
                          <p className="text-xs text-primary font-bold">
                            Waktu Mulai :
                          </p>
                          <p className="text-xs mb-2">{data.start_date}</p>
                          <p className="text-xs text-primary font-bold">
                            Waktu Berakhir :
                          </p>
                          <p className="text-xs">{data.end_date}</p>
                        </div>
                      </div>
                      <img
                        src={data.product.url}
                        className="w-1/2 h-32 rounded-md"
                        alt="fotoproduk"
                      />
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>

        {/* footer */}
        <ButtonNavigation />
      </div>
    </>
  );
};

export default UserIsRenting;
