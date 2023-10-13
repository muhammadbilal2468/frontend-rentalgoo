import React, { useEffect, useState } from "react";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import axios from "axios";
import { useNavigate } from "react-router";
import CardProduct from "../../../components/CardProduct/CardProduct";
import CardMyProduct from "../../../components/CardMyProduct/CardMyProduct";
import { Link } from "react-router-dom";
import ModalInfo from "../../../components/ModalInfo/ModalInfo";
import {
  modalconfirmImg,
  modalerrorImg,
  modalsuccessImg,
} from "../../../assets";
import ModalConfirm from "../../../components/ModalConfirm/ModalConfirm";

const UserMyProduct = () => {
  const [products, setProducts] = useState([]);

  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [msg, setMsg] = useState("");
  const [titleModal, setTitleModal] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/myproducts`);
      setProducts(resp.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const editProduct = (uuid) => {
    navigate(`/user/editproduct/${uuid}`);
  };

  const handleModalDelete = async () => {
    setTitleModal("Menghapus");
    setMsg("apakah anda yakin menghapus barang ini ?");
    setShowModalConfirm(!showModalConfirm);
  };

  const deleteProduct = async (uuid) => {
    setShowModalConfirm(false);
    try {
      const resp = await axios.delete(`http://localhost:5000/products/${uuid}`);
      setTitleModal("Berhasil");
      setMsg(resp.data.msg);
      setShowModalInfo(true);
      setTimeout(() => {
        setShowModalInfo(false);
        getProducts();
      }, 1500);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <div className="flex items-center gap-3 sticky top-0 bg-primary py-2 z-50 text-white">
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
          <p className="">Barang Saya</p>
          <p></p>
        </div>

        {/* content */}
        <div className="bg-background rounded-b-lg pb-5 min-h-screen">
          <div className="bg-white rounded-lg overflow-hidden shadow-md bg-white-50 mb-5 mx-3 my-3 border-b-4 border-b-primary">
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
                    {products.length} Barang
                  </p>
                </div>
                <p></p>
              </div>
            </div>
          </div>

          <Link to={"/user/addproduct"}>
            <button
              type="button"
              className="text-xs text-white bg-primary font-medium rounded-lg px-3 py-1.5 text-center inline-flex items-center mx-3 mb-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7.007 12a.75.75 0 0 1 .75-.75h3.493V7.757a.75.75 0 0 1 1.5 0v3.493h3.493a.75.75 0 1 1 0 1.5H12.75v3.493a.75.75 0 0 1-1.5 0V12.75H7.757a.75.75 0 0 1-.75-.75Z"
                />
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M7.317 3.769a42.502 42.502 0 0 1 9.366 0c1.827.204 3.302 1.643 3.516 3.48c.37 3.157.37 6.346 0 9.503c-.215 1.837-1.69 3.275-3.516 3.48a42.5 42.5 0 0 1-9.366 0c-1.827-.205-3.302-1.643-3.516-3.48a40.903 40.903 0 0 1 0-9.503c.214-1.837 1.69-3.276 3.516-3.48Zm9.2 1.49a41.001 41.001 0 0 0-9.034 0A2.486 2.486 0 0 0 5.29 7.424a39.402 39.402 0 0 0 0 9.154a2.486 2.486 0 0 0 2.193 2.164c2.977.332 6.057.332 9.034 0a2.486 2.486 0 0 0 2.192-2.164a39.401 39.401 0 0 0 0-9.154a2.486 2.486 0 0 0-2.192-2.163Z"
                  clipRule="evenodd"
                />
              </svg>
              Tambah Barang
            </button>
          </Link>

          <div className="px-3 grid grid-cols-2 gap-5">
            {products.map((data) => {
              return (
                <>
                  <CardMyProduct
                    key={data.uuid}
                    data={data}
                    delete={handleModalDelete}
                    edit={() => editProduct(data.uuid)}
                  />
                  <ModalConfirm
                    key={data.uuid}
                    isOpen={showModalConfirm}
                    title={titleModal}
                    img={modalconfirmImg}
                    desc={msg}
                    cancelText={"Batal"}
                    confirmText={"Hapus"}
                    onCancel={handleModalDelete}
                    onConfirm={() => deleteProduct(data.uuid)}
                  />
                </>
              );
            })}
          </div>
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

export default UserMyProduct;
