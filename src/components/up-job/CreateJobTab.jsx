import React, { useState } from "react";
import theme from "../../utils/theme";
import { useCreateJobMutation } from "../../redux/api/jobApiSlice";


const CreateJobTab = ({ onBack, onSubmit }) => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 const [createJob] = useCreateJobMutation();
  const handleSubmit = async() => {
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-teal-700">Thông tin cơ bản</h2>
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
          onClick={() => alert("Xem bản nháp đã lưu")}
        >
          Xem bản nháp đã lưu
        </button>
      </div>

      {/* Mẹo đăng tin hiệu quả */}
      <div
        className="mb-6 p-4 bg-lightGray border border-gray-300 rounded-lg"
        style={{ backgroundColor: theme.colors.bgColor }}
      >
        <h3 className="text-lg font-semibold text-teal-700 mb-2">
          Mẹo đăng tin hiệu quả 💡
        </h3>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li>Tiêu đề việc làm rõ ràng, có chứa tên vị trí và cấp bậc</li>
          <li>Mô tả công việc và yêu cầu chi tiết, tập trung vào kỹ năng cần thiết</li>
          <li>Thông tin về lương và phúc lợi cụ thể để thu hút ứng viên mới</li>
          <li>Sử dụng từ khóa ngành nghề để tối ưu khả năng tìm kiếm</li>
        </ul>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-5">
        {/* Tiêu đề */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700">Tiêu đề tin tuyển dụng</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Senior Java Developer - Lương đến 4000$"
            className="border p-2 rounded"
          />
        </div>

        {/* Các trường input 2 cột */}
        <div className="flex gap-5">
          <InputField label="Số lượng tuyển dụng" name="quantity" value={formData.quantity} onChange={handleInputChange} />
          <InputField label="Thời gian làm việc" name="deliveryTime" value={formData.deliveryTime} onChange={handleInputChange} />
        </div>

        <div className="flex gap-5">
          <InputField label="Cấp bậc" name="level" value={formData.level} onChange={handleInputChange} />
          <InputField label="Ngành nghề" name="industry" value={formData.industry} onChange={handleInputChange} />
        </div>

        <div className="flex gap-5">
          <InputField label="Chức danh" name="position" value={formData.position} onChange={handleInputChange} />
          <InputField label="Địa điểm làm việc" name="location" value={formData.location} onChange={handleInputChange} />
        </div>

        <div className="flex gap-5">
          <InputField label="Kinh nghiệm" name="experience" value={formData.experience} onChange={handleInputChange} />
        </div>

        {/* Mô tả */}
        <TextAreaField label="Mô tả công việc" name="description" value={formData.description} onChange={handleInputChange} />
        <TextAreaField label="Yêu cầu công việc" name="requirements" value={formData.requirements} onChange={handleInputChange} />

        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700">Lương và phúc lợi</label>
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
          <button onClick={onBack} className="bg-gray-300 text-black px-4 py-2 rounded">
            Quay lại
          </button>
          <button
            onClick={handleSubmit}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            Đăng việc
          </button>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange }) => (
  <div className="flex flex-col w-full">
    <label className="text-lg font-medium text-gray-700">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="border p-2 rounded"
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-lg font-medium text-gray-700">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
      className="border p-2 rounded"
    />
  </div>
);

export default CreateJobTab;
