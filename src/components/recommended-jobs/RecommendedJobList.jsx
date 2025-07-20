import React from "react";
import { TopJobCard } from "../top-jobs/TopJobCard";
import { Skeleton, Typography } from "@mui/material";
import { Inventory, ReportProblem } from "@mui/icons-material";

const RecommendedJobList = ({ jobs, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex-1 space-y-4">
        <Skeleton variant="rectangular" width="100%" height={118} />
        <Skeleton variant="rectangular" width="100%" height={118} />
        <Skeleton variant="rectangular" width="100%" height={118} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col gap-2 p-4 justify-center items-center bg-red-100/80 rounded-md text-red-600">
        <ReportProblem sx={{ fontSize: 80 }} />
        <Typography variant="h6">Lỗi khi tải danh sách công việc</Typography>
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="flex-1 flex flex-col gap-2 p-4 justify-center items-center bg-gray-100 rounded-md">
        <Inventory sx={{ fontSize: 80, color: "gray" }} />
        <Typography variant="h6" className="text-gray-500">
          Không tìm thấy công việc gợi ý
        </Typography>
        <Typography className="text-gray-500">
          Hãy thử cập nhật hồ sơ của bạn để nhận được gợi ý tốt hơn.
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <TopJobCard jobs={jobs} />
    </div>
  );
};

export default RecommendedJobList;
