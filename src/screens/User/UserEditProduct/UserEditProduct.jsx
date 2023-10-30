import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { modalsuccessImg, updaloadProductImg } from "../../../assets";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import UserModalInfo from "../../../components/UserModalInfo/UserModalInfo";
import formatRupiah from "../../../utils/FormatRupiah";
import UserHeader from "../../../components/UserHeader/UserHeader";

const UserEditProduct = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [guarantee, setGuarantee] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [timeUnit, setTimeUnit] = useState("");

  const [showModalInfo, setShowModalInfo] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const { uuid } = useParams();

  useEffect(() => {
    getProductById(uuid);
  }, [uuid]);

  const getProductById = async (uuid) => {
    try {
      const resp = await axios.get(`http://localhost:5000/products/${uuid}`);
      setName(resp.data.name);
      setUrl(resp.data.url);
      setCategory(resp.data.category);
      setDescription(resp.data.description);
      setGuarantee(resp.data.guarantee);
      setStock(resp.data.stock);
      setPrice(resp.data.price);
      setTimeUnit(resp.data.time_unit);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("guarantee", guarantee);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("time_unit", timeUnit);
    try {
      const resp = await axios.patch(
        `http://localhost:5000/products/${uuid}`,
        formData
      );
      setTitleModal("Berhasil");
      setMsg(resp.data.msg);
      setShowModalInfo(true);
      setTimeout(() => {
        setShowModalInfo(false);
        navigate("/user/myproducts");
      }, 2000);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const handleChangeFile = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setFile(selectedImage);
    setUrl(imageUrl);
  };

  const handlePriceChange = (e) => {
    const inputPrice = e.target.value.replace(/[^\d]/g, ""); // Menghapus semua karakter kecuali angka
    setPrice(inputPrice); // Simpan nilai angka saja dalam `price`
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <UserHeader title="Edit Barang" />

        {/* content */}
        <div className="bg-background rounded-b-lg pb-5 min-h-screen px-4 mt-5">
          <form onSubmit={updateProduct}>
            <div className="relative flex justify-center w-full mb-10">
              {url ? (
                <img
                  src={url}
                  className="w-64 h-64 rounded-xl border-4 border-primary p-2"
                  alt="Preview"
                />
              ) : (
                <img
                  src={updaloadProductImg}
                  className="w-64 h-64 rounded-xl border-4 border-primary p-2"
                  alt="uploadgambar"
                />
              )}
              <div className="absolute -bottom-3 right-10 flex items-center justify-center">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center border-2 border-gray-300  rounded-xl cursor-pointer bg-primary p-2"
                >
                  <div className="flex flex-col items-center justify-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="42"
                      height="42"
                      viewBox="0 0 24 24"
                      className="text-white"
                    >
                      <path
                        fill="currentColor"
                        d="M17.5 12a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11Zm0 2l-.09.008a.5.5 0 0 0-.402.402L17 14.5V17h-2.502l-.09.009a.5.5 0 0 0-.402.402l-.008.09l.008.09a.5.5 0 0 0 .402.402l.09.008H17v2.503l.008.09a.5.5 0 0 0 .402.402l.09.008l.09-.008a.5.5 0 0 0 .402-.402l.008-.09V18h2.504l.09-.007a.5.5 0 0 0 .402-.402l.008-.09l-.008-.09a.5.5 0 0 0-.403-.402l-.09-.008H18v-2.5l-.008-.09a.5.5 0 0 0-.402-.403L17.5 14ZM13.925 2.504a2.25 2.25 0 0 1 1.94 1.11l.814 1.387h2.071A3.25 3.25 0 0 1 22 8.25v4.56a6.52 6.52 0 0 0-1.499-1.077L20.5 8.25a1.75 1.75 0 0 0-1.75-1.75h-2.5a.75.75 0 0 1-.647-.37l-1.032-1.757a.75.75 0 0 0-.646-.37h-3.803a.75.75 0 0 0-.574.268l-.065.09L8.39 6.142a.75.75 0 0 1-.639.358h-2.5A1.75 1.75 0 0 0 3.5 8.25v9.5c0 .966.784 1.75 1.75 1.75h6.063c.173.533.412 1.037.709 1.5H5.25A3.25 3.25 0 0 1 2 17.75v-9.5A3.25 3.25 0 0 1 5.25 5h2.08l.875-1.424a2.25 2.25 0 0 1 1.917-1.073h3.803ZM12 8a4.502 4.502 0 0 1 4.283 3.114c-.5.095-.98.247-1.433.449A2.999 2.999 0 0 0 9 12.5c0 1.43 1 2.625 2.338 2.927a6.446 6.446 0 0 0-.31 1.467A4.501 4.501 0 0 1 12 8.001Z"
                      />
                    </svg>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleChangeFile}
                  />
                </label>
              </div>
            </div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nama Barang
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5 mb-3"
              placeholder="masukkan nama barang ..."
              required
            />

            <label
              htmlFor="category"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Kategori
            </label>
            <select
              id="category"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 mb-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled hidden>
                Pilih Ketegori Barang
              </option>
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

            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Deskripsi
            </label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 mb-3"
              placeholder="Deskripsi Barang ..."
              required
            ></textarea>

            <label
              htmlFor="guarantee"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Jaminan
            </label>
            <select
              id="guarantee"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 mb-3"
              value={guarantee}
              onChange={(e) => setGuarantee(e.target.value)}
              required
            >
              <option value="" disabled hidden>
                Pilih Jaminan
              </option>
              <option value="Aksesoris">KTP</option>
              <option value="Buku">KTM</option>
            </select>

            <label
              htmlFor="stock"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Stok
            </label>
            <input
              type="number"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 mb-3"
              placeholder="jumlah stok ..."
              required
            />
            <label
              htmlFor="price"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Harga Per Waktu
            </label>
            <div className="grid grid-cols-3 gap-2 mb-5">
              <input
                type="text"
                id="price"
                value={`${formatRupiah(price)}`}
                onChange={handlePriceChange}
                aria-describedby="helper-text-explanation"
                className="col-span-2 bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                placeholder=" Rp.xxx.xxx"
                required
              />
              <select
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
                required
              >
                <option value="" disabled hidden>
                  / Waktu
                </option>
                <option value="Jam">/ Jam</option>
                <option value="Hari">/ Hari</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg "
            >
              Edit
            </button>
          </form>
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

export default UserEditProduct;
