import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { modalsuccessImg } from "../../../assets";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import UserModalInfo from "../../../components/UserModalInfo/UserModalInfo";
import UserHeader from "../../../components/UserHeader/UserHeader";
import UserAvatar from "../../../components/UserAvatar/UserAvatar";
import UserRemainingTime from "../../../components/UserRemainingTime/UserRemainingTime";

const UserDetailIsRentingOut = () => {
  const [isRentingOut, setIsRentingOut] = useState("");

  const [remainingTime, setRemainingTime] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");

  const [status, setStatus] = useState("");
  const [product, setProduct] = useState("");
  const [owner, setOwner] = useState("");
  const [renter, setRenter] = useState("");

  const [showModalInfo, setShowModalInfo] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const { uuid } = useParams();

  useEffect(() => {
    getIsRentingOutById(uuid);
  }, [isRentingOut]);

  const parseRemainingTime = (remainingTime) => {
    const timeArray = remainingTime.split(" ");

    const days = parseInt(timeArray[0], 10) || 0;
    const hours = parseInt(timeArray[2], 10) || 0;
    const minutes = parseInt(timeArray[4], 10) || 0;
    const seconds = parseInt(timeArray[6], 10) || 0;

    setDay(days);
    setHour(hours);
    setMinute(minutes);
    setSecond(seconds);
  };

  const getIsRentingOutById = async (uuid) => {
    try {
      const resp = await axios.get(
        `http://localhost:5000/isrentingproducts/${uuid}`
      );
      setIsRentingOut(resp.data);
      setProduct(resp.data.product);
      setOwner(resp.data.owner);
      setRenter(resp.data.renter);

      setRemainingTime(resp.data.remaining_time);
      parseRemainingTime(resp.data.remaining_time);
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
      const resp = await axios.post(
        "http://localhost:5000/finishrentbyowner",
        requestData
      );
      setTitleModal("Berhasil");
      setMsg(resp.data.msg);
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
      await axios.post("http://localhost:5000/finishrentbyrenter", requestData);
    } catch (error) {
      console.log(error.response.message);
    }
  };

  const updateIsRentingOut = async () => {
    const requestData = {
      status: status,
    };
    try {
      const resp = await axios.patch(
        `http://localhost:5000/isrentingproducts/${isRentingOut.uuid}`,
        requestData
      );
      setTitleModal("Berhasil");
      setMsg(resp.data.msg);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const updateLeasedProduct = async () => {
    try {
      await axios.patch(`http://localhost:5000/leasedproduct/${product.uuid}`);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const deleteIsRentingOut = async (id) => {
    try {
      const resp = await axios.delete(
        `http://localhost:5000/isrentingproducts/${id}`
      );
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
        setShowModalInfo(true);
        setTimeout(() => {
          setShowModalInfo(false);
          navigate("/user/isrentingouts");
        }, 1500);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    } else {
      await createFinishRentByOwner();
      await createFinishRentByRenter();
      await updateLeasedProduct();
      await deleteIsRentingOut(isRentingOut.uuid);

      setShowModalInfo(true);
      setTimeout(() => {
        setShowModalInfo(false);
        navigate("/user/finishrentowner");
      }, 1500);
    }
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  console.log("status : ", status);

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
                    Detail Barang Disewakan
                  </p>
                </div>
                <p></p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-white rounded-lg mt-3">
            <UserAvatar
              status="Penyewa"
              name={renter.name}
              img={renter.url}
              uuid={renter.uuid}
            />
            <div className="grid grid-cols-2 gap-2 justify-between items-center">
              <p className="text-sm text-tertiary font-extrabold">
                No Hp Penyewa
              </p>
              <p className="text-sm text-end justify-end">{renter.nohp}</p>
            </div>
            <div
              className="w-full h-60 bg-cover bg-no-repeat bg-center rounded-lg border-2 border-primary"
              style={{ backgroundImage: `url(${product.url})` }}
            ></div>
            <p className="text-xl text-primary font-bold">{product.name}</p>
            <form onSubmit={handleSubmit}>
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
                  <p className="text-base font-semibold">
                    {isRentingOut.amount}
                  </p>
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
                      d="M9 3V1h6v2zm1 11.75l-1.1-2.2q-.125-.275-.375-.413T8 12H3.05q.375-3.375 2.925-5.687T12 4q1.55 0 2.975.5t2.675 1.45l1.4-1.4l1.4 1.4l-1.4 1.4q.8 1.05 1.275 2.213T20.95 12h-4.325L14.9 8.55q-.275-.575-.9-.575t-.9.575zM12 22q-3.475 0-6.025-2.312T3.05 14h4.325L9.1 17.45q.275.575.9.575t.9-.575l3.1-6.2l1.1 2.2q.125.275.375.413T16 14h4.95q-.375 3.375-2.925 5.687T12 22"
                    />
                  </svg>
                  <p className="text-base font-semibold">
                    {isRentingOut.time} {isRentingOut.time_unit}
                  </p>
                  <p className="text-[10px] text-slate-500">Jangka Sewa</p>
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

              {/* --------------- */}
              {remainingTime !== "Waktu Telah Habis" ? (
                <UserRemainingTime
                  day={day}
                  hour={hour}
                  minute={minute}
                  second={second}
                />
              ) : (
                <div className="bg-secondary w-full py-2 rounded-lg">
                  <p className="animate-pulse text-sm text-center text-white font-bold">
                    {isRentingOut.remaining_time}
                  </p>
                </div>
              )}
              {/* ---------------- */}

              <div className="flex items-start justify-between gap-10 text-sm border-b-2 py-1.5">
                <p className="text-sm text-tertiary font-extrabold">
                  Waktu Mulai
                </p>
                <p className="text-sm text-end">{isRentingOut.start_date}</p>
              </div>
              <div className="flex items-start justify-between gap-10 text-sm border-b-2 py-1.5">
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
                  <option value="Dikembalikan Tepat Waktu">
                    Dikembalikan Tepat Waktu
                  </option>
                  <option value="Telah Dikembalikan, Namun Lambat">
                    Telah Dikembalikan, Namun Lambat
                  </option>
                </select>
              </div>

              {/* -- Duplicate code -- */}
              {status === "Dikembalikan Tepat Waktu" && (
                <p className="text-xs text-yellow-500 mt-2 inline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 1024 1024"
                    className="text-yellow-300 inline"
                  >
                    <path
                      fill="currentColor"
                      d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4a51.2 51.2 0 0 0 0 102.4z"
                    />
                  </svg>{" "}
                  jika Anda mengubah barang telah diambil maka barang akan masuk
                  ke riwayat sewa barang
                </p>
              )}

              {status === "Telah Dikembalikan, Namun Lambat" && (
                <p className="text-xs text-yellow-500 mt-2 inline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 1024 1024"
                    className="text-yellow-300 inline"
                  >
                    <path
                      fill="currentColor"
                      d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4a51.2 51.2 0 0 0 0 102.4z"
                    />
                  </svg>{" "}
                  jika Anda mengubah barang telah diambil maka barang akan masuk
                  ke riwayat sewa barang
                </p>
              )}

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
        <UserModalInfo
          isOpen={showModalInfo}
          title={titleModal}
          img={modalsuccessImg}
          desc={msg}
        />
      </div>
    </>
  );
};

export default UserDetailIsRentingOut;
