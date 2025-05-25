import React from "react";
import {
  FaSkype,
  FaBullhorn,
  FaHeadset,
  FaNetworkWired,
  FaHome,
  FaCalculator,
  FaUniversity,
  FaBriefcase
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const industries = [
  { icon: FaSkype, title: "Kinh doanh - Bán hàng", jobs: "12.394 việc làm" },
  { icon: FaBullhorn, title: "Marketing - PR - QC", jobs: "9.236 việc làm" },
  { icon: FaHeadset, title: "Chăm sóc khách hàng", jobs: "2.634 việc làm" },
  { icon: FaNetworkWired, title: "Công nghệ thông tin", jobs: "6.265 việc làm" },
  { icon: FaHome, title: "Bất động sản", jobs: "2.454 việc làm" },
  { icon: FaCalculator, title: "Kế toán - Kiểm toán", jobs: "1.937 việc làm" },
  { icon: FaUniversity, title: "Tài chính - Ngân hàng", jobs: "1.036 việc làm" },
  { icon: FaBriefcase, title: "Nhân sự - Hành chính", jobs: "4.636 việc làm" },
];

const IndustryCard = ({ icon: Icon, title, jobs }) => {
const navigate = useNavigate();

  // Click vào job sẽ chuyển hướng đến trang chi tiết công việc
  const handleTopJobClick = () => {
    navigate('/top-jobs');
  };
return (
   <div onClick={handleTopJobClick} className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center cursor-pointer
                  transition-transform transform hover:-translate-y-1 hover:shadow-xl">
    <Icon className="text-green-800 text-5xl mb-6" />
    <h4 className="text-center font-semibold text-lg mb-1 leading-snug">{title}</h4>
    <p className="text-center text-gray-400 text-sm">{jobs}</p>
  </div>
)
}
 


const TopIndustries = () => {
  return (
    <section className="bg-green-50 py-12 px-">
      <h2 className="text-green-900 font-extrabold text-2xl mb-10 max-w-xl pl-50">Top ngành nghề nổi bật</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {industries.map(({ icon, title, jobs }, idx) => (
          <IndustryCard key={idx} icon={icon} title={title} jobs={jobs}/>
        ))}
      </div>
    </section>
  );
};

export default TopIndustries;
