import React from "react";
import formatRupiah from "../../utils/FormatRupiah";

const CardProduct = (props) => {
  return (
    <div
      className="relative max-w-sm h-fit border border-gray-200 rounded-lg shadow-md border-b-4 border-b-tertiary"
      key={props.data.uuid}
    >
      <p
        className="absolute text-xs p-1 bg-white text-secondary font-bold top-0 right-0 border-2 border-white rounded-tr-md cursor-pointer"
        onClick={() => props.save(props.data.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <g fill="none" fillRule="evenodd">
            <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
            <path
              fill="currentColor"
              d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v16.028c0 1.22-1.38 1.93-2.372 1.221L12 18.229l-5.628 4.02c-.993.71-2.372 0-2.372-1.22V5Zm3-1a1 1 0 0 0-1 1v15.057l5.128-3.663a1.5 1.5 0 0 1 1.744 0L18 20.057V5a1 1 0 0 0-1-1H7Z"
            />
          </g>
        </svg>
      </p>
      <img
        className="rounded-t-md w-full h-28"
        src={props.data.url}
        onClick={() => props.detail(props.data.uuid)}
        alt=""
      />
      <div
        className="px-3 py-2 bg-white rounded-b-lg"
        onClick={() => props.detail(props.data.uuid)}
      >
        <a href="#">
          <h5 className="mb-1 text-sm font-bold tracking-tight text-tertiary">
            {props.data.name}
          </h5>
        </a>
        <p className="text-xs mb-1 font-normal text-gray-700 dark:text-gray-400">
          {props.data.user.citydistrict}, {props.data.user.subdistrict}
        </p>
        <p
          className="text-secondary font-bold text-end"
          style={{ fontSize: "10px" }}
        >
          {props.data.leased}x disewa
        </p>
        <p className="text-sm text-primary font-bold text-end">
          {formatRupiah(props.data.price)}{" "}
          <span className="text-xs">/ {props.data.time_unit}</span>
        </p>
      </div>
    </div>
  );
};

export default CardProduct;
