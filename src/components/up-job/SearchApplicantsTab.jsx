import React, { useState } from "react";

const SearchApplicantsTab = () => {
  const [keyword, setKeyword] = useState("");
  const [industry, setIndustry] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");

  const handleReset = () => {
    setKeyword("");
    setIndustry("");
    setExperience("");
    setLocation("");
  };

  const handleSearch = () => {
    // Xử lý tìm kiếm ở đây
    console.log({ keyword, industry, experience, location });
  };

  return (
    <div className="bg-white p-6 rounded-lg max-w-4xl mx-auto shadow-md">
      <h2 className="text-xl font-bold mb-6">Tìm kiếm ứng viên</h2>
      <div className="bg-[#d9f7f7] p-6 rounded-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Từ khoá</label>
          <select
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Chọn từ khoá</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="UX/UI">UX/UI</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Ngành nghề</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Chọn ngành nghề</option>
            <option value="CNTT">CNTT</option>
            <option value="Marketing">Marketing</option>
            <option value="Kinh doanh">Kinh doanh</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Kinh nghiệm</label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Chọn kinh nghiệm</option>
            <option value="0-1">0-1 năm</option>
            <option value="2-5">2-5 năm</option>
            <option value="5+">5 năm trở lên</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Địa điểm</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Chọn địa điểm</option>
            <option value="HaNoi">Hà Nội</option>
            <option value="HCM">TP. Hồ Chí Minh</option>
            <option value="DaNang">Đà Nẵng</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
        >
          Đặt lại
        </button>
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-[#3a6656] text-white rounded hover:bg-[#2e5244]"
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default SearchApplicantsTab;
