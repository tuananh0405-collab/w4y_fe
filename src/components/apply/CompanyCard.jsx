import React from 'react';

const CompanyCard = ({
  companyName = "FPT SoftWare",
  industry = "Công nghệ thông tin",
  description = "Công ty hàng đầu chuyên về giải pháp phần mềm và tư vấn CNTT",
  location = "Hà Nội",
  employeeCount = "200-500",
  salary = "15-20 triệu",
  position = "Frontend Developer",
}) => {
  return (
    <div className="w-full max-w-[366px] min-h-[421px] rounded-xl p-5 bg-white shadow-lg flex flex-col gap-4">
      <div className="flex gap-5">
        <div className="w-[69px] h-[69px] rounded-lg bg-[#d9d9d9] overflow-hidden">
          <img src="https://dashboard.codeparrot.ai/api/image/Z9jZkippvFKitUUF/rectangl.png" alt="Company Logo" className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1">
          <div className="flex gap-x-2 items-center">
            <span className="text-xl font-bold">FPT</span>
            <h2 className="text-xl font-bold">{companyName}</h2>
          </div>
          <p className="text-base text-[#151515]/50 my-1">{industry}</p>
          <img src="https://dashboard.codeparrot.ai/api/image/Z9jZkippvFKitUUF/frame-64.png" alt="Rating" className="h-5" />
        </div>
      </div>

      <hr className="border-white" />

      <div className="space-y-2">
        <p className="text-base text-[#151515]/50">{description}</p>
        <p className="text-base text-[#151515]/50">Địa điểm: {location}</p>
        <p className="text-base text-[#151515]/50">Quy mô: {employeeCount} nhân viên</p>
      </div>

      <div className="border border-black rounded-xl p-4">
        <h3 className="text-base font-bold mb-4">{position}</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-[#151515]/50">
            <img src="https://dashboard.codeparrot.ai/api/image/Z9jZkippvFKitUUF/mdi-loca.png" alt="Location" className="w-5 h-5" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-[#151515]/50">
            <img src="https://dashboard.codeparrot.ai/api/image/Z9jZkippvFKitUUF/arcticon.png" alt="Salary" className="w-5 h-5" />
            <span>{salary}</span>
          </div>
          <button className="ml-auto bg-[#f2762e] text-white px-4 py-2 rounded-lg text-sm font-semibold">
            Ứng tuyển
          </button>
        </div>
      </div>

      <div className="flex justify-between mt-auto">
        <button className="border border-[#f2762e] px-5 py-2 rounded-lg text-xl font-semibold">
          Xem công ty
        </button>
        <button className="bg-[#f2762e] text-white px-5 py-2 rounded-lg text-xl font-semibold">
          Kết nối
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
