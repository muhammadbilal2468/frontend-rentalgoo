import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../../../features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user && user.role === "admin" && isSuccess) {
      navigate("/admin/home");
    }
    if (user && user.role === "user" && isSuccess) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Login = (e) => {
    e.preventDefault();

    setTimeout(() => {
      dispatch(LoginUser({ email, password }));
    }, 1500);
  };

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="flex flex-col gap-8 w-full md:w-4/5 lg:w-3/5">
      <div className="flex flex-col items-center gap-3">
        <h3 className="text-4xl text-primary font-bold">Login</h3>
        <p className="text-gray-500">Silahkan masukkan akun anda</p>
        <p>
          {" "}
          {isError && <p className="text-red-700 text-center">{message}</p>}
        </p>
      </div>
      <form onSubmit={Login}>
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
        <p className="text-gray-600 mb-5 text-right cursor-pointer">
          Lupa Kata Sandi ?
        </p>
        <button
          type="submit"
          className="text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 mr-2 w-full mb-5"
        >
          {isLoading ? "Loading..." : "Masuk"}
        </button>
        <p className="text-gray-500 text-center">
          Belum Punya Akun ?{" "}
          <Link to={"/auth/register"}>
            <span className="text-primary font-bold">Daftar Sekarang</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
