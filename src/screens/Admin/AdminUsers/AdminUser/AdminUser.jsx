import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminuserImg } from "../../../../assets";
import AdminCardHeader from "../../../../components/AdminCardHeader/AdminCardHeader";
import AdminModalConfirm from "../../../../components/AdminModalConfirm/AdminModalConfirm";
import AdminPagination from "../../../../components/AdminPagination/AdminPagination";
import ModalImage from "../../../../components/ModalImage/ModalImage";
import NotFoundPage from "../../../../components/NotFoundPage/NotFoundPage";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  // const [limit, setLimit] = useState(10);
  let limit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalusers, setTotalUsers] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");

  const [modalDelete, setModalDelete] = useState([]);
  const [modalImage, setModalImage] = useState([]);

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  const getUsers = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:5000/users?page=${currentPage}&search=${search}&limit=${limit}`
      );
      setUsers(resp.data.users);
      setTotalUsers(resp.data.totalUsers);
      setTotalPages(resp.data.totalPages);
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteUser = async (uuid, index) => {
    try {
      await axios.delete(`http://localhost:5000/users/${uuid}`);
      handleModalDelete(index);
      getUsers();
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.get(
        `http://localhost:5000/users?page=${currentPage}&search=${search}`
      );
      setUsers(resp.data.users);
      setTotalPages(resp.data.totalPages);
      setTotalUsers(resp.data.totalUsers);
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

  const handleModalImage = (index) => {
    const newModalImage = [...modalImage];
    newModalImage[index] = !newModalImage[index];
    setModalImage(newModalImage);
  };

  return (
    <>
      <AdminCardHeader
        img={adminuserImg}
        title={"Pengguna"}
        desc={"Akses menampilkan semua data pengguna"}
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
                  placeholder="Cari Pengguna"
                  className="block w-full p-2 pl-10 text-sm text-gray-900  rounded-lg bg-gray-100 border-none py-3"
                />
              </div>
            </form>
            <Link to={"/admin/add-user"}>
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
                  Tambah Pengguna
                </p>
              </button>
            </Link>
          </div>
        </div>
        {users.length === 0 ? (
          <NotFoundPage desc={"Belum ada data pengguna"} />
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
                      <div className="flex items-center">Foto</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Nama</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Email</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">No Hp</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Kota</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((data, index) => {
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
                        <td className="px-6 py-4">
                          <img
                            src={data.url}
                            alt="fotoproduct"
                            className="w-12 h-12"
                          />
                        </td>
                        <td className="px-6 py-4">{data.name}</td>
                        <td className="px-6 py-4">{data.email}</td>
                        <td className="px-6 py-4">{data.nohp}</td>
                        <td className="px-6 py-4">{data.citydistrict}</td>
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
                          <Link to={`/admin/edit-user/${data.uuid}`}>
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
                            onConfirm={() => deleteUser(data.uuid, index)}
                            title="Hapus Pengguna"
                            desc="Apakah anda ingin menghapus pengguna ini ?"
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
                totalItems={totalusers}
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

export default AdminUser;
