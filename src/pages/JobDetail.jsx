import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Để lấy jobId từ URL
import { useGetJobDetailQuery } from "../redux/api/jobApiSlice"; // Để lấy chi tiết công việc
import { useApplyJobMutation } from "../redux/api/applicationApiSlice"; // Import hook để ứng tuyển
import Footer from "../components/home/Footer";
import Header from "../components/home/Header";

const JobDetail = () => {
  const { jobId } = useParams(); // Lấy jobId từ URL (nếu bạn dùng React Router để chuyển hướng)
  
  // Sử dụng hook để lấy chi tiết công việc
  const { data, error, isLoading } = useGetJobDetailQuery(jobId); // jobId sẽ được truyền vào từ URL
  
  const [file, setFile] = useState(null); // Trạng thái lưu file CV
  const [applyJob, { isLoading: isApplying, error: applyError }] = useApplyJobMutation(); // Hook để ứng tuyển
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading job details</div>;
  }

  const job = data?.data;

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleApply = async () => {
    if (!file) {
      alert("Vui lòng chọn file CV");
      return;
    }

    const formData = new FormData();
    formData.append("resumeFile", file); // Thêm file vào formData

    try {
      const response = await applyJob({ jobId, formData }).unwrap();
      if (response.success) {
        alert("Ứng tuyển thành công!");
      }
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi nộp đơn");
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#f9f4e7]">
      <Header />

      <div className="flex p-8">
        {/* Thông tin công việc */}
        <div className="flex flex-col p-8 flex-1 mr-4">
          <h1 className="text-4xl font-bold text-orange-600 mb-6">{job?.title}</h1>

          <p className="text-lg mb-8">{job?.description}</p>

          <h2 className="text-2xl font-bold text-orange-600 mb-4">Cách thức ứng tuyển</h2>

          <p className="text-lg mb-4">
            Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển ngay dưới đây.
          </p>

          <p className="text-lg mb-8">Hạn nộp hồ sơ: 24/03/2025</p>

          {/* File CV input */}
          <div className="mb-4">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInput}
              className="border p-2 rounded"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleApply}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg"
              disabled={isApplying} // Disable button while applying
            >
              {isApplying ? "Đang nộp đơn..." : "Ứng tuyển ngay"}
            </button>
            <button className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg">
              Lưu tin
            </button>
          </div>
        </div>

        {/* Thông tin dự án */}
        <div className="p-8 bg-white rounded-lg shadow-md flex-1 ml-4">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-orange-600 mb-4">Thông tin công việc</h3>
            <div className="mb-2">
              <span className="text-gray-500">ID công việc:</span> {job?.id}
            </div>
            <div className="mb-2">
              <span className="text-gray-500">Ngày đăng:</span> {new Date(job?.createdAt).toLocaleDateString()}
            </div>
            <div className="mb-2">
              <span className="text-gray-500">Lương:</span> {job?.salary}
            </div>
            <div className="mb-2">
              <span className="text-gray-500">Thời gian làm việc:</span> {job?.deliveryTime}
            </div>
            <div className="mb-2">
              <span className="text-gray-500">Cấp bậc:</span> {job?.priorityLevel}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-orange-600 mb-4">Thông tin nhà tuyển dụng</h3>
            <div className="mb-2">
              <span className="text-gray-500">Nhà tuyển dụng:</span> {job?.employerName}
            </div>
            <div className="mb-2">
              <span className="text-gray-500">Yêu cầu:</span> {job?.requirements}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDetail;
