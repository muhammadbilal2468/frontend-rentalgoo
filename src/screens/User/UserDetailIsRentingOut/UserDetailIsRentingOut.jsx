import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";

const UserDetailIsRentingOut = () => {
  const [isRentingOut, setIsRentingOut] = useState("");
  const [status, setStatus] = useState("");
  const [product, setProduct] = useState("");
  const [owner, setOwner] = useState("");
  const [renter, setRenter] = useState("");

  const navigate = useNavigate();

  const { uuid } = useParams();

  useEffect(() => {
    getIsRentingOutById(uuid);
  }, []);

  const getIsRentingOutById = async (uuid) => {
    try {
      const resp = await axios.get(
        `https://confused-dove-overalls.cyclic.app/isrentingproducts/${uuid}`
      );
      setIsRentingOut(resp.data);
      setProduct(resp.data.product);
      setOwner(resp.data.owner);
      setRenter(resp.data.renter);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const createFinishRentByOwner = async () => {
    const requestData = {
      amount: isRentingOut.amount,
      total_price: isRentingOut.total_price,
      status: status,
      start_date: isRentingOut.start_date,
      end_date: isRentingOut.end_date,
      productId: product.id,
      ownerId: owner.id,
      renterId: renter.id,
    };
    try {
      await axios.post("https://confused-dove-overalls.cyclic.app/finishrentbyowner", requestData);
    } catch (error) {
      console.log(error.response.message);
    }
  };

  const createFinishRentByRenter = async () => {
    const requestData = {
      amount: isRentingOut.amount,
      total_price: isRentingOut.total_price,
      status: status,
      start_date: isRentingOut.start_date,
      end_date: isRentingOut.end_date,
      productId: product.id,
      ownerId: owner.id,
      renterId: renter.id,
    };
    try {
      await axios.post("https://confused-dove-overalls.cyclic.app/finishrentbyrenter", requestData);
    } catch (error) {
      console.log(error.response.message);
    }
  };

  const updateIsRentingOut = async () => {
    const requestData = {
      status: status,
    };
    try {
      await axios.patch(
        `https://confused-dove-overalls.cyclic.app/isrentingproducts/${isRentingOut.uuid}`,
        requestData
      );
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const deleteIsRentingOut = async (id) => {
    try {
      await axios.delete(`https://confused-dove-overalls.cyclic.app/isrentingproducts/${id}`);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      status === "Sedang Disewa" ||
      status === "Berakhir, Belum Dikembalikan"
    ) {
      try {
        updateIsRentingOut();
        alert("status berhasil di update");
        navigate("/user/isrentingouts");
      } catch (error) {
        console.log(error.response.data.msg);
      }
    } else {
      await createFinishRentByOwner();
      await createFinishRentByRenter();
      await deleteIsRentingOut(isRentingOut.uuid);

      alert("berhasil selesai sewa");
      navigate("/user/finishrentowners");
    }
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const getDetailUser = () => {
    navigate(`/user/detailuser/${renter.uuid}`);
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto  border-x-4 border-primary">
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
          <p className="">Detail Barang Disewakan</p>
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
                    Detail Persetujuan Menyewakan
                  </p>
                </div>
                <p></p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-white rounded-lg mx-3 p-3">
            <div className="grid grid-cols-2 gap-2 justify-between items-center">
              <p className="text-tertiary font-extrabold">Penyewa</p>
              <div
                className="flex gap-2 justify-end cursor-pointer"
                onClick={getDetailUser}
              >
                <p>{renter.name}</p>
                <img src={renter.url} className="w-6 h-6 rounded-full" alt="" />
              </div>
              <p className="text-sm text-tertiary font-extrabold">
                No Hp Penyewa
              </p>
              <p className="text-sm text-end justify-end">{renter.nohp}</p>
            </div>
            <img src={product.url} alt="" className="rounded-lg mb-3" />
            <p className="text-xl text-primary font-bold">{product.name}</p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-2 justify-between w-full">
                <p className="text-sm text-tertiary font-extrabold">Jaminan</p>
                <p className="text-sm text-end">{product.guarantee}</p>
                <p className="text-sm text-tertiary font-extrabold">
                  Jumlah Barang
                </p>
                <p className="text-sm text-end">{isRentingOut.amount}</p>
                <p className="text-sm text-tertiary font-extrabold">Waktu</p>
                <p className="text-sm text-end">
                  {isRentingOut.time} {isRentingOut.time_unit}
                </p>
                <p className="text-sm text-tertiary font-extrabold">
                  Waktu Mulai
                </p>
                <p className="text-sm text-end">{isRentingOut.start_date}</p>
                <p className="text-sm text-tertiary font-extrabold">
                  Waktu Berakhir
                </p>
                <p className="text-sm text-end">{isRentingOut.end_date}</p>
              </div>
              <p className="text-sm text-tertiary font-extrabold my-2">
                Status Pengembalian
              </p>
              <div className="input-box-status">
                <select
                  name="status"
                  onChange={handleStatus}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-md block w-full py-2 px-2"
                >
                  <option hidden>{isRentingOut.status}</option>
                  <option value="Sedang Disewa">Sedang Disewa</option>
                  <option value="Berakhir, Belum Dikembalikan">
                    Berakhir, Belum Dikembalikan
                  </option>
                  <option value="Telah Dikembalikan, Namun Lambat">
                    Telah Dikembalikan, Namun Lambat
                  </option>
                  <option value="Telah Dikembalikan">
                    Dikembalikan Tepat Waktu
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="text-white bg-primary rounded-md text-sm w-full mt-6 p-2"
              >
                Simpan
              </button>
            </form>
          </div>
        </div>

        {/* footer */}
        <ButtonNavigation />
      </div>
    </>
  );
};

export default UserDetailIsRentingOut;
