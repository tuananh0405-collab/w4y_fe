import React from 'react';

const CustomPagination = ({ currentPage = 1, totalPages = 16, onPageChange = () => {} }) => {
  return (
    <div className="flex justify-center items-center my-5">
      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`w-8 h-8 rounded-md ${currentPage === index + 1 ? 'bg-[#6A9183] text-white' : 'bg-[#A8BBB4] text-black'}`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomPagination;
