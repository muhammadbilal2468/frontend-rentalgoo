import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { modalsuccessImg } from "../../../assets";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import UserAvatar from "../../../components/UserAvatar/UserAvatar";
import UserHeader from "../../../components/UserHeader/UserHeader";
import ModalInfo from "../../../components/UserModalInfo/UserModalInfo";
import API_BASE_URL from "../../../config/config";
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

  const [showModalInfo, setShowModalInfo] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const { uuid } = useParams();

  useEffect(() => {
    getProductsById();
  }, [totalPrice]);

  const getProductsById = async () => {
    const resp = await axios.get(`${API_BASE_URL}/products/${uuid}`);
    setProduct(resp.data);
    setProductId(resp.data.id);
    setOwnerId(resp.data.user.id);
    setUser(resp.data.user);
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
        `${API_BASE_URL}/agreementproducts`,
        formData
      );
      setTitleModal("Berhasil Menyewa");
      setMsg(resp.data.msg);
      setShowModalInfo(true);
      setTimeout(() => {
        setShowModalInfo(false);
        navigate("/user/rentalagreements");
      }, 1500);
    } catch (error) {
      console.log(error.data.response.msg);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = Math.max(1, parseInt(value));

    if (isNaN(newValue) || newValue < 1) {
      newValue = "";
    }

    if (name === "amount") {
      const maxAmount = product.stock;
      if (newValue > maxAmount) {
        newValue = "";
      }
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

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <UserHeader title="Sewa Barang" />

        {/* content */}
        <div className="bg-background rounded-b-lg py-5 min-h-screen px-5">
          <form onSubmit={createAgreementProducts}>
            <div className="flex flex-col gap-3">
              <UserAvatar
                status="Pemilik"
                name={user.name}
                img={user.url}
                uuid={user.uuid}
              />
              <div
                className="w-full h-60 bg-cover bg-no-repeat bg-center rounded-lg border-2 border-primary"
                style={{ backgroundImage: `url(${product.url})` }}
              ></div>
              <div className="border-b-2 pb-2">
                <div className="flex justify-between items-center">
                  <div className="">
                    <p className="text-primary font-bold text-lg">
                      {product.name}
                    </p>
                    <p className="text-tertiary font-bold">
                      {formatRupiah(product.price)} / {product.time_unit}
                    </p>
                  </div>
                  <div className="flex flex-col items-center bg-secondary text-white py-1 px-2 rounded-md">
                    <p className="font-semibold">{product.stock}</p>
                    <p className="text-[10px]">stok</p>
                  </div>
                </div>
              </div>
              <label
                htmlFor="amount"
                className="block text-sm font-bold dark:text-white"
              >
                Jumlah Barang
              </label>
              <div className="relative flex">
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  className="bg-gray-50 border-2 border-tertiary text-tertiary text-sm rounded-lg block w-full p-2.5 text-center"
                  placeholder="masukkan angka"
                  value={amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <label
                htmlFor="time"
                className="block text-sm font-bold dark:text-white"
              >
                Jumlah Waktu / Satuan Waktu
              </label>
              <div className="grid grid-cols-3 gap-3 items-center border-b-2 pb-4">
                <div className="col-span-2 relative flex">
                  <input
                    type="text"
                    id="time"
                    name="time"
                    className="bg-gray-50 border-2 border-tertiary text-tertiary text-sm font-extrabold rounded-lg block w-full p-2.5 text-center"
                    placeholder="masukkan angka"
                    value={time}
                    onChange={handleChange}
                    required
                  />
                </div>

                <select
                  name="timeUnit"
                  className="col-span-1 bg-gray-50 border-2 border-tertiary text-sm rounded-lg block w-full p-2.5"
                  defaultValue={""}
                  onChange={(e) => {
                    setTimeUnit(e.target.value);
                    handleChange(e);
                  }}
                  required
                >
                  <option value="" disabled hidden>
                    / Waktu
                  </option>
                  <option value="Jam">/ Jam</option>
                  <option value="Hari">/ Hari</option>
                </select>
              </div>
              <div className="flex flex-col justify-center items-center my-5">
                <p className="text-sm font-bold">Total Bayar : </p>
                <p className="font-bold text-secondary text-2xl">
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
        <ModalInfo
          isOpen={showModalInfo}
          title={titleModal}
          img={modalsuccessImg}
          desc={msg}
        />
      </div>
    </>
  );
};

export default UserAddAgreement;
