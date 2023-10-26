import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Alert from "../../../components/Alert/Alert";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import CardProduct from "../../../components/CardProduct/CardProduct";
import NotFoundPage from "../../../components/NotFoundPage/NotFoundPage";

const UserProduct = () => {
  const [products, setProducts] = useState([]);
  const [closestProducts, setClosestProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(6);
  const [search, setSearch] = useState("");
  const [citydistrict, setCitydistrict] = useState("");
  const [showFilterLocation, setShowFilterLocation] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const categoryValue = searchParams.get("category");
  const searchValue = searchParams.get("search");

  useEffect(() => {
    setCategory(categoryValue);
    setSearch(searchValue);
    getProducts();
    getClosestProducts();
  }, [category, searchValue, categoryValue, limit]);

  const getProducts = async () => {
    try {
      let url = "http://localhost:5000/products?";

      if (search || category || limit || citydistrict) {
        if (search) {
          url += `search=${search}&`;
        }
        if (category) {
          url += `category=${category}&`;
        }
        if (citydistrict) {
          url += `citydistrict=${citydistrict}&`;
        }
        if (limit) {
          url += `limit=${limit}&`;
        }
      }

      const resp = await axios.get(url);
      setProducts(resp.data.products);
      console.log(products);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getClosestProducts = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/closestproducts`);
      setClosestProducts(resp.data);
      console.log(closestProducts);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getDetailProduct = (uuid) => {
    navigate(`/user/detailproduct/${uuid}`);
  };

  const addSaveProduct = async (data) => {
    const formData = new FormData();
    formData.append("productId", data.id);
    formData.append("ownerId", data.user.id);
    try {
      const resp = await axios.post(
        "http://localhost:5000/saveproducts",
        formData
      );
      setMsg(resp.data.msg);
      setAlertColor("#00ff04");
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    getProducts();
  };

  const handleCitydistrict = async (e) => {
    setCitydistrict(e.target.value);
    getProducts();
  };

  const toggleShowFilterLocation = () => {
    setShowFilterLocation(!showFilterLocation);
  };

  const minLimit = (e) => {
    e.preventDefault();
    setLimit(limit - 4);
    console.log("limit", limit);
  };
  const plusLimit = (e) => {
    e.preventDefault();
    setLimit(limit + 4);
    console.log("limit", limit);
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <div className="flex items-center gap-3 justify-between sticky top-0 bg-primary px-2 py-2 z-50">
          <form className="w-full" onSubmit={handleSearchSubmit}>
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
                value={search}
                onChange={handleSearch}
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
        <div className="bg-background rounded-b-lg pb-5 min-h-screen px-3">
          <div className="flex justify-between py-2 mt-2">
            <p className="flex items-center gap-2 my-2">
              <span className="text-tertiary font-bold text-lg">Barang</span>
            </p>
            <p
              className="flex items-center gap-2 text-sm justify-end cursor-pointer text-tertiary font-bold"
              onClick={toggleShowFilterLocation}
            >
              Filter Lokasi
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 512 512"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="48"
                  d="m112 184l144 144l144-144"
                />
              </svg>
            </p>
          </div>
          {showFilterLocation && (
            <div className="flex justify-end">
              <input
                type="search"
                id="default-search"
                class="bg-gray-50 h-8 py-2 text-sm  border border-gray-300 text-gray-900 rounded-md block"
                placeholder="Kota / Kabupaten"
                value={citydistrict}
                onChange={handleCitydistrict}
                required
              />
            </div>
          )}
          {products.length === 0 ? (
            <NotFoundPage desc={"Barang Tidak Ditemukan"} />
          ) : (
            <div className="grid grid-cols-2 gap-5 bg-background rounded-b-lg py-5 min-h-screen">
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
          )}
          <div className="px-3 mb-5 flex justify-center gap-5 w-full">
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
        <Alert isOpen={showAlert} desc={msg} color={alertColor} />
      </div>
    </>
  );
};

export default UserProduct;
