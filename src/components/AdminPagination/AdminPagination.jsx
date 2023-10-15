import React from "react";

const AdminPagination = ({
  totalItems,
  totalPages,
  currentPage,
  handlePrevPage,
  handlePageChange,
  handleNextPage,
}) => {
  const activePageClass = "bg-primary text-white";
  const nonActivePageClass = "bg-white text-black";
  return (
    <div className="grid grid-cols-3 items-center px-6 py-3 mt-5">
      <p>Total Semua Data : {totalItems}</p>
      <nav aria-label="Page navigation example" className="col-span-2">
        <ul className="flex gap-3">
          {currentPage > 1 && (
            <li onClick={handlePrevPage}>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border-none rounded-lg"
              >
                Prev
              </a>
            </li>
          )}
          {totalPages > 1 &&
            Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                disabled={currentPage === page}
                onClick={() => handlePageChange(page)}
                className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 rounded-lg ${
                  currentPage === page ? activePageClass : nonActivePageClass
                }`}
              >
                {page}
              </button>
            ))}
          {currentPage < totalPages && (
            <li onClick={handleNextPage}>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border-none rounded-lg rounded-r-lg"
              >
                Next
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default AdminPagination;
