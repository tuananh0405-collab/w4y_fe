import React, { useState } from "react";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import JobCard from "../components/home/JobCard";
import { useGetAppliedJobsQuery } from "../redux/api/applicationApiSlice";
import { Pagination, Input, Spin, Modal } from "antd";
import { BASE_URL } from "../redux/constants";

const JobApplied = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFileUrl, setModalFileUrl] = useState("");
  const limit = 6;

  const { data, isLoading, error, refetch } = useGetAppliedJobsQuery({
    page,
    limit,
    search,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
    refetch();
  };

  const handleOpenCV = (cvUrl) => {
    const fileUrl = `${BASE_URL}/${cvUrl.replace(/\\/g, "/")}`;
    setModalFileUrl(fileUrl);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalFileUrl("");
  };

  return (
    <div className="bg-[#F8FDFC] min-h-screen flex flex-col">
      <Header />
      
      {/* Header section */}
      <div className="flex flex-col items-center py-8 bg-white">
        <h1 className="text-3xl font-bold mb-6 text-teal-700">
          Công việc đã ứng tuyển
        </h1>
        
        {/* Search section - tương tự Home */}
        <div className="max-w-[1000px] mx-auto px-4 w-full">
          <form
            onSubmit={handleSearch}
            className="flex gap-4 w-full"
          >
            <Input
              placeholder="Tìm kiếm theo tiêu đề, mô tả, lương, vị trí, địa điểm..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1"
              allowClear
            />
            <button
              type="submit"
              className="px-6 py-2 rounded bg-teal-600 text-white font-semibold hover:bg-teal-700 whitespace-nowrap"
            >
              Tìm kiếm
            </button>
          </form>
        </div>
      </div>

      {/* Content section - full width như Home */}
      <div className="flex-1 flex flex-col w-full bg-[#F8FDFC]">
        {isLoading ? (
          <div className="flex justify-center items-center flex-1">
            <Spin size="large" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center flex-1">
            <div className="text-red-600">Lỗi tải danh sách công việc</div>
          </div>
        ) : (
          <>
            {data?.data?.length === 0 ? (
              <div className="flex justify-center items-center flex-1">
                <div className="text-gray-500">
                  Bạn chưa ứng tuyển công việc nào.
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-8 py-8">
                <div className="max-w-[1000px] mx-auto px-4 w-full">
                  {data.data.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2 w-full mb-6"
                    >
                      <JobCard
                        title={item.job.title}
                        description={item.job.description}
                        salary={item.job.salary}
                        position={item.job.position}
                        location={item.job.location}
                        employerName={item.job.employerName}
                        experience={item.job.experience}
                      />
                      <div className="flex flex-wrap items-center gap-6 mt-2 text-gray-700 text-sm">
                        <span>
                          <b>Ngày ứng tuyển:</b>{" "}
                          {item.appliedAt
                            ? new Date(item.appliedAt).toLocaleString()
                            : "-"}
                        </span>
                        {item.resumeFile?.path && (
                          <span>
                            <b>CV đã nộp:</b>{" "}
                            <button
                              className="text-teal-600 underline hover:text-teal-800"
                              onClick={() => handleOpenCV(item.resumeFile.path)}
                              type="button"
                            >
                              Xem CV
                            </button>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Pagination */}
            <div className="flex justify-center pb-8">
              <Pagination
                current={data?.pagination?.currentPage || 1}
                total={data?.pagination?.totalApplications || 0}
                pageSize={limit}
                onChange={(p) => setPage(p)}
                showSizeChanger={false}
              />
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      <Modal
        open={modalVisible}
        title="Xem CV đã nộp"
        onCancel={handleCloseModal}
        footer={null}
        width={800}
        bodyStyle={{ height: "80vh", padding: 0 }}
        centered
      >
        {modalFileUrl ? (
          <iframe
            src={modalFileUrl}
            width="100%"
            height="100%"
            title="CV PDF"
            style={{ border: 0 }}
          />
        ) : (
          <p className="text-center mt-8">Không có file để hiển thị</p>
        )}
      </Modal>

      <Footer />
    </div>
  );
};

export default JobApplied;
