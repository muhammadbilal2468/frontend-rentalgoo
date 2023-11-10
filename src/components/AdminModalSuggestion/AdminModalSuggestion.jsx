import React from "react";

const AdminModalSuggestion = (props) => {
  if (!props.isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center">
      <div
        className="fixed top-0 left-0 bottom-0 right-0 bg-black opacity-40"
        onClick={() => props.onCancel()}
      />
      <div className="flex flex-col gap-4 justify-center items-center bg-white py-5 px-10 rounded-lg z-80 w-3/12">
        <div className="flex items-center gap-2">
          <img
            src={props.data.user.url}
            alt=""
            className="w-10 h-10 rounded-full border-2 border-secondary"
          />
          <h3 className="text-2xl font-bold text-secondary text-center">
            {props.data.user.name}
          </h3>
        </div>
        <p className="text-center">" {props.data.message} "</p>
      </div>
    </div>
  );
};

export default AdminModalSuggestion;
