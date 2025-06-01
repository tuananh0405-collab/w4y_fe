import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetJobDetailQuery } from "../redux/api/jobApiSlice";
import { useApplyJobMutation } from "../redux/api/applicationApiSlice";
import Footer from "../components/home/Footer";
import Header from "../components/home/Header";
import theme from "../utils/theme";
import ApplicationForm from "../components/up-job/ApplicationForm";
import { Modal } from "antd";

const colors = {
  lightGray: "#A8BBB4",
  tealGreen: "#6A9183",
  mintGreen: "#A8E6CF",
  darkTeal: "#3A6656",
  veryDarkGreen: "#183C2E",
};

const JobDetail = () => {
  const { jobId } = useParams();
  const { data, error, isLoading } = useGetJobDetailQuery(jobId);
 
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading job details</div>;

  const job = data?.data;
  console.log('====================================');
  console.log(job);
  console.log('====================================');


  return (
    <div className="flex flex-col w-full">
      <Header />

      <div className="flex p-8" style={{ background: theme.colors.bgColor }}>
        {/* Thông tin công việc */}
        <div
          className="flex flex-col p-8 flex-1 mr-4"
          style={{ color: colors.veryDarkGreen }}
        >
          <h1
            className="text-4xl font-bold mb-6"
            style={{ color: colors.tealGreen }}
          >
            {job?.title}
          </h1>

          <p className="text-lg mb-8">{job?.description}</p>

          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: colors.tealGreen }}
          >
            Cách thức ứng tuyển
          </h2>

          <p className="text-lg mb-4">
            Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển ngay dưới đây.
          </p>

          <p className="text-lg mb-8">Hạn nộp hồ sơ: {job?.deadline?.slice(0, 10)}</p>

          {/* File CV input */}
          {/* <div className="mb-4">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInput}
              className="border p-2 rounded"
              style={{ borderColor: colors.tealGreen }}
            />
          </div> */}

          <div className="flex gap-4">
  
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-white px-6 py-3 rounded-lg"
              style={{ backgroundColor: colors.tealGreen }}
            >
              Ứng tuyển ngay
            </button>
<Modal
  open={isModalOpen}
  onCancel={() => setIsModalOpen(false)}
  footer={null}
  width={600}
  centered
   destroyOnClose={true}
  modalRender={modal => (
    <div
      style={{
        padding: 24,
        maxHeight: '90vh',
        width: '100%',
        overflow: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      {modal}
    </div>
  )}
>
  <ApplicationForm jobId={jobId}  jobTitle={job?.title} onClose={() => setIsModalOpen(false)} />
</Modal>


            <button
              className="border px-6 py-3 rounded-lg"
              style={{ borderColor: colors.tealGreen, color: colors.tealGreen }}
            >
              Lưu tin
            </button>
          </div>
        </div>

        {/* Thông tin dự án */}
        <div
          className="p-8 bg-white rounded-lg shadow-md flex-1 ml-4"
          style={{ color: colors.veryDarkGreen }}
        >
          <div className="mb-8">
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: colors.tealGreen }}
            >
              Thông tin công việc
            </h3>
            <div className="mb-2">
              {/* <span className="text-gray-500">ID công việc:</span> {job?.id} */}
            </div>
            <div className="mb-2">
              <span className="text-gray-500">Ngày đăng:</span>{" "}
              {new Date(job?.createdAt).toLocaleDateString()}
            </div>
            <div className="mb-2">
              <span className="text-gray-500">Lương:</span> {job?.salary}
            </div>
            <div className="mb-2">
              <span className="text-gray-500">Thời gian làm việc:</span>{" "}
              {job?.deliveryTime}
            </div>
            <div className="mb-2">
              <span className="text-gray-500">Cấp bậc:</span>{" "}
              {job?.priorityLevel}
            </div>
          </div>

          <div>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: colors.tealGreen }}
            >
              Thông tin nhà tuyển dụng
            </h3>
            <div className="mb-2">
              <span className="text-gray-500">Nhà tuyển dụng:</span>{" "}
              {job?.employerName}
            </div>
            <div className="mb-2">
              <span className="text-gray-500">Yêu cầu:</span>{" "}
              {job?.requirements}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDetail;
