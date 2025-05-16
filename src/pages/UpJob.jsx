import React, { useState } from "react";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import { useCreateJobMutation } from "../redux/api/jobApiSlice";  // Import mutation
import {
  postAddIcon,
  controlFilledIcon,
  lightPostIcon,
  peopleFillIcon,
  searchFilledIcon,
  codexFileIcon,
  packageIcon,
  settingIcon,
} from "../assets";

const UpJob = () => {
  const menuItems = [
    { text: "Bảng điều khiển", icon: controlFilledIcon },
    { text: "Đăng tin tuyển dụng", icon: postAddIcon },
    { text: "Tin đã đăng", icon: lightPostIcon },
    { text: "Ứng viên đã ứng tuyển", icon: peopleFillIcon },
    { text: "Tìm kiếm ứng viên", icon: searchFilledIcon },
    { text: "Hồ sơ công ty", icon: codexFileIcon },
    { text: "Gói dịch vụ", icon: packageIcon },
    { text: "Cài đặt", icon: settingIcon },
  ];

  const [formData, setFormData] = useState({
    title: "",
    quantity: "",
    deliveryTime: "",
    level: "",
    industry: "",
    position: "",
    location: "",
    experience: "",
    description: "",
    requirements: "",
    salary: "",
  });

  const [createJob] = useCreateJobMutation(); // Use mutation for creating a job

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const jobData = {
        title: formData.title,
        description: formData.description,  // Description
        requirements: formData.requirements,  // Requirements
        salary: formData.salary,  // Salary
        deliveryTime: formData.deliveryTime,  // Time work
        priorityLevel: "Thông thường",  // Chỉnh sửa theo nhu cầu, mặc định là "Thông thường"
        quantity: formData.quantity,  // Số lượng tuyển dụng
        level: formData.level,  // Cấp bậc
        industry: formData.industry,  // Ngành nghề
        position: formData.position,  // Chức danh
        location: formData.location,  // Địa điểm làm việc
        experience: formData.experience,  // Kinh nghiệm
      };
      
      await createJob(jobData); // Call the mutation to create the job
      console.log("Job created successfully");
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const handleBack = () => {};

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className="flex flex-grow px-20 bg-gray-200 py-10">
        {/* Sidebar */}
        <aside className="bg-white rounded-lg p-4 min-w-[325px] flex flex-col gap-6 mr-5">
          <h2 className="text-xl font-bold text-orange-500">
            Quản lý tuyển dụng
          </h2>
          <nav className="flex flex-col gap-7">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="flex items-center gap-3 p-2 hover:bg-orange-100 rounded"
              >
                <img src={item.icon} alt="" className="w-6 h-6" />
                <span className="text-lg font-medium">{item.text}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Job Posting Form */}
        <div className="bg-white rounded-lg p-5 w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-orange-500 mb-6">
              Thông tin cơ bản
            </h2>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 mb-6"
              onClick={() => {}} // Bạn có thể thêm hàm xử lý khi nhấn nút nếu cần
            >
              Xem bản nháp đã lưu
            </button>
          </div>

          {/* Mẹo đăng tin hiệu quả */}
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h3 className="text-lg font-semibold text-orange-600">
              Mẹo đăng tin hiệu quả 💡
            </h3>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              <li>Tiêu đề việc làm rõ ràng, có chứa tên vị trí và cấp bậc</li>
              <li>
                Mô tả công việc và yêu cầu chi tiết, tập trung vào kỹ năng cần
                thiết
              </li>
              <li>
                Thông tin về lương và phúc lợi cụ thể để thu hút ứng viên mới
              </li>
              <li>Sử dụng từ khóa ngành nghề để tối ưu khả năng tìm kiếm</li>
            </ul>
          </div>

          {/* Form Inputs */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700">
                Tiêu đề tin tuyển dụng
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Senior Java Developer - Lương đến 4000$"
                className="border p-2 rounded"
              />
            </div>

            {/* Quantity and Work Type */}
            <div className="flex gap-5">
              <div className="flex flex-col w-full">
                <label className="text-lg font-medium text-gray-700">
                  Số lượng tuyển dụng
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="3"
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-lg font-medium text-gray-700">
                  Thời gian làm việc
                </label>
                <input
                  type="text"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleInputChange}
                  placeholder="Toàn thời gian"
                  className="border p-2 rounded"
                />
              </div>
            </div>

            {/* Level and Industry */}
            <div className="flex gap-5">
              <div className="flex flex-col w-full">
                <label className="text-lg font-medium text-gray-700">
                  Cấp bậc
                </label>
                <input
                  type="text"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  placeholder="Chuyên viên"
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-lg font-medium text-gray-700">
                  Ngành nghề
                </label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  placeholder="CNTT"
                  className="border p-2 rounded"
                />
              </div>
            </div>

            {/* Position and Location */}
            <div className="flex gap-5">
              <div className="flex flex-col w-full">
                <label className="text-lg font-medium text-gray-700">
                  Chức danh
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Lập trình viên"
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-lg font-medium text-gray-700">
                  Địa điểm làm việc
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Hà Nội"
                  className="border p-2 rounded"
                />
              </div>
            </div>

            {/* Experience and Benefits */}
            <div className="flex gap-5">
              <div className="flex flex-col w-full">
                <label className="text-lg font-medium text-gray-700">
                  Kinh nghiệm
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="3-5 năm"
                  className="border p-2 rounded"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700">
                Mô tả công việc
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Mô tả công việc"
                className="border p-2 rounded"
                rows="4"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700">
                Yêu cầu công việc
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                placeholder="Yêu cầu công việc"
                className="border p-2 rounded"
                rows="4"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700">
                Lương và phúc lợi
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="Lương"
                className="border p-2 rounded"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-5">
              <button
                onClick={handleBack}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Quay lại
              </button>
              <button
                onClick={handleSubmit}
                className="bg-orange-500 text-white px-4 py-2 rounded"
              >
                Đăng việc
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UpJob;
