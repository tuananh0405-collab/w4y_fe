import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetJobsByEmployerQuery } from "../../redux/api/jobApiSlice"; // Điều chỉnh path nếu cần

const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  if (isNaN(date)) return "";
  return date.toLocaleDateString("vi-VN"); // Định dạng ngày theo Việt Nam
};

const PostedJobsTab = () => {
  const user = useSelector((state) => state.auth.userState);
  const employerId = user?.user?.id;

  // Hook gọi API lấy job theo employerId
  const { data, error, isLoading } = useGetJobsByEmployerQuery(employerId, {
    skip: !employerId, // Bỏ qua nếu chưa có employerId
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Chuyển dữ liệu API thành format dùng trong bảng
  const jobsFromApi = data?.data || [];

  // Tạo mảng jobs với dữ liệu backend + giữ nguyên views, cvs, status tạm thời
  const jobs = jobsFromApi.map((job) => ({
    title: job.title || "",
    views: 36, // giữ tạm
    cvs: 10,   // giữ tạm
    datePosted: formatDate(job.createdAt),
    deadline: job.deliveryTime || "", // giữ nguyên chuỗi deliveryTime
    status: "Đang hiển thị", // giữ tạm
  }));

  // Filter theo search term và trạng thái
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? job.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return <div className="p-4 text-center">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">Lỗi tải dữ liệu</div>;
  }

  return (
    <div className="box p-5 bg-gray-100 relative max-w-4xl mx-auto rounded-lg font-inter">
      <div className="header flex justify-between items-center mb-5">
        <h1 className="text-lg font-bold">Tin đã đăng</h1>
        <div className="search-bar flex gap-2 w-[600px]">
          <input
            type="text"
            placeholder="Tìm kiếm theo tiêu đề, vị trí,..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow border border-gray-300 rounded px-3 py-2 text-base font-normal focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-base font-normal focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            <option value="">Trạng thái</option>
            <option value="Đang hiển thị">Đang hiển thị</option>
            <option value="Sắp hết hạn">Sắp hết hạn</option>
          </select>
          <button className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800">
            Tìm kiếm
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-center font-normal text-base">
          <thead className="bg-teal-700 text-white text-lg font-normal">
            <tr>
              <th className="p-3 border border-teal-700">Tiêu đề tin</th>
              <th className="p-3 border border-teal-700">Ngày đăng</th>
              <th className="p-3 border border-teal-700">Hạn nộp</th>
              <th className="p-3 border border-teal-700">Tình trạng</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-teal-50" : "bg-teal-100"}
              >
                <td className="p-3 border border-gray-300 text-left">
                  <div className="font-bold">{job.title}</div>
                  <div className="flex justify-between mt-1 text-gray-600 text-sm font-normal">
                    <span>Lượt xem: {job.views}</span>
                    <span>CV: {job.cvs}</span>
                  </div>
                </td>
                <td className="p-3 border border-gray-300 font-semibold">
                  {job.datePosted}
                </td>
                <td className="p-3 border border-gray-300 font-semibold">
                  {job.deadline}
                </td>
                <td className="p-3 border border-gray-300">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-normal ${
                      job.status === "Đang hiển thị"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostedJobsTab;
