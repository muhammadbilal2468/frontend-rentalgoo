import React, { useEffect, useState } from "react";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import formatRupiah from "../../../utils/FormatRupiah";

const UserAddAgreement = () => {
  const [product, setProduct] = useState("");
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState(1);
  const [time, setTime] = useState(1);
  const [timeUnit, setTimeUnit] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [status] = useState("Menunggu Persetujuan");
  const [productId, setProductId] = useState("");
  const [ownerId, setOwnerId] = useState("");

  const navigate = useNavigate();
  const { uuid } = useParams();

  useEffect(() => {
    getProductsById();
  }, [totalPrice]);

  const getProductsById = async () => {
    const resp = await axios.get(`https://confused-dove-overalls.cyclic.app/products/${uuid}`);
    setProduct(resp.data);
    setProductId(resp.data.id);
    setOwnerId(resp.data.user.id);
    setUser(resp.data.user);
    setTimeUnit(resp.data.time_unit);
  };

  const createAgreementProducts = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("time", time);
    formData.append("time_unit", timeUnit);
    formData.append("total_price", totalPrice);
    formData.append("status", status);
    formData.append("productId", productId);
    formData.append("ownerId", ownerId);
    try {
      const resp = await axios.post(
        "https://confused-dove-overalls.cyclic.app/agreementproducts",
        formData
      );
      alert("berhasil");
      navigate("/user/products");
    } catch (error) {
      console.log(error.data.response.msg);
      alert(error.response.data.msg);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = Math.max(1, parseInt(value)); // Membatasi input menjadi angka positif atau 0

    if (name === "amount") {
      setAmount(newValue);
      const newPrice = calculateTotalPrice(newValue, time, timeUnit);
      setTotalPrice(newPrice);
    } else if (name === "time") {
      setTime(newValue);
      const newPrice = calculateTotalPrice(amount, newValue, timeUnit);
      setTotalPrice(newPrice);
    } else if (name === "timeUnit") {
      setTimeUnit(value);
      const newPrice = calculateTotalPrice(amount, time, value);
      setTotalPrice(newPrice);
    }
  };

  const calculateTotalPrice = (amount, time, timeUnit) => {
    let totalPrice = 0;
    if (product.time_unit === "Hari") {
      if (timeUnit === "Jam") {
        totalPrice = (amount * time * product.price) / 24;
      } else if (timeUnit === "Hari") {
        totalPrice = amount * time * product.price;
      }
    }
    if (product.time_unit === "Jam") {
      if (timeUnit === "Jam") {
        totalPrice = amount * time * product.price;
      } else if (timeUnit === "Hari") {
        totalPrice = amount * time * product.price;
        totalPrice *= 24;
      }
    }

    return totalPrice.toFixed(0);
  };

  const getDetailUser = () => {
    navigate(`/user/detailuser/${user.uuid}`);
  };

  const minAmount = (e) => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };
  const plusAmount = (e) => {
    e.preventDefault();
    setAmount(amount + 1);
  };

  const minTime = (e) => {
    e.preventDefault();
    if (time > 0) {
      setTime(time - 1);
    }
  };
  const plusTime = (e) => {
    e.preventDefault();
    setTime(time + 1);
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <div className="flex items-center gap-3  sticky top-0 bg-primary px-3 py-2 z-50 text-white">
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
          <p className="">Detail Barang</p>
          <p></p>
        </div>

        {/* content */}
        <div className="bg-background rounded-b-lg py-5 min-h-screen px-5">
          <form onSubmit={createAgreementProducts}>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2" onClick={getDetailUser}>
                <img
                  src={user.url}
                  alt=""
                  className="w-9 h-9 rounded-full border-2 border-primary"
                />
                <p>{user.name}</p>
              </div>
              <img
                src={product.url}
                alt=""
                className="w-full rounded-lg border-2 border-primary"
              />
              <div className="">
                <p className="text-primary font-bold text-lg">{product.name}</p>
                <p className="text-tertiary font-bold">
                  {formatRupiah(product.price)} / {product.time_unit}
                </p>
              </div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-tertiary dark:text-white"
              >
                Jumlah Barang
              </label>
              <div className="relative flex">
                <div
                  className="absolute inset-y-0 left-0 flex items-center pl-3.5 cursor-pointer"
                  onClick={minAmount}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="text-tertiary"
                  >
                    <path
                      fill="currentColor"
                      d="M18 12.998H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2z"
                    />
                  </svg>
                </div>
                <input
                  type="number"
                  min={0}
                  id="amount"
                  name="amount"
                  className="bg-gray-50 border border-tertiary text-tertiary text-sm rounded-lg block w-full p-2.5 text-center"
                  placeholder="masukkan angka"
                  value={amount}
                  onChange={handleChange}
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 cursor-pointer"
                  onClick={plusAmount}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="text-tertiary"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 5v14m-7-7h14"
                    />
                  </svg>
                </div>
              </div>

              <label
                htmlFor="time"
                className="block text-sm font-medium text-tertiary dark:text-white"
              >
                Jumlah Waktu / Satuan Waktu
              </label>
              <div className="grid grid-cols-3 gap-3 items-center">
                <div className="col-span-2 relative flex">
                  <div
                    className="absolute inset-y-0 left-0 flex items-center pl-3.5 cursor-pointer"
                    onClick={minTime}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="text-tertiary"
                    >
                      <path
                        fill="currentColor"
                        d="M18 12.998H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="number"
                    min={0}
                    id="time"
                    name="time"
                    className="bg-gray-50 border border-tertiary text-tertiary text-sm rounded-lg block w-full p-2.5 text-center"
                    placeholder="masukkan angka"
                    value={time}
                    onChange={handleChange}
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 cursor-pointer"
                    onClick={plusTime}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="text-tertiary"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 5v14m-7-7h14"
                      />
                    </svg>
                  </div>
                </div>

                <select
                  name="timeUnit"
                  className="col-span-1 bg-gray-50 border border-tertiary text-sm rounded-lg block w-full p-2.5"
                  defaultValue={""}
                  onChange={((e) => setTimeUnit(e.target.value), handleChange)}
                  required
                >
                  <option value="" disabled hidden>
                    / Waktu
                  </option>
                  <option value="Jam">/ Jam</option>
                  <option value="Hari">/ Hari</option>
                </select>
              </div>
              <div className="">
                <p>Total Bayar</p>
                <p className="font-bold text-tertiary text-xl">
                  {formatRupiah(totalPrice === "" ? "0" : totalPrice)}
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg"
              >
                Sewa
              </button>
            </div>
          </form>
        </div>

        {/* footer */}
        <ButtonNavigation />
      </div>
    </>
  );
};

export default UserAddAgreement;
