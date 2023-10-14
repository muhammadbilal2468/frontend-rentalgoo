import React from "react";

const ModalImage = (props) => {
  if (!props.isOpen) {
    return null;
  }

  return (
    <div className="fixed flex justify-center items-center top-0 left-0 bottom-0 right-0 z-50">
      <div
        className="absolute top-0 left-0 bottom-0 right-0 bg-black opacity-50"
        onClick={() => props.onCancel()}
      />
      <div className="relative flex flex-col gap-5 justify-center items-center bg-white w-10/12 h-5/6 p-5 rounded-lg z-60">
        <p
          className="absolute flex justify-center items-center bg-red-500 text-white rounded-full h-10 w-10 text-3xl -top-5 -right-5 cursor-pointer border-2 border-white"
          onClick={() => props.onCancel()}
        >
          x
        </p>
        <img
          src={props.data.url}
          alt=""
          className="w-[500px] h-[500px] rounded-lg"
        />
      </div>
    </div>
  );
};

export default ModalImage;
