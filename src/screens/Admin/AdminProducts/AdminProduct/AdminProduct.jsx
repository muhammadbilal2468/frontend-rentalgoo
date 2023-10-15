import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminproductImg } from "../../../../assets";
import AdminCardHeader from "../../../../components/AdminCardHeader/AdminCardHeader";
import AdminModalConfirm from "../../../../components/AdminModalConfirm/AdminModalConfirm";
import AdminPagination from "../../../../components/AdminPagination/AdminPagination";
import ModalImage from "../../../../components/ModalImage/ModalImage";
import NotFoundPage from "../../../../components/NotFoundPage/NotFoundPage";
import formatRupiah from "../../../../utils/FormatRupiah";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  // const [limit, setLimit] = useState(10);
  let limit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const [modalDelete, setModalDelete] = useState([]);
  const [modalImage, setModalImage] = useState([]);

  useEffect(() => {
    getProducts();
  }, [category, currentPage]);

  const getProducts = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:5000/products?category=${category}&page=${currentPage}&search=${search}&limit=${limit}`
      );
      setProducts(resp.data.products);
      setTotalPages(resp.data.totalPages);
      setTotalProducts(resp.data.totalProducts);
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteProduct = async (uuid, index) => {
    try {
      await axios.delete(`http://localhost:5000/products/${uuid}`);
      handleModalDelete(index);
      getProducts();
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.get(
        `http://localhost:5000/products?category=${category}&page=${currentPage}&search=${search}`
      );
      setProducts(resp.data.products);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleModalDelete = (index) => {
    const newModalDelete = [...modalDelete];
    newModalDelete[index] = !newModalDelete[index];
    setModalDelete(newModalDelete);
    console.log(modalDelete[index]);
  };

  const handleModalImage = (index) => {
    const newModalImage = [...modalImage];
    newModalImage[index] = !newModalImage[index];
    setModalImage(newModalImage);
    console.log(modalImage[index]);
  };

  return (
    <>
      <AdminCardHeader
        img={adminproductImg}
        title={"Barang"}
        desc={"Akses menampilkan semua data barang"}
      />

      <div className="bg-white w-full rounded-3xl shadow-md mb-8 bg-white-50">
        <div className="flex items-center justify-between p-8">
          <h4 className="text-lg font-semibold">Daftar Barang</h4>
          <div className="flex gap-4">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3  pointer-events-none">
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
                  value={search}
                  onChange={handleSearch}
                  placeholder="Cari Barang"
                  className="block w-full p-2 pl-10 text-sm text-gray-900  rounded-lg bg-gray-100 border-none py-3"
                />
              </div>
            </form>
            <Link to={"/admin/add-product"}>
              <button className="flex items-center p-3 bg-primary rounded-lg gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 4.5V13.5M13.5 9H4.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-sm font-semibold text-white">
                  Tambah Barang
                </p>
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col px-8 pb-2 items-end">
          <label
            htmlFor="countries"
            className="block mb-2 font-medium text-gray-900 dark:text-white"
          >
            Filter Kategori
          </label>
          <select
            id="countries"
            value={category}
            onChange={handleCategory}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
            rounded-lg block w-1/3 p-2.5 focus:border-primary"
          >
            <option value="" hidden>
              Kategori
            </option>
            <option value="">Semua</option>
            <option value="Aksesoris">Aksesoris</option>
            <option value="Buku">Buku</option>
            <option value="Elektronik">Elektronik</option>
            <option value="Kesehatan">Kesehatan</option>
            <option value="Olahraga">Olahraga</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Pakaian">Pakaian</option>
            <option value="Peralatan">Peralatan</option>
            <option value="Souvenir">Souvenir</option>
            <option value="Transportasi">Transportasi</option>
          </select>
        </div>

        {products.length === 0 ? (
          <NotFoundPage desc={"Belum ada data barang"} />
        ) : (
          <>
            <div className="relative overflow-x-auto sm:rounded-lg px-8">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Nama Barang</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Gambar</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Harga</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Disewakan</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((data, index) => {
                    const startingNumber = (currentPage - 1) * limit + 1;
                    const rowNumber = startingNumber + index;
                    return (
                      <tr
                        key={data.uuid}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {rowNumber}
                        </th>
                        <td className="px-6 py-4">{data.name}</td>
                        <td className="px-6 py-4">
                          <img
                            src={data.url}
                            alt="fotoproduct"
                            className="w-12 h-12"
                          />
                        </td>
                        <td className="px-6 py-4">
                          {formatRupiah(data.price)}
                        </td>
                        <td className="px-6 py-4">{data.leased} x</td>
                        <td className="flex items-center gap-2 px-6 py-4">
                          <i
                            className="fa-solid fa-eye text-blue-100 bg-blue-500 py-1 px-2 text-base rounded-md cursor-pointer"
                            onClick={() => handleModalImage(index)}
                          ></i>
                          <ModalImage
                            data={data}
                            isOpen={modalImage[index]}
                            onCancel={() => handleModalImage(index)}
                          />
                          <Link to={`/admin/edit-product/${data.uuid}`}>
                            <i className="fa-solid fa-pen-to-square text-yellow-100 bg-yellow-300 py-1 px-2 text-base rounded-md cursor-pointer"></i>
                          </Link>
                          <i
                            className="fa-solid fa-trash text-red-100 bg-red-500 py-1 px-2 text-base rounded-md cursor-pointer"
                            onClick={() => handleModalDelete(index)}
                          ></i>
                          <AdminModalConfirm
                            data={data}
                            isOpen={modalDelete[index]}
                            onCancel={() => handleModalDelete(index)}
                            onConfirm={() => deleteProduct(data.uuid, index)}
                            title="Hapus Barang"
                            desc="Apakah anda ingin menghapus barang ini ?"
                            cancelText="Batal"
                            confirmText="Hapus"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <AdminPagination
                totalItems={totalProducts}
                totalPages={totalPages}
                currentPage={currentPage}
                handlePrevPage={handlePrevPage}
                handlePageChange={handlePageChange}
                handleNextPage={handleNextPage}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminProduct;
