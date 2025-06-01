import React, { useMemo, useState } from "react";
import Header from "../components/home/Header";
import HeroSection from "../components/home/HeroSection";
import FilterBar from "../components/home/FilterBar";
import CompanyCards from "../components/home/CompanyCards";
import Pagination from "../components/home/Pagination";
import Footer from "../components/home/Footer";
import { useGetJobListQuery } from "../redux/api/jobApiSlice";
import { Row, Spin, Alert } from "antd"; // Sử dụng Ant Design UI components
import JobDisplay from "../components/home/JobDisplay";
import TopIndustries from "../components/home/TopIndustries";

const Home = () => {
  const [filter, setFilter] = useState({ location: "", position: "" });
  const { data, error, isLoading } = useGetJobListQuery(filter); // Lấy danh sách công việc
  const [currentPage, setCurrentPage] = useState(1); // Trạng thái lưu trang hiện tại
  const jobsPerPage = 6; // Số công việc hiển thị mỗi trang
  const [searchTerm, setSearchTerm] = useState(""); // Thêm state searchTerm
  const filteredJobs = useMemo(() => {
    if (!data?.data) return [];

    if (!searchTerm.trim()) return data.data;

    const lowerSearch = searchTerm.toLowerCase();
    return data.data.filter((job) => {
      return (
        (job.title && job.title.toLowerCase().includes(lowerSearch)) ||
        (job.description && job.description.toLowerCase().includes(lowerSearch)) ||
        (job.requirements &&
          job.requirements.toLowerCase().includes(lowerSearch))
      );
    });
  }, [data, searchTerm]);
  // Xử lý trạng thái loading và error
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Alert message="Failed to fetch job list" type="error" />
      </div>
    );
  }
 
 
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
const startIndex = (currentPage - 1) * jobsPerPage;
const endIndex = startIndex + jobsPerPage;
const jobsToShow = filteredJobs.slice(startIndex, endIndex);


  // Hàm thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Nhận filter thay đổi từ FilterBar
  const handleFilterChange = ({ type, value }) => {
    setFilter((prev) => ({
      ...prev,
      [type]: value === "random" ? "" : value, // Nếu chọn "Ngẫu nhiên" thì bỏ filter
    }));
    setCurrentPage(1); // Reset về trang 1 khi filter thay đổi
  };
 
  // Chuẩn bị text hiển thị filter hiện tại
  const filterTexts = [];
  if (filter.location) filterTexts.push(`Địa điểm: ${filter.location}`);
  if (filter.position) filterTexts.push(`Vị trí: ${filter.position}`);

  return (
    <div className="flex flex-col w-full   bg-[#fff]">
      <Header />
      <HeroSection />
       {/* Thêm thanh Search */}
<div className="max-w-[1000px] mx-auto px-4 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pt-4">
  {/* Bộ lọc hiện tại - bên trái */}
  {filterTexts.length > 0 && (
    <div
      className="
        bg-teal-50
        border
        border-teal-300
        rounded-md
        p-3
        text-teal-900
        font-semibold
        text-sm
        sm:text-base
        shadow-sm
        select-none
        break-words
        flex-shrink-0
        max-w-full
        sm:max-w-[65%]
        flex
        items-center   /* canh giữa theo dọc */
      "
      role="region"
      aria-live="polite"
    >
      <span className="mr-1 font-medium">Bộ lọc hiện tại:</span>
      {filterTexts.map((text, idx) => (
        <span
          key={idx}
          className="inline-block bg-teal-100 px-3 py-1 rounded-full mr-2 last:mr-0
          hover:bg-teal-200
          transition-colors
          cursor-default
          truncate"
          title={text}
        >
          {text}
        </span>
      ))}
    </div>
  )}

  {/* Thanh tìm kiếm - bên phải */}
  <div className="relative w-full sm:w-[30%]">
    <svg
      className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m0 0a7 7 0 10-9.9-9.9 7 7 0 009.9 9.9z"
      />
    </svg>
    <input
      type="text"
      placeholder="Tìm kiếm công việc theo tiêu đề, mô tả hoặc yêu cầu..."
      className="
        w-full
        p-3
        pl-10  /* padding left để tránh icon đè */
        border
        border-gray-300
        rounded-md
        shadow-sm
        outline-none
        transition
        focus:ring-2 focus:ring-teal-500 focus:border-teal-500
        placeholder:text-gray-400
        text-gray-900
        text-base
        sm:text-lg
      "
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      aria-label="Tìm kiếm công việc"
    />
  </div>
</div>




      <FilterBar onFilterChange={handleFilterChange} />
      {/* <CompanyCards /> */}
      <div className="flex flex-col w-full bg-[#fff]">
        <Row gutter={[16, 16]} className="p-6">
          {jobsToShow.map((job) => (
            <JobDisplay key={job.id} job={job} />
          ))}
        </Row>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <TopIndustries/>
      <Footer />
    </div>
  );
};

export default Home;
