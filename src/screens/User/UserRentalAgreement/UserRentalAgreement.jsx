import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import NotFoundPage from "../../../components/NotFoundPage/NotFoundPage";
import formatRupiah from "../../../utils/FormatRupiah";
import UserHeader from "../../../components/UserHeader/UserHeader";
import UserCardHeader from "../../../components/UserCardHeader/UserCardHeader";

const UserRentalAgreement = () => {
  const [rentalAgreements, setRentalAgreements] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getLeaseAgreements();
  }, []);

  const getLeaseAgreements = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:5000/renteragreementproducts`
      );
      setRentalAgreements(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getDetailLeaseAgreement = (uuid) => {
    navigate(`/user/detailrentalagreement/${uuid}`);
  };
  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <UserHeader title="Persetujuan Menyewa" />

        {/* content */}
        <div className="bg-background rounded-b-lg pb-5 min-h-screen">
          {rentalAgreements.length === 0 ? (
            <NotFoundPage desc={"Belum Ada Permintaan Menyewa"} />
          ) : (
            <>
              <UserCardHeader
                count={rentalAgreements.length}
                title="Persetujuan Menyewa"
              />

              <ul className="flex flex-col gap-5 w-full px-4">
                {rentalAgreements.map((data) => {
                  return (
                    <li
                      className="bg-white w-full p-3 rounded-lg border-4 border-b-tertiary cursor-pointer"
                      key={data.uuid}
                      onClick={() => getDetailLeaseAgreement(data.uuid)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 border-2 border-tertiary rounded-lg"
                            src={data.product.url}
                            alt="Neil image"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate dark:text-white">
                            {data.product.name}
                          </p>
                          <p className="text-xs font-medium">
                            {data.owner.name}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 items-center">
                          <p className="text-base font-semibold text-primary self-end">
                            {formatRupiah(data.total_price)}
                          </p>
                          <p className="text-[9px] text-white py-1 px-3 bg-tertiary rounded-md">
                            {data.status}
                          </p>
                        </div>
                      </div>
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

export default UserRentalAgreement;
