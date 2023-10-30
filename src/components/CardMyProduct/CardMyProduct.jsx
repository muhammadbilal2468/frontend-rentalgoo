import React from "react";
import formatRupiah from "../../utils/FormatRupiah";

const CardMyProduct = (props) => {
  return (
    <div
      className="max-w-sm h-fit border border-gray-200 rounded-lg shadow-md"
      key={props.data.uuid}
    >
      <img
        className="w-full bg-cover bg-no-repeat bg-center rounded-t-md h-36"
        src={props.data.url}
        alt=""
      />
      <div className="px-3 py-2 bg-white rounded-b-lg">
        <a href="#">
          <h5 className="mb-1 text-sm font-bold tracking-tight text-tertiary">
            {props.data.name}
          </h5>
        </a>
        <p className="text-sm text-primary font-bold mb-3">
          {formatRupiah(props.data.price)}{" "}
          <span className="text-xs">/ {props.data.time_unit}</span>
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="py-1 bg-tertiary text-white text-xs rounded-md"
            onClick={() => props.edit(props.data.uuid)}
          >
            Edit
          </button>
          <button
            className="py-1 bg-secondary text-white text-xs rounded-md"
            onClick={() => props.delete(props.data.uuid)}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardMyProduct;
