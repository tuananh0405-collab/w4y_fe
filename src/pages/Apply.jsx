import React from 'react'
import Header from '../components/home/Header'
import Footer from '../components/home/Footer'
import CustomPagination from '../components/home/Pagination'
import CompanyCards from '../components/home/CompanyCards'

const Apply = () => {
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow flex flex-col items-center bg-gray-100 py-8">
      <section className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-orange-500 text-center mb-4">Kết nối với nhà tuyển dụng</h1>
        <p className="text-lg text-orange-500 text-center mb-8">
          Khám phá và kết nối với các công ty hàng đầu phù hợp với kỹ năng và mục tiêu nghề nghiệp của bạn
        </p>
        <div className="flex flex-wrap justify-between gap-4 mb-8">
          <CompanyCards />
         
        </div>
        <CustomPagination />
      </section>
    </main>
    <Footer />
  </div>
  )
}

export default Apply
