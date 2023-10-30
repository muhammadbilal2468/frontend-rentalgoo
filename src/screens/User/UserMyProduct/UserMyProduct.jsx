import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { modalconfirmImg, modalsuccessImg } from "../../../assets";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import CardMyProduct from "../../../components/CardMyProduct/CardMyProduct";
import UserModalConfirm from "../../../components/UserModalConfirm/UserModalConfirm";
import UserModalInfo from "../../../components/UserModalInfo/UserModalInfo";
import NotFoundPage from "../../../components/NotFoundPage/NotFoundPage";
import UserHeader from "../../../components/UserHeader/UserHeader";
import UserCardHeader from "../../../components/UserCardHeader/UserCardHeader";

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
      console.log(error.response.data.msg);
    }
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <UserHeader title="Barang Saya" />

        {/* content */}
        <div className="bg-background rounded-b-lg pb-5 min-h-screen">
          <UserCardHeader count={products.length} title="Barang" />

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

          {products.length === 0 ? (
            <NotFoundPage desc={"Anda Belum Punya Barang"} />
          ) : (
            <div className="px-3 grid grid-cols-2 gap-5">
              {products.map((data) => {
                return (
                  <>
                    <CardMyProduct
                      data={data}
                      delete={handleModalDelete}
                      edit={() => editProduct(data.uuid)}
                    />
                    <UserModalConfirm
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
          )}
        </div>

        {/* footer */}
        <ButtonNavigation />

        <UserModalInfo
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
