import React from 'react'
import Header from '../components/home/Header'
import Footer from '../components/home/Footer'
import HeroSection from '../components/home/HeroSection'
import { FilterSidebar } from '../components/top-jobs/FilterSidebar';
import { TopJobCard } from '../components/top-jobs/TopJobCard';


const jobsData = [
  {
    title: "Trưởng Kênh GT Làm Việc Tại Hà Nội",
    company: "CÔNG TY CỔ PHẦN THỰC PHẨM VÀ ĐỒ UỐNG TTC",
    postedTime: "Đăng 1 tuần trước",
    location: "Hà Nội",
    experience: "3 năm",
    salary: "Thỏa thuận",
  },
  {
    title: "Trưởng Kênh GT Làm Việc Tại Hà Nội",
    company: "CÔNG TY CỔ PHẦN THỰC PHẨM VÀ ĐỒ UỐNG TTC",
    postedTime: "Đăng 1 tuần trước",
    location: "Hà Nội",
    experience: "3 năm",
    salary: "Thỏa thuận",
  },
  {
    title: "Trưởng Kênh GT Làm Việc Tại Hà Nội",
    company: "CÔNG TY CỔ PHẦN THỰC PHẨM VÀ ĐỒ UỐNG TTC",
    postedTime: "Đăng 1 tuần trước",
    location: "Hà Nội",
    experience: "3 năm",
    salary: "Thỏa thuận",
  },
  {
    title: "Trưởng Kênh GT Làm Việc Tại Hà Nội",
    company: "CÔNG TY CỔ PHẦN THỰC PHẨM VÀ ĐỒ UỐNG TTC",
    postedTime: "Đăng 1 tuần trước",
    location: "Hà Nội",
    experience: "3 năm",
    salary: "Thỏa thuận",
  },
  {
    title: "Trưởng Kênh GT Làm Việc Tại Hà Nội",
    company: "CÔNG TY CỔ PHẦN THỰC PHẨM VÀ ĐỒ UỐNG TTC",
    postedTime: "Đăng 1 tuần trước",
    location: "Hà Nội",
    experience: "3 năm",
    salary: "Thỏa thuận",
  },
];

const TopJobs = () => {
  return (
    <div className="flex flex-col w-full   bg-[#fff]">
      <Header/>
<HeroSection/>
  <div className="max-w-[1200px] mx-auto p-8 grid grid-cols-[300px_1fr] gap-10">
      <FilterSidebar />
      <main>
        <TopJobCard jobs={jobsData} />
      </main>
    </div>
      
      <Footer/>
    </div>
  )
}

export default TopJobs
