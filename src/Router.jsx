import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./layouts/Admin/Admin";
import Auth from "./layouts/Auth/Auth";
import AdminAgreementProducts from "./screens/Admin/AdminAgreementProducts/AdminAgreementProducts";
import AdminDetailAgreementProducts from "./screens/Admin/AdminAgreementProducts/AdminDetailAgreementProducts";
import AdminFinishRentOwners from "./screens/Admin/AdminFinishRents/AdminFinishRentOwners";
import AdminFinishRentRenters from "./screens/Admin/AdminFinishRents/AdminFinishRentRenters";
import AdminHome from "./screens/Admin/AdminHome/AdminHome";
import AdminIDetailIsRenting from "./screens/Admin/AdminIsRenting/AdminIDetailIsRenting";
import AdminIsRenting from "./screens/Admin/AdminIsRenting/AdminIsRenting";
import AdminAddProduct from "./screens/Admin/AdminProducts/AdminAddProduct/AdminAddProduct";
import AdminEditProduct from "./screens/Admin/AdminProducts/AdminEditProduct/AdminEditProduct";
import AdminProduct from "./screens/Admin/AdminProducts/AdminProduct/AdminProduct";
import AdminDetailSaveProduct from "./screens/Admin/AdminSaveProducts/AdminDetailSaveProduct";
import AdminSaveProducts from "./screens/Admin/AdminSaveProducts/AdminSaveProducts";
import AdminSetting from "./screens/Admin/AdminSetting/AdminSetting";
import AdminAddUser from "./screens/Admin/AdminUsers/AdminAddUser/AdminAddUser";
import AdminEditUser from "./screens/Admin/AdminUsers/AdminEditUser/AdminEditUser";
import AdminUser from "./screens/Admin/AdminUsers/AdminUser/AdminUser";
import Login from "./screens/Auth/Login/Login";
import Register from "./screens/Auth/Register/Register";
import LandingPage from "./screens/LandingPage/LandingPage";
import UserAddAgreement from "./screens/User/UserAddAgreement/UserAddAgreement";
import UserAddProduct from "./screens/User/UserAddProduct/UserAddProduct";
import UserChat from "./screens/User/UserChat/UserChat";
import UserClosestProduct from "./screens/User/UserClosestProduct/UserClosestProduct";
import UserDetailChat from "./screens/User/UserDetailChat/UserDetailChat";
import UserDetailIsRenting from "./screens/User/UserDetailIsRenting/UserDetailIsRenting";
import UserDetailIsRentingOut from "./screens/User/UserDetailIsRentingOut/UserDetailIsRentingOut";
import UserDetailLeaseAgreement from "./screens/User/UserDetailLeaseAgreement/UserDetailLeaseAgreement";
import UserDetailProduct from "./screens/User/UserDetailProduct/UserDetailProduct";
import UserDetailRentalAgreement from "./screens/User/UserDetailRentalAgreement/UserDetailRentalAgreement";
import UserDetailUser from "./screens/User/UserDetailUser/UserDetailUser";
import UserEditProduct from "./screens/User/UserEditProduct/UserEditProduct";
import UserEditProfile from "./screens/User/UserEditProfile/UserEditProfile";
import UserFinishRentOwner from "./screens/User/UserFinishRentOwner/UserFinishRentOwner";
import UserFinishRentRenter from "./screens/User/UserFinishRentRenter/UserFinishRentRenter";
import UserHome from "./screens/User/UserHome/UserHome";
import UserIsRenting from "./screens/User/UserIsRenting/UserIsRenting";
import UserIsRentingOut from "./screens/User/UserIsRentingOut/UserIsRentingOut";
import UserLeaseAgreement from "./screens/User/UserLeaseAgreement/UserLeaseAgreement";
import UserMyActivity from "./screens/User/UserMyActivity/UserMyActivity";
import UserMyProduct from "./screens/User/UserMyProduct/UserMyProduct";
import UserProduct from "./screens/User/UserProduct/UserProduct";
import UserProfile from "./screens/User/UserProfile/UserProfile";
import UserRentalAgreement from "./screens/User/UserRentalAgreement/UserRentalAgreement";
import UserSaveProduct from "./screens/User/UserSaveProduct/UserSaveProduct";
import UserSearch from "./screens/User/UserSearch/UserSearch";
import AdminSuggestions from "./screens/Admin/AdminSuggestions/AdminSuggestions";
import UserAddSuggestion from "./screens/User/UserAddSuggestion/UserAddSuggestion";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* --------- LANDING PAGE ---------- */}
        <Route path="/landing-page" element={<LandingPage />} />

        {/* --------- AUTENTICATION ---------- */}
        <Route path="/auth" element={<Auth />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>

        {/* ------------------- ADMIN ------------------- */}

        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/home" element={<AdminHome />} />

          <Route path="/admin/products" element={<AdminProduct />} />
          <Route path="/admin/add-product" element={<AdminAddProduct />} />
          <Route
            path="/admin/edit-product/:uuid"
            element={<AdminEditProduct />}
          />

          <Route path="/admin/saveproducts" element={<AdminSaveProducts />} />
          <Route
            path="/admin/saveproducts/:uuid"
            element={<AdminDetailSaveProduct />}
          />

          <Route
            path="/admin/agreementproducts"
            element={<AdminAgreementProducts />}
          />
          <Route
            path="/admin/agreementproducts/:uuid"
            element={<AdminDetailAgreementProducts />}
          />

          <Route path="/admin/isrentingproducts" element={<AdminIsRenting />} />
          <Route
            path="/admin/isrentingproducts/:uuid"
            element={<AdminIDetailIsRenting />}
          />

          <Route
            path="/admin/finishrentowners/"
            element={<AdminFinishRentOwners />}
          />
          <Route
            path="/admin/finishrentrenters/"
            element={<AdminFinishRentRenters />}
          />

          <Route path="/admin/users" element={<AdminUser />} />
          <Route path="/admin/add-user" element={<AdminAddUser />} />
          <Route path="/admin/edit-user/:uuid" element={<AdminEditUser />} />

          <Route path="/admin/suggestions" element={<AdminSuggestions />} />

          <Route path="/admin/setting" element={<AdminSetting />} />
        </Route>

        {/* ------------------ USER -------------------- */}

        <Route path="/" element={<UserHome />} />
        <Route path="/user/myproducts" element={<UserMyProduct />} />
        <Route path="/user/search" element={<UserSearch />} />
        <Route path="/user/closestproducts" element={<UserClosestProduct />} />
        <Route path="/user/products" element={<UserProduct />} />
        <Route
          path="/user/detailproduct/:uuid"
          element={<UserDetailProduct />}
        />
        <Route path="/user/addproduct" element={<UserAddProduct />} />
        <Route path="/user/editproduct/:uuid" element={<UserEditProduct />} />
        <Route path="/user/saveproducts" element={<UserSaveProduct />} />

        <Route path="/user/myactivity" element={<UserMyActivity />} />
        <Route path="/user/addagreement/:uuid" element={<UserAddAgreement />} />
        <Route path="/user/leaseagreements" element={<UserLeaseAgreement />} />
        <Route
          path="/user/detailleaseagreement/:uuid"
          element={<UserDetailLeaseAgreement />}
        />
        <Route
          path="/user/rentalagreements"
          element={<UserRentalAgreement />}
        />
        <Route
          path="/user/detailrentalagreement/:uuid"
          element={<UserDetailRentalAgreement />}
        />
        <Route path="/user/isrentingouts" element={<UserIsRentingOut />} />
        <Route
          path="/user/detailisrentingout/:uuid"
          element={<UserDetailIsRentingOut />}
        />
        <Route path="/user/isrentings" element={<UserIsRenting />} />
        <Route
          path="/user/detailisrenting/:uuid"
          element={<UserDetailIsRenting />}
        />
        <Route path="/user/finishrentowner" element={<UserFinishRentOwner />} />
        <Route
          path="/user/finishrentrenter"
          element={<UserFinishRentRenter />}
        />

        <Route path="/user/detailuser/:uuid" element={<UserDetailUser />} />

        <Route path="/user/profile/:uuid" element={<UserProfile />} />
        <Route path="/user/editprofile/:uuid" element={<UserEditProfile />} />
        <Route path="/user/add-suggestion" element={<UserAddSuggestion />} />

        <Route path="/user/chats" element={<UserChat />} />
        <Route path="/user/detailchat/:uuid" element={<UserDetailChat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
