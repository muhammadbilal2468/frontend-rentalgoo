import React from "react";
import { modalconfirmImg } from "../../assets";

const AdminModalConfirm = ({
  isOpen,
  onCancel,
  onConfirm,
  title,
  desc,
  cancelText,
  confirmText,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center">
      <div
        className="fixed top-0 left-0 bottom-0 right-0 bg-black opacity-40"
        onClick={onCancel}
      />
      <div className="flex flex-col gap-4 justify-center items-center bg-white py-5 px-5 rounded-lg z-80 w-3/12 overflow-y-scroll">
        <h3 className="text-2xl font-bold text-secondary text-center">
          {title}
        </h3>
        <img src={modalconfirmImg} alt="" className="w-3/4 h-44" />
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

export default AdminModalConfirm;
