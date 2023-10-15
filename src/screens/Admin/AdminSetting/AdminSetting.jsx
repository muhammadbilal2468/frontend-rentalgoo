import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { adminsettingImg } from "../../../assets";
import AdminCardHeader from "../../../components/AdminCardHeader/AdminCardHeader";
import AdminModalInfo from "../../../components/AdminModalInfo/AdminModalInfo";

const AdminSetting = () => {
  const [uuid, setUUid] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [urlChange, setUrlChange] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nohp, setNohp] = useState("");
  const [province, setProvince] = useState("");
  const [cityDistrict, setCityDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [address, setAddress] = useState("");

  const [showModalInfo, setShowModalInfo] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/me`);
      setUUid(resp.data.uuid);
      setUrl(resp.data.url);
      setName(resp.data.name);
      setEmail(resp.data.email);
      setNohp(resp.data.nohp);
      setProvince(resp.data.province);
      setCityDistrict(resp.data.citydistrict);
      setSubDistrict(resp.data.subdistrict);
      setAddress(resp.data.address);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updatePhotoMe = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const resp = await axios.patch(
        `http://localhost:5000/photome/${uuid}`,
        formData
      );
      setUrlChange(false);
      setTitleModal("Berhasil");
      setMsg(resp.data.msg);
      setShowModalInfo(true);
      setTimeout(() => {
        setShowModalInfo(false);
        getMe();
      }, 1500);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const updateMe = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("nohp", nohp);
    formData.append("province", province);
    formData.append("citydistrict", cityDistrict);
    formData.append("subdistrict", subDistrict);
    formData.append("address", address);
    try {
      const resp = await axios.patch(
        `http://localhost:5000/me/${uuid}`,
        formData
      );
      setTitleModal("Berhasil");
      setMsg(resp.data.msg);
      setShowModalInfo(true);
      setTimeout(() => {
        setShowModalInfo(false);
        navigate("/admin/home");
      }, 1500);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const handleChangeFile = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setFile(selectedImage);
    setUrl(imageUrl);
    setUrlChange(true);
  };

  return (
    <>
      <AdminCardHeader
        img={adminsettingImg}
        title={"Settings"}
        desc={"Akses merubah settingan akun admin"}
      />
      <form onSubmit={updateMe}>
        <div className="grid grid-cols-5 gap-10 bg-white p-8 rounded-xl">
          <div className="col-span-2">
            <div className="flex items-center justify-center w-full">
              <img
                src={url}
                alt="Preview"
                className="w-full h-64 border-2 border-tertiary border-dashed rounded-lg p-2 mb-5"
              />
            </div>
            <div className="flex gap-2">
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                onChange={handleChangeFile}
              />
              {urlChange === true ? (
                <button
                  className="p-2 bg-tertiary rounded-lg text-white"
                  onClick={updatePhotoMe}
                >
                  simpan
                </button>
              ) : (
                <></>
              )}
            </div>
            <p class="mt-1 text-sm text-gray-500 " id="file_input_help">
              SVG, PNG, JPG maksimal 2 MB
            </p>
          </div>
          <div className="col-span-3">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nama Lengkap
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
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-6 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Email"
              required
            />

            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              No Hp
            </label>
            <input
              type="text"
              id="name"
              value={nohp}
              onChange={(e) => setNohp(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-6 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Nomor Hp"
            />

            <label
              htmlFor="province"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Provinsi
            </label>
            <input
              type="text"
              id="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-6 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Provinsi"
            />

            <label
              htmlFor="citydistrict"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Kota
            </label>
            <input
              type="text"
              id="citydistrict"
              value={cityDistrict}
              onChange={(e) => setCityDistrict(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-6 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Kota / Kabupaten"
            />

            <label
              htmlFor="subdistrict"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Kecamatan
            </label>
            <input
              type="text"
              id="subdistrict"
              value={subDistrict}
              onChange={(e) => setSubDistrict(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-6 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Kecamatan"
            />

            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Alamat
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-6 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Kecamatan"
            />

            <button
              type="submit"
              className="text-white bg-tertiary focus:ring-blue-300 font-medium rounded-lg w-full py-2.5"
            >
              Edit
            </button>
            {/* <p className="text-red-500 font-bold">{msg}</p> */}
          </div>
        </div>
        <AdminModalInfo isOpen={showModalInfo} title={titleModal} desc={msg} />
      </form>
    </>
  );
};

export default AdminSetting;
