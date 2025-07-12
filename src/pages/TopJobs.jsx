import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import HeroSection from "../components/home/HeroSection";
import { FilterSidebar } from "../components/top-jobs/FilterSidebar";
import { TopJobCard } from "../components/top-jobs/TopJobCard";
import { useGetJobListQuery } from "../redux/api/jobApiSlice";
import { Pagination } from "@mui/material";
import check from "check-types";

const TopJobs = () => {
  const [filterObject, setFilterObject] = useState({
    industry: "",
    experience: "",
    level: "",
    salaryRangeStart: "",
    salaryRangeEnd: "",
    salaryRangeUnit: "",
    categoryIds: [],
  })

  const [paginationObject, setPaginationObject] = useState({
    page: 1,
    limit: 2,
  })

  const {
    data: jobListQuery,
    error: jobListFetchError,
    isLoading: isFetchingJobCategories,
  } = useGetJobListQuery({
    ...filterObject,
    industry: undefined, // industry is a deprecated field. Industries are now represented as job categories with parentId == null. It is still a free string, so there's probably somes way it can be used.
    salaryRangeStart: filterObject.salaryRangeStart.toString().length ?
      filterObject.salaryRangeStart
      :
      undefined,
    salaryRangeEnd: filterObject.salaryRangeEnd.toString().length ?
      filterObject.salaryRangeEnd
      :
      undefined,
    categoryIds: filterObject.categoryIds.length ? filterObject.categoryIds : undefined,
    ...paginationObject,
  }, {});

  const jobList = useMemo(() => {
    return jobListQuery?.data ? jobListQuery.data : [];
  }, [jobListQuery]);

  const resultPaginationInfo = useMemo(() => {
    return jobListQuery?.pagination ? jobListQuery.pagination : {}
  }, [jobListQuery]);

  const handlePageChange = (page) => {
    setPaginationObject(prev => ({ ...prev, page }))
  }

  useEffect(() => {
    if (resultPaginationInfo.currentPage && resultPaginationInfo.totalPages) {
      setPaginationObject(prev => ({ ...prev, page: Math.min(resultPaginationInfo.currentPage, resultPaginationInfo.totalPages) }))
    }
    else {
      setPaginationObject(prev => ({ ...prev, page: 1 }))
    }
  }, [resultPaginationInfo.currentPage, resultPaginationInfo.totalPages])

  return (
    <div className="flex flex-col w-full   bg-[#fff]">
      <Header />
      <HeroSection />
      <div className="w-full max-w-[1500px] mx-auto p-8 grid grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr] gap-10">
        {isFetchingJobCategories ? (
          <div className="col-span-2 flex justify-center items-center h-100 text-lg">Loading...</div>
        ) : jobListFetchError ? (
          <div className="col-span-2 flex justify-center items-center h-100 text-red-600 text-lg">
            Error loading jobs. Please try again later.
          </div>
        ) : (
          <>
            <FilterSidebar filterObject={filterObject} setFilterObject={setFilterObject} />
            <main className="flex flex-col">
              {resultPaginationInfo.totalJobs && <h1>Đã tìm thấy {resultPaginationInfo.totalJobs} đăng tuyển phù hợp</h1>}
              <TopJobCard jobs={jobList} />
              <div className="grow" />
              <div className="flex justify-center">
                <Pagination
                  count={resultPaginationInfo.totalPages}
                  page={paginationObject.page}
                  onChange={(_, v) => handlePageChange(v)}
                  color="success"
                  variant="outlined"
                />
              </div>
            </main>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TopJobs;
