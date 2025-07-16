import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import HeroSection from "../components/home/HeroSection";
import { FilterSidebar } from "../components/top-jobs/FilterSidebar";
import { TopJobCard } from "../components/top-jobs/TopJobCard";
import { useGetJobListQuery } from "../redux/api/jobApiSlice";
import { Pagination, Typography } from "@mui/material";
import { Inventory } from "@mui/icons-material";

const TopJobs = () => {
  const [filterObject, setFilterObject] = useState({
    industry: "",
    experience: "",
    level: "",
    salaryRangeStart: "",
    salaryRangeEnd: "",
    salaryRangeUnit: "",
    categoryIds: [],
  });

  const [paginationObject, setPaginationObject] = useState({
    page: 1,
    limit: 20,
  });

  const {
    data: jobListQuery,
    error: jobListFetchError,
    isLoading: isFetchingJobCategories,
  } = useGetJobListQuery({
    ...filterObject,
    industry: filterObject.industry, // industry is a deprecated field. Industries are now represented as job categories with parentId == null. It is still a free string, so there's probably somes way it can be used.
    salaryRangeStart: filterObject.salaryRangeStart.toString().length
      ? filterObject.salaryRangeStart
      : undefined,
    salaryRangeEnd: filterObject.salaryRangeEnd.toString().length
      ? filterObject.salaryRangeEnd
      : undefined,
    categoryIds: filterObject.categoryIds.length
      ? filterObject.categoryIds
      : undefined,
    ...paginationObject,
  }, {});

  const jobList = useMemo(() => {
    return jobListQuery?.data ? jobListQuery.data : [];
  }, [jobListQuery]);

  const resultPaginationInfo = useMemo(() => {
    return jobListQuery?.pagination ? jobListQuery.pagination : {};
  }, [jobListQuery]);

  const handlePageChange = (page) => {
    setPaginationObject((prev) => ({ ...prev, page }));
  };

  useEffect(() => {
    if (resultPaginationInfo.currentPage && resultPaginationInfo.totalPages) {
      setPaginationObject((prev) => ({
        ...prev,
        page: Math.min(
          resultPaginationInfo.currentPage,
          resultPaginationInfo.totalPages,
        ),
      }));
    } else {
      setPaginationObject((prev) => ({ ...prev, page: 1 }));
    }
  }, [resultPaginationInfo.currentPage, resultPaginationInfo.totalPages]);

  return (
    <div className="flex flex-col w-full bg-[#fff]">
      <Header />
      <HeroSection />
      <div className="w-full max-w-[1500px] mx-auto p-8 grid grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr] gap-10">
        {isFetchingJobCategories
          ? (
            <div className="col-span-2 flex justify-center items-center h-100 text-lg">
              Loading...
            </div>
          )
          : jobListFetchError
            ? (
              <div className="col-span-2 flex justify-center items-center h-100 text-red-600 text-lg">
                Error loading jobs. Please try again later.
              </div>
            )
            : (
              <>
                <FilterSidebar
                  filterObject={filterObject}
                  setFilterObject={setFilterObject}
                />
                <main className="flex flex-col">
                  {!!resultPaginationInfo.totalJobs && (
                    <>
                      <div
                        className="p-2 bg-teal-100/50 border-l-4 border-teal-500 mb-4 text-gray-700"
                      >
                        <h1 className="text-lg">
                          Đã tìm thấy{" "}
                          <span className="font-bold text-teal-600">
                            {resultPaginationInfo.totalJobs}
                          </span>{" "}
                          đăng tuyển phù hợp
                        </h1>
                      </div>
                      <TopJobCard jobs={jobList} />
                      <div className="grow" />
                      <div className="flex justify-center mt-4">
                        <Pagination
                          count={resultPaginationInfo.totalPages}
                          page={paginationObject.page}
                          onChange={(_, v) => handlePageChange(v)}
                          color="success"
                          variant="outlined"
                        />
                      </div>
                    </>
                  )}
                  {!resultPaginationInfo.totalJobs && (
                    <div className="grow flex flex-col gap-2 p-4 justify-center items-center rounded-md">
                      <div className="bg-gray-300 rounded-md flex flex-col justify-center items-center p-4 gap-2 color-white">
                      <Inventory sx={{ fontSize: 80, color: "gray" }} />
                      <Typography variant="p" className="text-gray-500">
                        Tất cả công việc đều bị ẩn bởi bộ lọc
                      </Typography>
                      <Typography variant="p" className="text-gray-500">
                        Hãy chỉnh hoặc loại bỏ bộ lọc
                      </Typography>
                      </div>
                    </div>

                  )}
                </main>
              </>
            )}
      </div>

      <Footer />
    </div>
  );
};

export default TopJobs;
