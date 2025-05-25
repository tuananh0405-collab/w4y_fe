import React from "react";

const CompanyProfileTab = () => {
  return (
    <div className="bg-[#d8fff799] rounded-xl p-6 w-[988px] relative h-[710px] fixed top-0 left-0">
      <h2 className="font-bold text-black text-xl mb-1">Hồ sơ công ty</h2>
      <p className="text-black text-lg mb-6">Thông tin cơ bản</p>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex flex-col w-1/2">
          <label className="text-black text-base mb-1">Tên công ty</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2"
            defaultValue="Công ty TNHH"
          />
        </div>
        <div className="flex flex-col w-1/2 relative">
          <label className="text-black text-base mb-1">Địa chỉ công ty</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2"
            defaultValue="Số 123, Quan Hoa, Cầu Giấy, Hà Nội"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex flex-col w-1/2 relative">
          <label className="text-black text-base mb-1">Quy mô công ty</label>
          <select className="border border-gray-300 rounded px-3 py-2 w-full">
            <option>50-99 nhân viên</option>
            {/* Thêm các option khác nếu cần */}
          </select>
          <div className="absolute top-10 right-3 pointer-events-none text-gray-400">▼</div>
        </div>

        <div className="flex flex-col w-1/2 relative">
          <label className="text-black text-base mb-1">Loại hình doanh nghiệp</label>
          <select className="border border-gray-300 rounded px-3 py-2 w-full">
            <option>Công ty phần mềm</option>
            {/* Thêm các option khác nếu cần */}
          </select>
          <div className="absolute top-10 right-3 pointer-events-none text-gray-400">▼</div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex flex-col w-1/2">
          <label className="text-black text-base mb-1">Website</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2"
            defaultValue="www.companyW4U-abc.com"
          />
        </div>

        <div className="flex flex-col w-1/2">
          <label className="text-black text-base mb-1 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8-4H8m8 8H8m12-6a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Email liên hệ*
          </label>
          <input
            type="email"
            className="border border-gray-300 rounded px-3 py-2"
            defaultValue="123@company.com"
          />
        </div>
      </div>

      <div className="flex flex-col w-1/2">
        <label className="text-black text-base mb-1 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 13v-6m-4-2v6m8-6v6" />
          </svg>
          Điện thoại liên hệ*
        </label>
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2"
          defaultValue="(+84)12345678"
        />
      </div>

      <div className="mt-5">
        <button className="bg-[#3a6656] text-white rounded px-6 py-3 hover:bg-[#2a4c41] transition">
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default CompanyProfileTab;
