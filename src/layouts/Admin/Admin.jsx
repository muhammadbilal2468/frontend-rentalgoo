import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  adminagreementImg,
  admindashboardImg,
  adminfinishrentImg,
  adminisrentingImg,
  adminproductImg,
  adminsuggImg,
  adminuserImg,
  logoImg,
  updaloadProfileImg,
} from "../../assets";
import { LogoutUser, MeUser, reset } from "../../features/authSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(MeUser());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/auth/login");
    }
  }, [isError, navigate]);

  const Logout = () => {
    dispatch(LogoutUser());
    dispatch(reset());
    alert("berhasil logout");
    navigate("/auth/login");
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3 bg-primary">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="white"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a
                href="https://flowbite.com"
                className="flex items-center ml-2 md:mr-24"
              >
                <img src={logoImg} alt="logo" className="w-5 h-5" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                  entalGoo
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white"
                      src={user ? user.url : updaloadProfileImg}
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      {user && user.name}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {user && user.email}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <Link to={"/admin/home"}>
                      <li>
                        <p
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Dashboard
                        </p>
                      </li>
                    </Link>
                    <Link to={"/admin/setting"}>
                      <li>
                        <a
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Settings
                        </a>
                      </li>
                    </Link>
                    <li onClick={Logout}>
                      <p
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-primary border-r border-gray-200 lg:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-primary dark:bg-gray-800">
          <ul className="flex flex-col gap-5 space-y-2 font-medium">
            <Link to={"/admin/home"}>
              <li>
                <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <img
                    src={admindashboardImg}
                    alt="admindashboardImg"
                    className="w-6"
                  />
                  <span className="ml-3 text-white hover:text-primary">
                    Dashboard
                  </span>
                </p>
              </li>
            </Link>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group hover:bg-gray-100 text-white hover:text-primary"
                aria-controls="dropdown-product"
                data-collapse-toggle="dropdown-product"
              >
                <img
                  src={adminproductImg}
                  alt="adminproductImg"
                  className="w-6"
                />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Barang
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul id="dropdown-product" className="hidden py-2 space-y-2">
                <Link to={"/admin/products"}>
                  <li>
                    <p className="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 text-white hover:text-primary">
                      Semua Barang
                    </p>
                  </li>
                </Link>
                <Link to={"/admin/saveproducts"}>
                  <li>
                    <p className="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 text-white hover:text-primary">
                      Barang Tersimpan
                    </p>
                  </li>
                </Link>
              </ul>
            </li>
            <Link to={"/admin/agreementproducts"}>
              <li>
                <p className="flex items-center p-2  rounded-lg  hover:bg-gray-100 group">
                  <img
                    src={adminagreementImg}
                    alt="adminagreementImg"
                    className="w-6"
                  />
                  <span className="flex-1 ml-3 whitespace-nowrap text-white hover:text-primary">
                    Persetujuan Sewa
                  </span>
                </p>
              </li>
            </Link>
            <Link to={"/admin/isrentingproducts"}>
              <li>
                <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <img
                    src={adminisrentingImg}
                    alt="adminisrentingImg"
                    className="w-6"
                  />
                  <span className="flex-1 ml-3 whitespace-nowrap text-white hover:text-primary">
                    Proses Sewa
                  </span>
                </p>
              </li>
            </Link>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-basetransition duration-75 rounded-lg group hover:bg-gray-100 text-white hover:text-primary"
                aria-controls="dropdown-finish"
                data-collapse-toggle="dropdown-finish"
              >
                <img
                  src={adminfinishrentImg}
                  alt="adminfinishrentImg"
                  className="w-6"
                />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Selesai Sewa
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul id="dropdown-finish" className="hidden py-2 space-y-2">
                <Link to={"/admin/finishrentowners"}>
                  <li>
                    <p className="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 text-white hover:text-primary">
                      Pemilik
                    </p>
                  </li>
                </Link>
                <Link to={"/admin/finishrentrenters"}>
                  <li>
                    <p className="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 text-white hover:text-primary">
                      Penyewa
                    </p>
                  </li>
                </Link>
              </ul>
            </li>
            <Link to={"/admin/users"}>
              <li>
                <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <img src={adminuserImg} alt="adminuserImg" className="w-6" />
                  <span className="flex-1 ml-3 whitespace-nowrap text-white hover:text-primary">
                    Pengguna
                  </span>
                </p>
              </li>
            </Link>
            <Link to={"/admin/suggestions"}>
              <li>
                <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <img src={adminsuggImg} alt="adminuserImg" className="w-6" />
                  <span className="flex-1 ml-3 whitespace-nowrap text-white hover:text-primary">
                    Saran
                  </span>
                </p>
              </li>
            </Link>
          </ul>
        </div>
      </aside>

      <div className="p-4 lg:ml-64 bg-gray-200 min-h-screen">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Admin;
