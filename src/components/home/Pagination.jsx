import React from 'react';

const CustomPagination = ({ currentPage = 1, totalPages = 16, onPageChange = () => {} }) => {
  const generatePages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center my-5">
      <div className="flex gap-2">
        {generatePages().map((page, index) =>
          page === '...' ? (
            <span key={index} className="px-2 text-gray-500">...</span>
          ) : (
            <button
              key={index}
              type="button"
              className={`w-8 h-8 rounded-md transition ${
                currentPage === page
                  ? 'bg-[#6A9183] text-white'
                  : 'bg-[#A8BBB4] text-black hover:bg-[#8FAFA1]'
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default CustomPagination;
