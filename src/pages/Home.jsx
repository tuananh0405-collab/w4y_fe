import React from 'react'
import Header from '../components/home/Header'
import HeroSection from '../components/home/HeroSection'
import FilterBar from '../components/home/FilterBar'
import CompanyCards from '../components/home/CompanyCards'
import Pagination from '../components/home/Pagination'
import Footer from '../components/home/Footer'

const Home = () => {
  return (
    <div className="flex flex-col w-full max-w-screen-xl mx-auto bg-[#f9f4e7]">
      <Header />
      <HeroSection />
      <FilterBar />
      <CompanyCards />
      <Pagination />
      <Footer />
    </div>
  )
}

export default Home
