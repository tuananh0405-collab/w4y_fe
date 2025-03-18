import React from "react";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import CompanyCard from "../components/apply/CompanyCard";
import FilterSection from "../components/apply/FilterSection";
import Pagination from "../components/home/Pagination";

const Apply = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-200">
      <Header />
      <main className="flex flex-col flex-grow px-5 py-8 max-w-[1200px] mx-auto bg-white my-5 rounded-lg">
        <h1 className="text-4xl font-bold text-[#f2762e] mb-3 font-inter">
          Kết nối với nhà tuyển dụng
        </h1>
        <p className="text-lg text-[#151515] mb-8 font-inter">
          Khám phá và kết nối với các công ty hàng đầu phù hợp với kỹ năng và
          mục tiêu nghề nghiệp của bạn
        </p>

        <FilterSection />

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-[#f2762e] mb-6 font-inter">
            Công ty phù hợp với bạn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
          </div>
        </section>

        <Pagination />
      </main>
      <Footer />
    </div>
  );
};

export default Apply;
