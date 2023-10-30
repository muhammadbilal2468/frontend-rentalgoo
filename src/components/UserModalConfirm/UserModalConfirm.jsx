import React from "react";

const ModalConfirm = ({
  isOpen,
  onCancel,
  onConfirm,
  title,
  desc,
  cancelText,
  confirmText,
  img,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute flex justify-center items-center top-0 left-0 bottom-0 right-0 z-60">
      <div
        className="absolute top-0 left-0 bottom-0 right-0 bg-black opacity-10"
        onClick={onCancel}
      />
      <div className="flex flex-col gap-4 justify-center items-center bg-white py-5 px-10 rounded-lg z-60 w-5/6">
        <h3 className="text-2xl font-bold text-secondary text-center">
          {title}
        </h3>
        <img src={img} alt="" className="w-3/4 h-36" />
        <p className="text-center">{desc}</p>
        <div className="flex gap-5 w-full">
          <button
            type="button"
            onClick={onCancel}
            className="py-2.5 w-1/2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="py-2.5 w-1/2 mb-2 text-sm font-medium text-white bg-secondary rounded-lg border border-gray-200 cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
