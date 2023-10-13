import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reset, RegisterUser } from "../../../features/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass1, setShowPass1] = useState("");
  const [showPass2, setShowPass2] = useState("");

  const { user, isError, message, isSuccess, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user && isSuccess) {
      navigate("/auth/login");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Register = (e) => {
    e.preventDefault();

    try {
      setTimeout(() => {
        dispatch(RegisterUser({ name, email, password, confPassword }));
      }, 1500);
      alert("Register Berhasil");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const toggleShowPass1 = () => {
    setShowPass1(!showPass1);
  };
  const toggleShowPass2 = () => {
    setShowPass2(!showPass2);
  };

  return (
    <div className="flex flex-col gap-8 w-full md:w-3/5">
      <div className="flex flex-col items-center gap-3">
        <h3 className="text-4xl text-primary font-bold">Register</h3>
        <p className="text-gray-500">Silahkan daftar akun anda</p>
        <p>
          {" "}
          {isError && <p className="text-red-700 text-center">{message}</p>}
        </p>
      </div>
      <form onSubmit={Register}>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-semibold text-primary"
        >
          Nama Lengkap
        </label>
        <input
          type="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-5"
          placeholder="Masukkan Nama Lnegkap"
          required
        />
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-semibold text-primary"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-5"
          placeholder="Masukkan Email"
          required
        />
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-semibold text-primary"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-5"
          placeholder="Masukkan Password"
          required
        />
        <label
          htmlFor="conf-password"
          className="block mb-2 text-sm font-semibold text-primary"
        >
          Konfirmasi Password
        </label>
        <input
          type="conf-password"
          id="conf-password"
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-5"
          placeholder="Masukkan Konfirmasi Password"
          required
        />
        <button
          type="submit"
          className="text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 mr-2 w-full mb-5"
        >
          {isLoading ? "Loading..." : "Daftar"}
        </button>
        <p className="text-gray-500 text-center">
          Sudah Punya Akun ?{" "}
          <Link to={"/auth/login"}>
            <span className="text-primary font-bold">Silahkan Masuk</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
