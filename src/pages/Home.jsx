import React, { useState } from "react";
import Header from "../components/home/Header";
import HeroSection from "../components/home/HeroSection";
import FilterBar from "../components/home/FilterBar";
import Pagination from "../components/home/Pagination";
import Footer from "../components/home/Footer";
import { useGetJobListQuery } from "../redux/api/jobApiSlice";
import { Row, Spin, Alert } from "antd";
import JobDisplay from "../components/home/JobDisplay";
import TopIndustries from "../components/home/TopIndustries";
import { useEffect } from "react";

const Home = () => {
  const [filter, setFilter] = useState({
    location: "",
    position: "",
    industry: "",
    level: "",
    keywords: "",
    skills: "",
    page: 1,
    limit: 6,
  });
useEffect(() => {
  console.log("Fetching jobs with filter:", filter);
}, [filter]);

  const [searchTerm, setSearchTerm] = useState(""); // giữ để hiển thị input

  const { data, error, isLoading } = useGetJobListQuery(filter);
  const jobs = data?.data || [];
  const pagination = data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalJobs: 0,
    hasNextPage: false,
    hasPrevPage: false,
  };

  const handlePageChange = (page) => {
    console.log('====================================');
    console.log(page);
    console.log('====================================');
    setFilter((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleFilterChange = ({ type, value }) => {
    setFilter((prev) => ({
      ...prev,
      [type]: value === "random" ? "" : value,
      page: 1,
    }));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilter((prev) => ({
      ...prev,
      keywords: value,
      page: 1,
    }));
  };

  const filterTexts = [];
  if (filter.location) filterTexts.push(`Địa điểm: ${filter.location}`);
  if (filter.position) filterTexts.push(`Vị trí: ${filter.position}`);
  if (filter.industry) filterTexts.push(`Ngành: ${filter.industry}`);
  if (filter.level) filterTexts.push(`Cấp độ: ${filter.level}`);
  if (filter.skills) filterTexts.push(`Kỹ năng: ${filter.skills}`);

  // Xử lý trạng thái
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
        <Alert message="Không thể tải danh sách công việc" type="error" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-[#fff]">
      <Header />
      <HeroSection />

      {/* Thanh filter + search */}
      <div className="max-w-[1000px] mx-auto px-4 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pt-4">
        {/* Bộ lọc đang chọn */}
        {filterTexts.length > 0 && (
          <div
            className="bg-teal-50 border border-teal-300 rounded-md p-3 text-teal-900 font-semibold text-sm sm:text-base shadow-sm break-words flex-shrink-0 max-w-full sm:max-w-[65%] flex items-center"
            role="region"
            aria-live="polite"
          >
            <span className="mr-1 font-medium">Bộ lọc hiện tại:</span>
            {filterTexts.map((text, idx) => (
              <span
                key={idx}
                className="inline-block bg-teal-100 px-3 py-1 rounded-full mr-2 last:mr-0 hover:bg-teal-200 transition-colors cursor-default truncate"
                title={text}
              >
                {text}
              </span>
            ))}
          </div>
        )}

        {/* Ô tìm kiếm */}
        <div className="relative w-full sm:w-[30%]">
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0a7 7 0 10-9.9-9.9 7 7 0 009.9 9.9z"
            />
          </svg>
          <input
            type="text"
            placeholder="Tìm theo tiêu đề, mô tả, yêu cầu..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder:text-gray-400 text-gray-900 text-base sm:text-lg"
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="Tìm kiếm công việc"
          />
        </div>
      </div>

      {/* Bộ lọc nâng cao */}
      <FilterBar onFilterChange={handleFilterChange} />

      {/* Danh sách job */}
      <div className="flex flex-col w-full bg-[#fff]">
        <Row gutter={[16, 16]} className="p-6">
          {jobs.map((job) => (
            <JobDisplay key={job.id} job={job} />
          ))}
        </Row>
      </div>

      {/* Phân trang */}
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />

      {/*<TopIndustries />*/}
      <Footer />
    </div>
  );
};

export default Home;
