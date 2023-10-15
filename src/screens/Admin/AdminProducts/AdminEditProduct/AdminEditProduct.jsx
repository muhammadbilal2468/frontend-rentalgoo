import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { adminproductImg } from "../../../../assets";
import AdminCardHeader from "../../../../components/AdminCardHeader/AdminCardHeader";
import AdminModalInfo from "../../../../components/AdminModalInfo/AdminModalInfo";

const AdminEditProduct = () => {
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
        navigate("/admin/products");
      }, 1500);
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };

  const handleChangeFile = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setFile(selectedImage);
    setUrl(imageUrl);
  };

  return (
    <div className="flex flex-col gap-4">
      <AdminCardHeader
        img={adminproductImg}
        title={"Edit Barang"}
        desc={"Akses mengubah data barang user"}
      />

      <form onSubmit={updateProduct}>
        <div className="grid grid-cols-5 gap-10 bg-white p-8 rounded-xl">
          <div className="col-span-2">
            <div className="flex items-center justify-center w-full">
              <img
                src={url}
                alt="Preview"
                className="w-full h-64 border-2 border-tertiary border-dashed rounded-lg p-2 mb-5"
              />
            </div>
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              onChange={handleChangeFile}
            />
            <p class="mt-1 text-sm text-gray-500 " id="file_input_help">
              SVG, PNG, JPG maksimal 2 MB
            </p>
          </div>
          <div className="col-span-3">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nama Barang
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-6 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Nama Barang"
              required
            />

            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Kategori Barang
            </label>
            <select
              id="category"
              name="file"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-6 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" hidden>
                Pilih Kategori
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
              Deskripsi Barang
            </label>
            <textarea
              id="description"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 mb-6 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Deskripsi"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <label
              htmlFor="guarantee"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Jaminan Penyewaan
            </label>
            <select
              id="guarantee"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-6 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={guarantee}
              onChange={(e) => setGuarantee(e.target.value)}
            >
              <option value="" hidden>
                Pilih Jaminan
              </option>
              <option value="KTP">KTP</option>
              <option value="Kartu Mahasiswa">Kartu Mahasiswa</option>
            </select>

            <label
              htmlFor="stock"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Stok Barang
            </label>
            <input
              type="text"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-6 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Jumlah Stok"
              required
            />
            <div className="grid grid-cols-4 gap-5">
              <div className="col-span-3">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Harga
                </label>
                <input
                  type="text"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-6 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Masukkan Harga"
                  required
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="time-unit"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Waktu
                </label>
                <select
                  id="time-unit"
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-6 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" hidden>
                    Pilih Waktu
                  </option>
                  <option value="Jam">Jam</option>
                  <option value="Hari">Hari</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="text-white bg-tertiary focus:ring-blue-300 font-medium rounded-lg w-full py-2.5"
            >
              Edit
            </button>
            <p className="text-red-500 font-bold">{msg}</p>
          </div>
        </div>
      </form>
      <AdminModalInfo isOpen={showModalInfo} title={titleModal} desc={msg} />
    </div>
  );
};

export default AdminEditProduct;
