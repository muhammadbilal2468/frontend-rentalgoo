import React, { useEffect, useState } from "react";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import { useNavigate } from "react-router";
import axios from "axios";
import formatRupiah from "../../../utils/FormatRupiah";

const UserRentalAgreement = () => {
  const [renterAgreements, gsetLeaseAgreements] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getLeaseAgreements();
  }, []);

  const getLeaseAgreements = async () => {
    try {
      const resp = await axios.get(
        `https://confused-dove-overalls.cyclic.app/renteragreementproducts`
      );
      gsetLeaseAgreements(resp.data);
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
        <div className="flex items-center gap-3  sticky top-0 bg-primary px-3 mb-5 py-2 z-50 text-white">
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
          <p className="">Persetujuan Menyewa</p>
          <p></p>
        </div>

        {/* content */}
        <div className="bg-background rounded-b-lg pb-5 min-h-screen">
          <div className="bg-white rounded-lg overflow-hidden shadow-md bg-white-50 mb-5 mx-3 my-3 border-b-4 border-b-primary">
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
                    {renterAgreements.length} Persetujuan Menyewakan
                  </p>
                </div>
                <p></p>
              </div>
            </div>
          </div>

          <ul className="flex flex-col gap-5 w-full px-4">
            {renterAgreements.map((data) => {
              return (
                <li
                  className="bg-white w-full p-3 rounded-lg border-2 border-tertiary cursor-pointer"
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
                      <p className="text-xs font-medium">{data.owner.name}</p>
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
        </div>

        {/* footer */}
        <ButtonNavigation />
      </div>
    </>
  );
};

export default UserRentalAgreement;
