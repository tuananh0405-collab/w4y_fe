import React from 'react';

const FilterSection = () => {
  return (
    <div className="flex flex-wrap gap-6 p-4 min-w-[800px] bg-transparent">
      <div className="flex items-center gap-x-3">
        <label className="text-xl font-medium">Ngành nghề:</label>
        <select className="border rounded-md px-4 py-2 min-w-[200px]">
          <option>Tất cả các ngành nghề</option>
        </select>
      </div>

      <div className="flex items-center gap-x-3">
        <label className="text-xl font-medium">Địa điểm:</label>
        <select className="border rounded-md px-4 py-2 min-w-[200px]">
          <option>Tất cả các địa điểm</option>
        </select>
      </div>

      <div className="flex items-center gap-x-3">
        <label className="text-xl font-medium">Công ty:</label>
        <input 
          type="text"
          placeholder="Tên công ty"
          className="border rounded-md px-4 py-2 min-w-[125px]"
        />
      </div>

      <button className="bg-[#f2762e] text-white px-6 py-2 rounded-md text-xl font-bold hover:bg-[#e06520] transition-colors">
        Lọc
      </button>
    </div>
  );
};

export default FilterSection;
