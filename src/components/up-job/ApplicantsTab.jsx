import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useCreateReviewMutation,
  useGetApplicationsWithInfoQuery,
  useUpdateApplicationStatusMutation,
} from "../../redux/api/applicationApiSlice";
import { Modal, Spin, Button, message, Rate, Input, Select } from "antd";
import { BASE_URL } from "../../redux/constants";

const { Option } = Select;

const statusColors = {
  "Mới nhận": "bg-blue-200 text-blue-800",
  "Phỏng vấn": "bg-green-200 text-green-800",
  "Từ chối": "bg-red-200 text-red-800",
};

const formatDate = (isoDateString) => {
  if (!isoDateString) return "";
  const date = new Date(isoDateString);
  if (isNaN(date)) return "";
  return date.toLocaleDateString("vi-VN");
};

// Helper function to format experience array
const formatExperience = (experience) => {
  if (!experience || !Array.isArray(experience) || experience.length === 0) {
    return "Không có kinh nghiệm";
  }
  return experience
    .map(
      (exp) =>
        `${exp.position || "N/A"} tại ${exp.company || "N/A"} (${
          exp.startDate ? formatDate(exp.startDate) : "N/A"
        } - ${exp.endDate ? formatDate(exp.endDate) : "Hiện tại"})`
    )
    .join("; ");
};

