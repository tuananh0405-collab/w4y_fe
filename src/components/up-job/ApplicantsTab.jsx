import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateReviewMutation, useGetApplicationsWithInfoQuery, useUpdateApplicationStatusMutation } from "../../redux/api/applicationApiSlice";
import { Modal, Spin, Button, message, Rate, Input } from "antd";

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

const ApplicantsTab = () => {
  const user = useSelector((state) => state.auth.userState);
  const employerId = user?.user?.id;

  // Lấy danh sách ứng viên, refetch để cập nhật khi cần
  const { data, error, isLoading, refetch } = useGetApplicationsWithInfoQuery(
    { employerId },
    { skip: !employerId }
  );

  // Mutation cập nhật trạng thái ứng dụng
  const [updateApplicationStatus, { isLoading: isUpdating }] = useUpdateApplicationStatusMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFileUrl, setModalFileUrl] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);

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
    }).unwrap();

    message.success("Gửi đánh giá thành công!");
    closeReviewModal();
  } catch (err) {
    console.error(err);
    message.error("Đánh giá thất bại.");
  }
};


  if (isLoading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi tải dữ liệu</div>;

  const applications = data?.data || [];

  const filteredApplicants = applications.filter((app) =>
    app.applicantId?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCV = (app) => {
    if (!app.resumeFile || !app.resumeFile.path) {
      alert("Ứng viên chưa nộp CV.");
      return;
    }
    const fileUrl = `http://localhost:3000/${app.resumeFile.path.replace(/\\/g, "/")}`;
    setModalFileUrl(fileUrl);
    setModalVisible(true);
    setSelectedApplication(app);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalFileUrl("");
    setSelectedApplication(null);
  };

  // Hàm cập nhật trạng thái ứng dụng
  const handleUpdateStatus = async (status) => {
    if (!selectedApplication) return;

    try {
      await updateApplicationStatus({
        applicationId: selectedApplication._id,
        status,
      }).unwrap();

      message.success(`Cập nhật trạng thái thành công: ${status}`);
      refetch(); // Cập nhật lại dữ liệu ứng viên
      handleCloseModal(); // Đóng modal sau khi cập nhật
    } catch (error) {
      message.error("Cập nhật trạng thái thất bại, vui lòng thử lại.");
      console.error(error);
    }
  };

  return (
    <div className="p-5 bg-gray-100 rounded-lg max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Ứng viên đã ứng tuyển</h1>

      {/* Bộ lọc giữ nguyên */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên ứng viên"
          className="flex-grow min-w-[250px] p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Các select khác giữ nguyên */}
        <select className="p-2 border border-gray-300 rounded min-w-[150px]">
          <option>Vị trí ứng tuyển</option>
        </select>
        <select className="p-2 border border-gray-300 rounded min-w-[150px]">
          <option>Trạng thái</option>
        </select>
        <select className="p-2 border border-gray-300 rounded min-w-[150px]">
          <option>Ngày ứng tuyển</option>
        </select>
        <select className="p-2 border border-gray-300 rounded min-w-[150px]">
          <option>Đánh giá</option>
        </select>
        <button className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-900 transition">
          Lọc
        </button>
        <button className="border border-gray-400 text-gray-700 px-6 py-2 rounded hover:bg-gray-200 transition">
          Đặt lại
        </button>
      </div>

      {/* Bảng dữ liệu ứng viên */}
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
                <td colSpan={5} className="text-center py-6 text-gray-500">
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
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full text-gray-700 font-bold mr-3">
                      {app.applicantId?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "NA"}
                    </div>
                    <div>
                      <div className="font-semibold">{app.applicantId?.name}</div>
                      <div className="text-sm text-gray-500">
                        {app.applicantId?.experience || "Không có kinh nghiệm"}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">{app.jobId?.position || "N/A"}</td>
                  <td className="py-4 px-4">{formatDate(app.appliedAt || app.jobId?.createdAt)}</td>
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
  <button
    className="text-blue-600 underline hover:text-blue-800"
    onClick={() => openReviewModal(app.applicantId)}
  >
    Review
  </button>
</td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal xem CV */}
      <Modal
        open={modalVisible}
        title="Xem CV ứng viên"
        onCancel={handleCloseModal}
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
