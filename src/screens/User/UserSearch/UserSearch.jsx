import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";

const UserSearch = () => {
  const [searchs, setSearchs] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getSearchs();
  }, [searchs]);

  const getSearchs = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/searchs`);
      setSearchs(resp.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const addSearch = async () => {
    const formData = new FormData();
    formData.append("text", inputSearch);
    try {
      await axios.post("http://localhost:5000/searchs", formData);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const handleSearch = async (e) => {
    setInputSearch(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    addSearch();
    navigate(`/user/products?search=${inputSearch}`);
  };

  const handleHistorySearchSubmit = async (search) => {
    navigate(`/user/products?search=${search}`);
  };

  const deleteSearch = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/searchs/${uuid}`);
      console.log("berhasil menghapus");
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <div className="flex items-center gap-3 justify-between sticky top-0 bg-primary px-3 py-2 z-50">
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
                defaultValue={inputSearch}
                onChange={handleSearch}
                className="block w-full h-8 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                placeholder="Cari Barang ..."
                autoFocus
                autoComplete="off"
              />
            </div>
          </form>
        </div>

        {/* content */}
        <div className="flex flex-col gap-5 px-5 justify-start bg-background rounded-b-lg py-5 min-h-screen">
          {searchs.map((data) => {
            return (
              <div
                className="flex justify-between border-b-2"
                key={data.uuid}
                onClick={() => handleHistorySearchSubmit(data.text)}
              >
                <p>{data.text}</p>
                <p
                  onClick={() => deleteSearch(data.uuid)}
                  className="cursor-pointer"
                >
                  x
                </p>
              </div>
            );
          })}
        </div>

        {/* footer */}
        <ButtonNavigation />
      </div>
    </>
  );
};

export default UserSearch;
