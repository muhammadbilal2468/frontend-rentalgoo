import React, { useEffect, useState } from "react";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import LocationMap from "../../../components/LocationMap/LocationMap";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const UserEditProfile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nohp, setNohp] = useState("");
  const [province, setProvince] = useState("");
  const [cityDistrict, setCityDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const navigate = useNavigate();
  const { uuid } = useParams();

  useEffect(() => {
    getUserById();
  }, [uuid, latitude, longitude]);

  const getUserById = async () => {
    try {
      const resp = await axios.get(`https://confused-dove-overalls.cyclic.app/me`);
      setName(resp.data.name);
      setEmail(resp.data.email);
      setNohp(resp.data.nohp);
      setProvince(resp.data.province);
      setCityDistrict(resp.data.citydistrict);
      setSubDistrict(resp.data.subdistrict);
      setAddress(resp.data.address);
      setLocation(resp.data.location);
      if (resp.data.location) {
        const [lat, lon] = resp.data.location.split(",");
        setLatitude(lat);
        setLongitude(lon);
      }

      console.log(resp.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("nohp", nohp);
    formData.append("province", province);
    formData.append("citydistrict", cityDistrict);
    formData.append("subdistrict", subDistrict);
    formData.append("address", address);
    formData.append("location", location);
    try {
      await axios.patch(`https://confused-dove-overalls.cyclic.app/me/${uuid}`, formData);
      alert("berhasil di ubah");
      navigate(`/user/profile/${uuid}`);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const getLocation = (e) => {
    try {
      e.preventDefault();
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation(
          `${position.coords.latitude}, ${position.coords.longitude}`
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <div className="flex items-center gap-3 justify-between sticky top-0 bg-primary px-3 py-2 z-50 text-white">
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
          <p className="">Edit Profile</p>
          <div className=""></div>
        </div>

        {/* content */}
        <div className="bg-background rounded-b-lg min-h-screen px-5 py-5">
          <form onSubmit={updateProfile}>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5 mb-3"
            />
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5 mb-3"
            />
            <label
              htmlFor="nohp"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              No Handphone
            </label>
            <input
              type="text"
              id="nohp"
              value={nohp}
              onChange={(e) => setNohp(e.target.value)}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5 mb-3"
            />
            <label
              htmlFor="province"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Provinsi
            </label>
            <input
              type="text"
              id="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5 mb-3"
            />
            <label
              htmlFor="citydistrict"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Kota
            </label>
            <input
              type="text"
              id="citydistrict"
              value={cityDistrict}
              onChange={(e) => setCityDistrict(e.target.value)}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5 mb-3"
            />
            <label
              htmlFor="subdistrict"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Kecamatan
            </label>
            <input
              type="text"
              id="subdistrict"
              value={subDistrict}
              onChange={(e) => setSubDistrict(e.target.value)}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5 mb-3"
            />
            <label
              htmlFor="address"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Alamat
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5 mb-3"
            />
            <label
              htmlFor="location"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Lokasi
            </label>
            <div className="grid grid-cols-4 items-center gap-3 mb-3">
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                aria-describedby="helper-text-explanation"
                className="col-span-3 bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5"
              />
              <button
                className="col-span-1 text-secondary font-extrabold bg-white border border-gray-300 text-sm rounded-lg  block w-full p-2.5 "
                onClick={getLocation}
              >
                Get
              </button>
            </div>
            <p className="text-xs text-justify text-yellow-500 mb-3">
              Jika lokasi tidak akurat, salin longtitude dan longtitude pada
              Google Maps kemudian paste di input Lokasi, kemudian simpan dan
              lihat kembali mapsnya.
            </p>

            <LocationMap
              latitude={latitude}
              longitude={longitude}
              address={address}
            />

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg mt-5"
            >
              Edit
            </button>
          </form>
        </div>

        {/* footer */}
        <ButtonNavigation />
      </div>
    </>
  );
};

export default UserEditProfile;
