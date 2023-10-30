import React from "react";
import { useNavigate } from "react-router";

const UserAvatar = (props) => {
  const navigate = useNavigate();

  const getDetailUser = (uuid) => {
    navigate(`/user/detailuser/${uuid}`);
  };
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
