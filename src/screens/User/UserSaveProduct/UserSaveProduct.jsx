import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Alert from "../../../components/Alert/Alert";
import ButtonNavigation from "../../../components/ButtonNavigation/ButtonNavigation";
import CardSaveProduct from "../../../components/CardSaveProduct/CardSaveProduct ";
import NotFoundPage from "../../../components/NotFoundPage/NotFoundPage";
import UserHeader from "../../../components/UserHeader/UserHeader";
import UserCardHeader from "../../../components/UserCardHeader/UserCardHeader";

const UserSaveProduct = () => {
  const [saveProducts, setSaveProducts] = useState([]);

  const [msg, setMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getSaveProducts();
  }, []);

  const getSaveProducts = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/saveproducts`);
      setSaveProducts(resp.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteSaveProduct = async (id) => {
    try {
      const resp = await axios.delete(
        `http://localhost:5000/saveproducts/${id}`
      );
      setMsg(resp.data.msg);
      setAlertColor("#00ff04");
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
    getSaveProducts();
  };

  const getDetailProduct = (uuid) => {
    navigate(`/user/detailproduct/${uuid}`);
  };

  return (
    <>
      <div className="relative w-full md:w-[400px] m-auto border-x-4 border-primary">
        {/* Header */}
        <UserHeader title="Barang Tersimpan" />

        {/* content */}
        <div className="bg-background rounded-b-lg pb-5 min-h-screen">
          {saveProducts.length === 0 ? (
            <NotFoundPage desc={"Belum Ada Barang Disimpan"} />
          ) : (
            <>
              <UserCardHeader
                count={saveProducts.length}
                title="Barang Tersimpan"
              />

              <div className="px-3 grid grid-cols-2 gap-5">
                {saveProducts.map((data) => {
                  return (
                    <CardSaveProduct
                      key={data.uuid}
                      data={data}
                      delete={() => deleteSaveProduct(data.uuid)}
                      detail={getDetailProduct}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* footer */}
        <ButtonNavigation />

        <Alert isOpen={showAlert} desc={msg} color={alertColor} />
      </div>
    </>
  );
};

export default UserSaveProduct;
