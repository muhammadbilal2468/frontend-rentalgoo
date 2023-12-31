import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const UserAvatar = (props) => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    const resp = await axios.get(`http://localhost:5000/me`);
    setUser(resp.data);
  };

  const getDetailUser = (uuid) => {
    if (user.uuid === uuid) {
      navigate(`/user/profile/${uuid}`);
    } else {
      navigate(`/user/detailuser/${uuid}`);
    }
  };

  console.log(user.uuid);

  return (
    <div className="flex justify-between items-center">
      <p className="text-tertiary font-extrabold">{props.status}</p>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => getDetailUser(props.uuid)}
      >
        <p className="text-sm font-semibold">{props.name}</p>
        <img
          src={props.img}
          className="w-7 h-7 rounded-full border-2 border-primary"
          alt="fotopenyewa"
        />
      </div>
    </div>
  );
};

export default UserAvatar;
