import React, { useState } from 'react'
import Header from '../components/home/Header'
import HeroSection from '../components/home/HeroSection'
import FilterBar from '../components/home/FilterBar'
import CompanyCards from '../components/home/CompanyCards'
import Pagination from '../components/home/Pagination'
import Footer from '../components/home/Footer'
import {useGetJobListQuery} from '../redux/api/jobApiSlice'
import { Row, Spin, Alert } from 'antd'; // Sử dụng Ant Design UI components
import JobDisplay from '../components/home/JobDisplay'

const  Home = () => {
  const { data, error, isLoading } = useGetJobListQuery(); // Lấy danh sách công việc
  const [currentPage, setCurrentPage] = useState(1);  // Trạng thái lưu trang hiện tại
  const jobsPerPage = 6;  // Số công việc hiển thị mỗi trang
  // Xử lý trạng thái loading và error
  if (isLoading) {
    return <div className="flex justify-center items-center w-full h-screen"><Spin size="large" /></div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Alert message="Failed to fetch job list" type="error" />
      </div>
    );
  }

  // Tính toán số trang
  const totalPages = Math.ceil(data.data.length / jobsPerPage);

  // Lọc ra công việc cho trang hiện tại
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const jobsToShow = data.data.slice(startIndex, endIndex);

  // Hàm thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="flex flex-col w-full   bg-[#f9f4e7]">
      <Header />
      <HeroSection />
      <FilterBar />
      {/* <CompanyCards /> */}
      <div className="flex flex-col w-full bg-[#f9f4e7]">
      <Row gutter={[16, 16]} className="p-6">
  {jobsToShow.map((job) => (
    <JobDisplay key={job.id} job={job} />
  ))}
</Row>

    </div>
      <Pagination  currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange} />
      <Footer />
    </div>
  )
}

export default Home
