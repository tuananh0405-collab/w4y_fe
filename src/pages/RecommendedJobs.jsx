import React, { useMemo, useState } from "react";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import RecommendedJobList from "../components/recommended-jobs/RecommendedJobList";
import UserProfileSidebar from "../components/recommended-jobs/UserProfileSidebar";
import {
  useGetAIRecommendedJobsQuery,
  useGetRecommendedJobsQuery,
} from "../redux/api/jobApiSlice";
import { Switch, Typography } from "@mui/material";
import { ReportProblem } from "@mui/icons-material";

const RecommendedJobs = () => {
  const [useAI, setUseAI] = useState(true);

  const {
    data: recommendedData,
    isLoading: isLoadingRecommended,
    error: errorRecommended,
  } = useGetRecommendedJobsQuery(undefined, { skip: useAI });

  const {
    data: aiRecommendedData,
    isLoading: isLoadingAI,
    error: errorAI,
  } = useGetAIRecommendedJobsQuery(undefined, { skip: !useAI });

  const isLoading = useAI ? isLoadingAI : isLoadingRecommended;
  const error = useAI ? errorAI : errorRecommended;
  const jobs = useMemo(() => {
    const data = useAI ? aiRecommendedData : recommendedData;
    return data?.data || [];
  }, [useAI, aiRecommendedData, recommendedData]);

  return (
    <div className="bg-[#F8FDFC]">
      <Header />
      <div className="w-full max-w-[1500px] mx-auto p-8">
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Công việc gợi ý
            </h1>
            <p className="text-gray-500">
              Công việc được chọn lọc dựa trên hồ sơ và kỹ năng của bạn.
            </p>
          </div>
          <div className="flex items-center bg-gray-100 p-2 rounded-lg">
            <Typography>Gợi ý cơ bản</Typography>
            <Switch
              checked={useAI}
              onChange={(e) => setUseAI(e.target.checked)}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "teal",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "teal",
                },
              }}
            />
            <Typography>Gợi ý bằng AI</Typography>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div>
            <UserProfileSidebar />
          </div>

          <div className="flex-1">
            {!isLoading && !error && jobs.length > 0 && (
              <div className="p-2 bg-teal-100/50 border-l-4 border-teal-500 mb-4 text-gray-700">
                <h2 className="text-lg">
                  Đã tìm thấy{" "}
                  <span className="font-bold text-teal-600">{jobs.length}</span>
                  {" "}
                  gợi ý phù hợp
                </h2>
              </div>
            )}
            {useAI && errorAI
              ? (
                <div className="flex-1 flex flex-col gap-2 p-4 justify-center items-center bg-red-100/80 rounded-md text-red-600">
                  <ReportProblem sx={{ fontSize: 80 }} />
                  <Typography variant="h6">Lỗi khi tải gợi ý từ AI</Typography>
                  <button
                    onClick={() => setUseAI(false)}
                    className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
                  >
                    Chuyển về gợi ý cơ bản
                  </button>
                </div>
              )
              : (
                <RecommendedJobList
                  jobs={jobs}
                  isLoading={isLoading}
                  error={error}
                />
              )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecommendedJobs;
