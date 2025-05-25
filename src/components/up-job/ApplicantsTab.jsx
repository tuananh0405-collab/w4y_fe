import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetApplicationsWithInfoQuery } from "../../redux/api/applicationApiSlice";

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

  const { data, error, isLoading } = useGetApplicationsWithInfoQuery(
    { employerId },
    { skip: !employerId }
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  if (isLoading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi tải dữ liệu</div>;

  const applications = data?.data || [];

  // Lọc theo search term (tên ứng viên)
  const filteredApplicants = applications.filter((app) =>
    app.applicantId?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // TODO: Bạn có thể lọc theo activeTab nếu muốn, hiện mình bỏ qua phần này

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

      {/* Tabs */}
      <div className="flex border border-gray-300 rounded mb-6 overflow-hidden">
        {/* Nếu muốn dùng tab lọc có thể implement, hiện tạm ignore */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg overflow-hidden shadow">
          <thead className="bg-green-800 text-white text-left">
            <tr>
              <th className="py-3 px-4">Ứng viên</th>
              <th className="py-3 px-4">Vị trí ứng tuyển</th>
              <th className="py-3 px-4">Ngày ứng tuyển</th>
              <th className="py-3 px-4">Trạng thái</th>
              <th className="py-3 px-4">CV</th>
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
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantsTab;
