import React from "react";

const UserHeader = (props) => {
  const back = () => {
    window.history.back();
  };
  return (
    <div className="flex justify-between items-center gap-1 sticky top-0 bg-primary px-2 py-2 z-50 text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        className="cursor-pointer"
        onClick={back}
      >
        <path
          fill="currentColor"
          d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12l4.58-4.59z"
        />
      </svg>
      <p className="">{props.title}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        className="cursor-pointer"
        class
      >
        <path
          fill="#1D3354"
          d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12l4.58-4.59z"
        />
      </svg>
    </div>
  );
};

export default UserHeader;
