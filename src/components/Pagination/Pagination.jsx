import { useState } from "react";

function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  return (
    <div className="flex gap-4">

      <button disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="text-blue-500"
      >
        Previous
      </button>

      <span>
        Halaman {currentPage} dari {totalPages}
      </span>

      <button disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="text-blue-500"
      >
        Next 
      </button>
    </div>
  );
}


export default Pagination ;