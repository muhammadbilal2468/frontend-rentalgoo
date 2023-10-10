import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { MeUser } from "../../../features/authSlice";
import axios from "axios";
import {
  aksesorisImg,
  bukuImg,
  elektronikImg,
  kesehatanImg,
  logoImg,
  olahragaImg,
  outdoorImg,
  pakaianImg,
  peralatanImg,
  souvenirImg,
  transportasiImg,
} from "../../../assets";
import CardProduct from "../../../components/CardProduct/CardProduct";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import CardClosestProduct from "../../../components/CardClosestProduct/CardClosestProduct";
import { Link } from "react-router-dom";

const UserHome = () => {
  const [products, setProducts] = useState([]);
  const [closestProducts, setClosestProducts] = useState([]);
  const [limit, setLimit] = useState(2);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(MeUser());
    getProducts();
    getClosestProducts();
    if (isError) {
      navigate("/auth/login");
    }
  }, [dispatch, isError, navigate, limit]);

  const getProducts = async () => {
    try {
      const resp = await axios.get(
        `https://confused-dove-overalls.cyclic.app/products?limit=${limit}`,
        {
          withCredentials: true, // Set withCredentials ke 'true'
        }
      );
      setProducts(resp.data.products);
      console.log(products);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getClosestProducts = async () => {
    try {
      const resp = await axios.get(
        `https://confused-dove-overalls.cyclic.app/closestproducts`,
        {
          withCredentials: true, // Set withCredentials ke 'true'
        }
      );
      setClosestProducts(resp.data);
      console.log("closestProducts", closestProducts);
    } catch (error) {
      console.log(error.response);
    }
  };

  const refreshClosestProducts = async () => {
    getClosestProducts();
  };

  const getDetailProduct = (uuid) => {
    navigate(`/user/detailproduct/${uuid}`);
  };

  const addSaveProduct = async (data) => {
    const formData = new FormData();
    formData.append("productId", data.id);
    formData.append("ownerId", data.user.id);
    try {
      await axios.post(
        "https://confused-dove-overalls.cyclic.app/saveproducts",
        {
          withCredentials: true, // Set withCredentials ke 'true'
        },
        formData
      );
      console.log("berhasil Menyimpan");
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const handleSearch = async (e) => {
    navigate("/user/search");
  };

  const handleAccessories = () => {
    handleCategory("Aksesoris");
  };
  const handleBook = () => {
    handleCategory("Buku");
  };
  const handleElectronic = () => {
    handleCategory("Elektronik");
  };
  const handleHealth = () => {
    handleCategory("Kesehatan");
  };
  const handleSport = () => {
    handleCategory("Olahraga");
  };
  const handleOutdoor = () => {
    handleCategory("Outdoor");
  };
  const handleClothes = () => {
    handleCategory("Pakaian");
  };
  const handleEquipment = () => {
    handleCategory("Peralatan");
  };
  const handleSouvenir = () => {
    handleCategory("Souvenir");
  };
  const handleTransportation = () => {
    handleCategory("Transportasi");
  };

  const handleCategory = (category) => {
    navigate(`/user/products?category=${category}`);
  };

  const handleClosest = (closest) => {
    navigate(`/user/products?closest=${closest}`);
  };

  const minLimit = (e) => {
    e.preventDefault();
    setLimit(limit - 2);
    console.log("limit", limit);
  };
  const plusLimit = (e) => {
    e.preventDefault();
    setLimit(limit + 2);
    console.log("limit", limit);
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <div className="flex items-center gap-3 justify-between sticky top-0 bg-primary px-2 py-2 z-50">
          <img
            src={logoImg}
            alt=""
            className="w-8 h-8 p-1 bg-white rounded-full"
          />
          <form className="w-full">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                onClick={handleSearch}
                className="block w-full h-8 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                placeholder="Cari Barang ..."
              />
            </div>
          </form>
          <Link to={"/user/chats"}>
            <div className="flex place-items-center justify-center bg-white border-2 rounded-full w-9 p-1.5 h-9 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 32 32"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M25 5H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h11l6 4v-4h1a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4Z" />
                  <path d="M10 15a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm6 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm6 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" />
                </g>
              </svg>
            </div>
          </Link>
        </div>

        {/* content */}
        <div className="bg-background rounded-b-lg pb-5 min-h-screen">
          <div className="relative bg-primary pt-3 rounded-b-xl px-3 h-28">
            <div className=" grid grid-cols-5 gap-5 justify-between items-center bg-white rounded-xl p-5 border-b-4 border-b-primary">
              <div
                className="flex flex-col justify-center items-center cursor-pointer"
                onClick={handleAccessories}
              >
                <img
                  src={aksesorisImg}
                  alt=""
                  className="p-1 border-2 rounded-lg h-12 w-12"
                />
                <p className="text-xs pt-1">Aksesoris</p>
              </div>
              <div
                className="flex flex-col justify-center items-center cursor-pointer"
                onClick={handleBook}
              >
                <img
                  src={bukuImg}
                  alt=""
                  className="p-1 border-2 rounded-lg h-12 w-12"
                />
                <p className="text-xs pt-1">Buku</p>
              </div>
              <div
                className="flex flex-col justify-center items-center cursor-pointer"
                onClick={handleElectronic}
              >
                <img
                  src={elektronikImg}
                  alt=""
                  className="p-1 border-2 rounded-lg h-12 w-12"
                />
                <p className="text-xs pt-1">Elektronik</p>
              </div>
              <div
                className="flex flex-col justify-center items-center cursor-pointer"
                onClick={handleHealth}
              >
                <img
                  src={kesehatanImg}
                  alt=""
                  className="p-1 border-2 rounded-lg h-12 w-12"
                />
                <p className="text-xs pt-1">Kesehatan</p>
              </div>
              <div
                className="flex flex-col justify-center items-center cursor-pointer"
                onClick={handleSport}
              >
                <img
                  src={olahragaImg}
                  alt=""
                  className="p-1 border-2 rounded-lg h-12 w-12"
                />
                <p className="text-xs pt-1">Olahraga</p>
              </div>
              <div
                className="flex flex-col justify-center items-center cursor-pointer"
                onClick={handleOutdoor}
              >
                <img
                  src={outdoorImg}
                  alt=""
                  className="p-1 border-2 rounded-lg h-12 w-12"
                />
                <p className="text-xs pt-1">Outdoor</p>
              </div>
              <div
                className="flex flex-col justify-center items-center cursor-pointer"
                onClick={handleClothes}
              >
                <img
                  src={pakaianImg}
                  alt=""
                  className="p-1 border-2 rounded-lg h-12 w-12"
                />
                <p className="text-xs pt-1">Pakaian</p>
              </div>
              <div
                className="flex flex-col justify-center items-center cursor-pointer"
                onClick={handleEquipment}
              >
                <img
                  src={peralatanImg}
                  alt=""
                  className="p-1 border-2 rounded-lg h-12 w-12"
                />
                <p className="text-xs pt-1">Peralatan</p>
              </div>
              <div
                className="flex flex-col justify-center items-center cursor-pointer"
                onClick={handleSouvenir}
              >
                <img
                  src={souvenirImg}
                  alt=""
                  className="p-1 border-2 rounded-lg h-12 w-12"
                />
                <p className="text-xs pt-1">Souvenir</p>
              </div>
              <div
                className="flex flex-col justify-center items-center cursor-pointer"
                onClick={handleTransportation}
              >
                <img
                  src={transportasiImg}
                  alt=""
                  className="p-1 border-2 rounded-lg h-12 w-12"
                />
                <p className="text-xs pt-1">Tranportasi</p>
              </div>
            </div>
          </div>

          <div className="px-3 pt-32">
            <div className="flex justify-between">
              <div className="flex items-center gap-2 mb-3 font-bold">
                <p>Barang Terdekat</p>
                <i
                  className="fa-solid fa-arrows-rotate cursor-pointer"
                  onClick={refreshClosestProducts}
                ></i>
              </div>
              <Link to={"/user/closestproducts"}>
                <p className="text-sm text-tertiary italic underline font-bold cursor-pointer">
                  Lihat Semua
                </p>
              </Link>
            </div>
            <div className="grid grid-cols-2 mb-5 gap-3">
              {closestProducts.map((data) => {
                return (
                  <CardClosestProduct
                    key={data.uuid}
                    data={data}
                    save={() => addSaveProduct(data)}
                    detail={getDetailProduct}
                  />
                );
              })}
            </div>
          </div>

          <p className="px-3 mb-3 font-bold">Barang Lainnya</p>
          <div className="px-3 grid grid-cols-2 gap-5">
            {products.map((data) => {
              return (
                <CardProduct
                  key={data.uuid}
                  data={data}
                  save={() => addSaveProduct(data)}
                  detail={getDetailProduct}
                />
              );
            })}
          </div>
          <div className="px-3 mt-5 flex justify-center gap-5 w-full">
            {limit > 6 && (
              <button
                onClick={minLimit}
                className="bg-secondary text-white py-1 px-2 rounded-lg border-none text-sm"
              >
                Lebih Sedikit
              </button>
            )}
            {products.length >= limit && (
              <button
                onClick={plusLimit}
                className="bg-secondary text-white py-1 px-2 rounded-lg border-none text-sm"
              >
                Lebih Banyak
              </button>
            )}
          </div>
        </div>

        {/* footer */}
        <ButtonNavigation />
      </div>
    </>
  );
};

export default UserHome;
