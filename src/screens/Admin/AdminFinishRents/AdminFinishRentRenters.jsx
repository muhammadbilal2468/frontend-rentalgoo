import axios from "axios";
import React, { useEffect, useState } from "react";
import { adminfinishrentImg } from "../../../assets";
import AdminCardHeader from "../../../components/AdminCardHeader/AdminCardHeader";
import AdminModalConfirm from "../../../components/AdminModalConfirm/AdminModalConfirm";
import AdminPagination from "../../../components/AdminPagination/AdminPagination";
import NotFoundPage from "../../../components/NotFoundPage/NotFoundPage";
import formatRupiah from "../../../utils/FormatRupiah";

const AdminFinishRentRenters = () => {
  const [finishRents, setFinishRents] = useState([]);
  const [limit, setLimit] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalFinishRents, setTotalFinishRents] = useState(0);
  const [search, setSearch] = useState("");

  const [modalDelete, setModalDelete] = useState([]);

  useEffect(() => {
    getFinishRents();
  }, [currentPage]);

  const getFinishRents = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:5000/finishrentbyrenter?page=${currentPage}&search=${search}&limit=${limit}`
      );
      setFinishRents(resp.data.finishRents);
      setTotalPages(resp.data.totalPages);
      setTotalFinishRents(resp.data.totalFinishRents);
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteFinishRent = async (uuid, index) => {
    try {
      await axios.delete(`http://localhost:5000/finishrentbyrenter/${uuid}`);
      handleModalDelete(index);
      getFinishRents();
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.get(
        `http://localhost:5000/finishrentbyrenter?page=${currentPage}&search=${search}`
      );
      setFinishRents(resp.data.finishRents);
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
    setCurrentPage(currentPage + 1);
  };

  const handleModalDelete = (index) => {
    const newModalDelete = [...modalDelete];
    newModalDelete[index] = !newModalDelete[index];
    setModalDelete(newModalDelete);
    console.log(modalDelete[index]);
  };

  return (
    <>
      <AdminCardHeader
        img={adminfinishrentImg}
        title={"Slesai Sewa Oleh penyewa"}
        desc={"Akses menampilkan semua data selesai sewa oleh penyewa barang"}
      />

      <div className="bg-white w-full rounded-3xl shadow-md mb-8 bg-white-50">
        <div className="flex items-center justify-between p-8">
          <h4 className="text-lg font-semibold">Daftar Riwayat</h4>
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
          </div>
        </div>

        {finishRents.length === 0 ? (
          <NotFoundPage
            desc={"Belum ada data selesai sewa oleh penyewa barang"}
          />
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
                      <div className="flex items-center">Penyewa</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Pemilik</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Total Bayar</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Mulai</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Berakhir</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {finishRents.map((data, index) => {
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
                        <td className="px-6 py-4">{data.product.name}</td>
                        <td className="px-6 py-4">
                          <img
                            src={data.product.url}
                            alt="fotoproduct"
                            className="w-12"
                          />
                        </td>
                        <td className="px-6 py-4">{data.renter.name}</td>
                        <td className="px-6 py-4">{data.owner.name}</td>
                        <td className="px-6 py-4">
                          {formatRupiah(data.total_price)}
                        </td>
                        <td className="px-6 py-4">{data.start_date}</td>
                        <td className="px-6 py-4">{data.end_date}</td>
                        <td className="flex items-center gap-2 px-6 py-4">
                          <i
                            className="fa-solid fa-trash text-red-100 bg-red-500 py-1 px-2 text-base rounded-md cursor-pointer"
                            onClick={() => handleModalDelete(index)}
                          ></i>
                          <AdminModalConfirm
                            data={data}
                            isOpen={modalDelete[index]}
                            onCancel={() => handleModalDelete(index)}
                            onConfirm={() => deleteFinishRent(data.uuid, index)}
                            title="Hapus Riwayat"
                            desc="Apakah anda ingin menghapus riwayat sewa ini ?"
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
                totalItems={totalFinishRents}
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

export default AdminFinishRentRenters;
