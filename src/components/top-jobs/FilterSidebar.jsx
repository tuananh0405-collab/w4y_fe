// FilterSidebar.jsx
import React from "react";
import { funnelIcon } from "../../assets";
export const FilterSidebar = () => {
  const filterSections = [
    {
      title: "Theo danh mục nghề",
      options: [
        "Sales Bán lẻ/Dịch vụ tiêu dùng",
        "Kinh doanh/Bán hàng khác",
        "Sales Giáo dục/Khóa học",
        "Quản lý kinh doanh",
        "Sales IT phần mềm",
      ],
    },
    {
      title: "Hình thức kinh doanh",
      options: [
        "Tất cả",
        "Direct Sales",
        "Telesales",
        "Online Sales",
        "Bán hàng tại cửa hàng",
      ],
    },
    {
      title: "Kinh nghiệm",
      options: [
        "Tất cả",
        "Không yêu cầu",
        "Dưới 1 năm",
        "1 năm",
        "2 năm",
        "Trên 2 năm",
      ],
    },
    {
      title: "Cấp bậc",
      options: [
        "Tất cả",
        "Nhân viên",
        "Trưởng nhóm",
        "Trưởng/Phó phòng",
        "Thực tập sinh",
      ],
    },
    {
      title: "Mức lương",
      options: ["Tất cả", "Thỏa thuận", "2 - 3 triệu", "3 - 5 triệu"],
    },
  ];

  return (
    <aside className="w-72 p-6 bg-white rounded-lg shadow-lg sticky top-20 max-h-[80vh] overflow-y-auto">
      <h2 className="flex items-center gap-2 mb-6 text-green-600 font-bold text-xl">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M8 16h8" />
        </svg> */}
        <img
        src={funnelIcon}
        alt="funnel icon"
        className="w-6 h-6"
        />

        Lọc nâng cao
      </h2>

      {filterSections.map(({ title, options }) => (
        <div key={title} className="mb-6 last:mb-0">
          <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
          <div className="flex flex-col gap-2">
            {options.map((option) => (
              <label
                key={option}
                className="inline-flex items-center cursor-pointer text-gray-700 text-sm select-none"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-green-600 rounded focus:ring-2 focus:ring-green-400"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
};