const ApplicantsTab = () => {
  const user = useSelector((state) => state.auth.userState);
  const employerId = user?.user?.id;

  const { data, error, isLoading, refetch } = useGetApplicationsWithInfoQuery(
    { employerId },
    { skip: !employerId }
  );

  const [updateApplicationStatus, { isLoading: isUpdating }] =
    useUpdateApplicationStatusMutation();

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);
  const [ratingFilter, setRatingFilter] = useState(null);

  const [cvModalVisible, setCvModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [modalFileUrl, setModalFileUrl] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [reviewingUser, setReviewingUser] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [createReview, { isLoading: isReviewing }] = useCreateReviewMutation();

  const openReviewModal = (user) => {
    setReviewingUser(user);
    setReviewModalVisible(true);
  };

  const closeReviewModal = () => {
    setReviewModalVisible(false);
    setReviewingUser(null);
    setRating(0);
    setComment("");
  };

  const handleSubmitReview = async () => {
    if (!rating || !comment.trim()) {
      message.warning("Vui lòng điền đầy đủ đánh giá và bình luận.");
      return;
    }

    try {
      await createReview({
        reviewUserId: reviewingUser._id,
        rating,
        comment,
        jobId: selectedApplication?.jobId?._id || selectedApplication?.jobId,
      }).unwrap();

      message.success("Gửi đánh giá thành công!");
      closeReviewModal();
      refetch();
    } catch (err) {
      console.error(err);
      message.error("Đánh giá thất bại.");
    }
  };

  const handleOpenCV = (app) => {
    if (!app.resumeFile || !app.resumeFile.path) {
      alert("Ứng viên chưa nộp CV.");
      return;
    }
    const fileUrl = `${BASE_URL}/${app.resumeFile.path.replace(/\\/g, "/")}`;
    setModalFileUrl(fileUrl);
    setCvModalVisible(true);
    setSelectedApplication(app);
  };

  const handleOpenProfile = (app) => {
    setSelectedUser(app.applicantId);
    setSelectedApplication(app);
    setProfileModalVisible(true);
  };

  const handleCloseCvModal = () => {
    setCvModalVisible(false);
    setModalFileUrl("");
    setSelectedApplication(null);
  };

  const handleCloseProfileModal = () => {
    setProfileModalVisible(false);
    setSelectedUser(null);
    setSelectedApplication(null);
  };

  const handleUpdateStatus = async (status) => {
    if (!selectedApplication) return;

    try {
      await updateApplicationStatus({
        applicationId: selectedApplication._id,
        status,
      }).unwrap();

      message.success(`Cập nhật trạng thái thành công: ${status}`);
      refetch();
      handleCloseCvModal();
    } catch (error) {
      message.error("Cập nhật trạng thái thất bại, vui lòng thử lại.");
      console.error(error);
    }
  };

  if (isLoading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi tải dữ liệu</div>;

  const applications = data?.data || [];

  // Get unique values for dropdowns
  const uniquePositions = [
    ...new Set(applications.map((app) => app.jobId?.position).filter(Boolean)),
  ];
  const uniqueStatuses = [
    ...new Set(applications.map((app) => app.status).filter(Boolean)),
  ];
  const uniqueDates = [
    ...new Set(
      applications
        .map((app) => formatDate(app.appliedAt || app.jobId?.createdAt))
        .filter(Boolean)
    ),
  ];
  const uniqueRatings = [
    ...new Set(
      applications
        .map((app) =>
          app.reviewedByEmployer ? app.rating || "Đã đánh giá" : "Chưa đánh giá"
        )
        .filter(Boolean)
    ),
  ];

  // Filter logic
  const filteredApplicants = applications.filter((app) => {
    const nameMatch = app.applicantId?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const positionMatch = positionFilter
      ? app.jobId?.position === positionFilter
      : true;
    const statusMatch = statusFilter ? app.status === statusFilter : true;
    const dateMatch = dateFilter
      ? formatDate(app.appliedAt || app.jobId?.createdAt) === dateFilter
      : true;
    const ratingMatch = ratingFilter
      ? ratingFilter === "Chưa đánh giá"
        ? !app.reviewedByEmployer
        : app.reviewedByEmployer && app.rating === parseInt(ratingFilter)
      : true;

    return (
      nameMatch && positionMatch && statusMatch && dateMatch && ratingMatch
    );
  });

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setPositionFilter(null);
    setStatusFilter(null);
    setDateFilter(null);
    setRatingFilter(null);
  };

  return (
    <div className="p-5 bg-gray-100 rounded-lg max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Ứng viên đã ứng tuyển</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên ứng viên"
          className="flex-grow min-w-[250px] p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={positionFilter ?? null}
          onChange={setPositionFilter}
          placeholder="Vị trí ứng tuyển"
          className="min-w-[150px]"
          allowClear
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {uniquePositions.map((position) => (
            <Option key={position} value={position}>
              {position}
            </Option>
          ))}
        </Select>
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          placeholder="Trạng thái"
          className="min-w-[150px]"
          allowClear
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {uniqueStatuses.map((status) => (
            <Option key={status} value={status}>
              {status}
            </Option>
          ))}
        </Select>
        <Select
          value={dateFilter}
          onChange={setDateFilter}
          placeholder="Ngày ứng tuyển"
          className="min-w-[150px]"
          allowClear
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {uniqueDates.map((date) => (
            <Option key={date} value={date}>
              {date}
            </Option>
          ))}
        </Select>
        <Select
          value={ratingFilter}
          onChange={setRatingFilter}
          placeholder="Đánh giá"
          className="min-w-[150px]"
          allowClear
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {uniqueRatings.map((rating) => (
            <Option key={rating} value={rating}>
              {rating}
            </Option>
          ))}
        </Select>
        <button
          className="border border-gray-400 text-gray-700 px-6 py-2 rounded hover:bg-gray-200 transition"
          onClick={handleResetFilters}
        >
          Đặt lại
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg overflow-hidden shadow">
          <thead className="bg-green-800 text-white text-left">
            <tr>
              <th className="py-3 px-4">Ứng viên</th>
              <th className="py-3 px-4">Vị trí ứng tuyển</th>
              <th className="py-3 px-4">Ngày ứng tuyển</th>
              <th className="py-3 px-4">Trạng thái</th>
              <th className="py-3 px-4">CV</th>
              <th className="py-3 px-4">Đánh giá</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  Không tìm thấy ứng viên phù hợp.
                </td>
              </tr>
            ) : (
              filteredApplicants.map((app, idx) => (
                <tr
                  key={app._id}
                  className={`${idx % 2 === 0 ? "bg-green-50" : "bg-white"}`}
                >
                  <td className="py-4 px-4 flex items-center">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handleOpenProfile(app)}
                    >
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full text-gray-700 font-bold mr-3">
                        {app.applicantId?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase() || "NA"}
                      </div>
                      <div>
                        <div className="font-semibold">
                          {app.applicantId?.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">{app.jobId?.position || "N/A"}</td>
                  <td className="py-4 px-4">
                    {formatDate(app.appliedAt || app.jobId?.createdAt)}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        statusColors[app.status] || "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <img
                      src="/bxs-file.svg"
                      alt="CV"
                      className="w-6 h-6 cursor-pointer opacity-80 hover:opacity-100"
                      onClick={() => handleOpenCV(app)}
                    />
                  </td>
                  <td className="py-4 px-4">
                    {app.reviewedByEmployer ? (
                      <span className="inline-block px-3 py-1 rounded-full bg-green-200 text-green-800 text-xs font-semibold">
                        Đã đánh giá
                      </span>
                    ) : (
                      <button
                        className="text-blue-600 underline hover:text-blue-800"
                        onClick={() => {
                          setSelectedApplication(app);
                          openReviewModal(app.applicantId);
                        }}
                      >
                        Review
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        open={cvModalVisible}
        title="Xem CV ứng viên"
        onCancel={handleCloseCvModal}
        footer={[
          <Button
            key="reject"
            danger
            loading={isUpdating}
            onClick={() => handleUpdateStatus("Từ chối")}
          >
            Từ chối
          </Button>,
          <Button
            key="accept"
            type="primary"
            loading={isUpdating}
            onClick={() => handleUpdateStatus("Phỏng vấn")}
          >
            Chấp nhận
          </Button>,
        ]}
        width={800}
        bodyStyle={{ height: "80vh" }}
        centered
      >
        {modalFileUrl ? (
          <iframe
            src={modalFileUrl}
            width="100%"
            height="100%"
            title="CV PDF"
          />
        ) : (
          <p>Không có file để hiển thị</p>
        )}
      </Modal>

      <Modal
        open={profileModalVisible}
        title={`Thông tin ứng viên: ${selectedUser?.name || "N/A"}`}
        onCancel={handleCloseProfileModal}
        footer={[
          <Button key="close" onClick={handleCloseProfileModal}>
            Đóng
          </Button>,
        ]}
        width={600}
        centered
      >
        {selectedUser ? (
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Họ và tên</label>
              <p>{selectedUser.name || "N/A"}</p>
            </div>
            <div>
              <label className="block font-medium">Email</label>
              <p>{selectedUser.email || "N/A"}</p>
            </div>
            <div>
              <label className="block font-medium">Số điện thoại</label>
              <p>{selectedUser.phone || "N/A"}</p>
            </div>
            <div>
              <label className="block font-medium">Thành phố</label>
              <p>{selectedUser.city || "N/A"}</p>
            </div>
            <div>
              <label className="block font-medium">Kinh nghiệm</label>
              <p>{formatExperience(selectedUser.experience)}</p>
            </div>
            <div>
              <label className="block font-medium">Kỹ năng</label>
              <p>
                {selectedUser.skills?.join(", ") ||
                  "Không có kỹ năng được liệt kê"}
              </p>
            </div>
            <div>
              <label className="block font-medium">Thông tin chi tiết</label>
              <p>{selectedUser.userDetail || "Không có thông tin chi tiết"}</p>
            </div>
          </div>
        ) : (
          <p>Không có thông tin ứng viên để hiển thị</p>
        )}
      </Modal>

      <Modal
        open={reviewModalVisible}
        title={`Đánh giá ứng viên: ${reviewingUser?.name}`}
        onCancel={closeReviewModal}
        onOk={handleSubmitReview}
        okText="Gửi"
        cancelText="Hủy"
        confirmLoading={isReviewing}
        centered
      >
        <div className="mb-4">
          <label className="block mb-2 font-medium">Số sao</label>
          <Rate value={rating} onChange={setRating} />
        </div>
        <div>
          <label className="block mb-2 font-medium">Bình luận</label>
          <Input.TextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Nhập nhận xét của bạn"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ApplicantsTab;
