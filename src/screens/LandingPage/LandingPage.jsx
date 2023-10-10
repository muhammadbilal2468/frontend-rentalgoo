import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  aboutBoxImg1,
  aboutBoxImg2,
  aboutBoxImg3,
  bannerImg,
  costumerImg1,
  costumerImg2,
  fbImg,
  githubImg,
  igImg,
  logoImg,
} from "../../assets";

const LandingPage = () => {
  const [name, setName] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const addSuggestion = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/suggestions", {
        name: name,
        suggestion: suggestion,
      });
      setName("");
      setSuggestion("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <>
      <nav className="fixed w-full z-20 top-0 left-0 border-b border-gray-200 xl:px-32 lg:px-16 sm:px-7 py-4 bg-primary">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between">
          <a href="/landing-page" className="flex items-center">
            <img src={logoImg} alt="" className="w-8" />
            <p className="text-3xl font-extrabold text-white sm:hidden md:block">
              Rental Goo
            </p>
          </a>
          <div className="flex md:order-2">
            <Link to="/auth/login">
              <button
                type="button"
                className="text-white bg-secondary font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 cursor-pointer"
              >
                Masuk
              </button>
            </Link>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 cursor-pointer"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border text-white border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 xl:bg-second-color md:bg-transparent sm:bg-white">
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 md:text-white sm:text-black  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-400 md:p-0"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="block py-2 pl-3 pr-4 md:text-white sm:text-black  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-400 md:p-0"
                >
                  Tentang
                </a>
              </li>
              <li>
                <a
                  href="#costumer"
                  className="block py-2 pl-3 pr-4 md:text-white sm:text-black  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-400 md:p-0"
                >
                  Layanan
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="block py-2 pl-3 pr-4 md:text-white sm:text-black  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-400 md:p-0"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="grid grid-cols-2 md:h-screen items-center xl:px-32 lg:px-16 sm:px-7 pt-32 pb-28 bg-gray-200">
        <div className="flex flex-col gap-7 lg:col-span-1 sm:col-span-2">
          <h3 className="text-2xl md:text-4xl font-bold text-bright-pink">
            Cari Barang Sewaan Anda
          </h3>
          <p className="text-gray-700">
            Website Sewa Barang - temukan barang yang ingin anda sewa dengan
            mudah menggunakan Rental Goo
          </p>
          <Link to="/auth/register">
            <button
              type="button"
              className="text-white w-fit h-fit bg-secondary focus:outline-none rounded-xl text-sm px-10 py-3 text-center mr-2 mb-2"
            >
              Mulai
            </button>
          </Link>
        </div>
        <div className="flex flex-col items-end lg:inline-flex sm:hidden">
          <img src={bannerImg} alt="" className="w-[460px] " />
        </div>
      </section>

      {/* ---------------------- ABOUT ---------------------------- */}
      <section
        id="about"
        className="flex lg:flex-row sm:flex-col gap-5 md:gap-24 xl:px-32 lg:px-16 sm:px-7 py-12 md:py-32"
      >
        <div data-aos="zoom-in" className="flex flex-col gap-2 items-center">
          <img src={aboutBoxImg1} alt="" className="w-18 h-20" />
          <h4 className="text-xl font-semibold">Cepat</h4>
          <p className="text-gray-600 text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur, optio.
          </p>
        </div>
        <div data-aos="zoom-in" className="flex flex-col gap-2 items-center">
          <img src={aboutBoxImg2} alt="" className="w-18 h-20" />
          <h4 className="text-xl font-semibold">Dimana Saja</h4>
          <p className="text-gray-600 text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis,
            nihil.
          </p>
        </div>
        <div data-aos="zoom-in" className="flex flex-col gap-2 items-center">
          <img src={aboutBoxImg3} alt="" className="w-18 h-20" />
          <h4 className="text-xl font-semibold">Terjangkau</h4>
          <p className="text-gray-600 text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis,
            nihil.
          </p>
        </div>
      </section>

      {/* --------------------- COSTUMER --------------------------- */}
      <section
        id="costumer"
        className="grid grid-cols-2 py-40 xl:px-32 lg:px-16 sm:px-7 bg-gray-200"
      >
        <div className="flex justify-start items-center gap-10 lg:inline-flex sm:hidden">
          <img src={costumerImg1} alt="" className="w-[460px]" />
        </div>
        <div className="flex flex-col gap-3 justify-center lg:col-span-1 sm:col-span-2">
          <h3 data-aos="fade-right" className="text-3xl md:text-4xl font-bold">
            Jasa sewa barang yang aman dan terpercaya
          </h3>
          <p data-aos="fade-left" className="text-gray-600">
            Menyediakan jasa penyewaan masal yang aman, mudah, cepat diakses,
            dan harga terjangkau.
          </p>
        </div>
      </section>
      <section className="grid grid-cols-2 pb-40 xl:px-32 sm:px-7 bg-gray-200">
        <div className="flex flex-col justify-center gap-10 lg:col-span-1 sm:col-span-2">
          <h3 data-aos="fade-left" className="text-3xl md:text-4xl font-bold">
            Dapatkan Barang sewa di sekitarmu
          </h3>
          <p data-aos="fade-left" className="text-gray-600">
            Temukan Barang sewa di area terdekatmu agar dapat mengefesienkan
            waktumu dengan baik.
          </p>
        </div>
        <div className="col-span-1 flex justify-end items-center lg:inline-flex sm:hidden">
          <img src={costumerImg2} alt="" className="w-[460px]" />
        </div>
      </section>

      {/* --------------------- FOOTER --------------------------- */}
      <section
        id="contact"
        className="relative lg:pt-40 sm:pt-10 pb-2 xl:px-32 lg:px-16 sm:px-7 bg-primary"
      >
        <div className="grid grid-cols-8 justify-between absolute mx-32 -top-16 right-0 left-0 bg-tertiary backdrop-blur hover:blur-0 hover:bg-opacity-80 bg-opacity-60 bg-blur-md p-12 rounded-2xl shadow-lg ease-out duration-300 gap-10 border-2 lg:inline-flex sm:hidden">
          <p className="col-span-3 text-1xl font-bold text-white">
            Berikan Saran Anda <br /> Untuk Kami
          </p>
          <form
            onSubmit={addSuggestion}
            className="col-span-5 flex gap-5 items-center justify-between bg-white rounded-xl py-0 px-5 w-full"
          >
            <input
              className="border-none w-1.5/5"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan Email"
            />
            <p className="text-secondary text-5xl">|</p>
            <input
              className="border-none w-3.5/5"
              type="text"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Berikan Kritik dan saran"
            />
            <button
              type="submit"
              className="text-white w-fit h-fit bg-secondary font-medium rounded-xl text-sm px-10 py-3 text-center "
            >
              Kirim
            </button>
          </form>
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 text-white pb-10">
          <div className="flex flex-col gap-3 align-start">
            <p className="flex flex-col text-lg font">LAYANAN</p>
            <p className="text-gray-300">Syarat & Ketentuan</p>
            <p className="text-gray-300">Kebijakan Privasi</p>
          </div>
          <div className="flex flex-col gap-3 align-center">
            <p className="flex flex-col text-lg font">DUKUNGAN</p>
            <p className="text-gray-300">FAQ</p>
            <p className="text-gray-300">Kontak</p>
          </div>
          <div className="flex flex-col gap-3 align-end">
            <p className="flex flex-col text-lg font">PERUSAHAAN</p>
            <p className="text-gray-300">rentalgoo@gmail.com</p>
            <p className="text-gray-300">WA: 082337175785</p>
            <p className="text-gray-300">Btn Baliase blok AC no 11</p>
          </div>
        </div>
        <div className="border-t-2 py-5">
          <p className="text-lg font text-w text-white text-center mb-10">
            FOLLOW US
          </p>
          <div className="flex gap-10 justify-center items-center">
            <img
              src={igImg}
              alt=""
              className="w-10 bg-white p-1 rounded-xl cursor-pointer"
            />
            <img
              src={fbImg}
              alt=""
              className="w-10 bg-white p-1 rounded-xl cursor-pointer"
            />
            <img
              src={githubImg}
              alt=""
              className="w-10 bg-white p-1 rounded-xl cursor-pointer"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
