import React from "react";

const Alert = ({ isOpen, color, desc }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 bottom-9 flex items-center w-11/12 md:w-[380px] p-3 mb-4 text-sm border border-blue-300 rounded-lg bg-gray-50 z-70`}
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 mr-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill={color}
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <p className="text-xs">{desc}</p>
    </div>
  );
};

export default Alert;
