import React from "react";
import formatRupiah from "../../utils/FormatRupiah";

const CardSaveProduct = (props) => {
  return (
    <div
      className="relative max-w-sm h-fit border border-gray-200 rounded-lg shadow-md"
      key={props.data.uuid}
    >
      <p
        className="absolute text-xs p-1 bg-white text-secondary font-bold top-0 right-0 border-2 border-white rounded-tr-md cursor-pointer"
        onClick={() => props.delete(props.data.uuid)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </p>
      <img
        className="w-full bg-cover bg-no-repeat bg-center rounded-t-md h-36"
        src={props.data.product.url}
        alt=""
        onClick={() => props.detail(props.data.product.uuid)}
      />
      <div
        className="px-3 py-2 bg-white rounded-b-lg"
        onClick={() => props.detail(props.data.product.uuid)}
      >
        <a href="#">
          <h5 className="mb-1 text-sm font-bold tracking-tight text-tertiary">
            {props.data.product.name}
          </h5>
        </a>
        <p className="text-xs mb-1 font-normal text-gray-700 dark:text-gray-400">
          {props.data.owner.citydistrict}, {props.data.owner.subdistrict}
        </p>
        <p
          className="text-secondary font-bold text-end"
          style={{ fontSize: "10px" }}
        >
          {props.data.product.leased}x disewa
        </p>
        <p className="text-sm text-primary font-bold text-end">
          {formatRupiah(props.data.product.price)}{" "}
          <span className="text-xs">/ {props.data.product.time_unit}</span>
        </p>
      </div>
    </div>
  );
};

export default CardSaveProduct;
