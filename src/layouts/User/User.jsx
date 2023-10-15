import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { logoImg } from "../../assets";
import { MeUser } from "../../features/authSlice";
import "./User.css";

const User = () => {
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

  const editProfile = () => {
    navigate(`/user/profile`);
  };

  return (
    <div className="user">
      <div className="header">
        <Link to={`/`} style={{ textDecoration: "none", color: "black" }}>
          <div className="left">
            <img src={logoImg} alt="logoImg" />
            <p>ental Goo</p>
          </div>
        </Link>
        <div className="center"></div>
        <div className="right">
          <Link to={"/"}>
            <i className="fa-solid fa-home"></i>
          </Link>
          <Link to={`/user/products?`}>
            <i className="fa-sharp fa-solid fa-magnifying-glass"></i>{" "}
          </Link>
          <Link to={"/user/my-shop"}>
            <i className="fa-solid fa-shop"></i>
          </Link>
          <Link to={"/user/save-products"}>
            <i className="fa-regular fa-bookmark"></i>
          </Link>
          <Link to={"/user/chat"}>
            <i className="fa-solid fa-comment"></i>
          </Link>
          <div className={`profile`} onClick={editProfile}>
            <img src={user && user.url} alt="fotouser" />
          </div>
        </div>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default User;
