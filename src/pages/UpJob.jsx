import React, { useState } from "react";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
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
    workType: "",
    level: "",
    industry: "",
    position: "",
    location: "",
    experience: "",
    benefits: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  const handleBack = () => {};
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className="flex flex-grow px-20 bg-gray-200 py-10">
        {/* <Sidebar /> */}
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
        {/* <JobPostingForm /> */}
        <div className="bg-white rounded-lg p-5 w-full">
          <h2 className="text-xl font-bold text-orange-500 mb-6">
            Thông tin cơ bản
          </h2>
          <div className="flex flex-col gap-5">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Senior Java Developer - Lương đến 4000$"
              className="border p-2 rounded"
            />
            <div className="flex gap-5">
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="3"
                className="border p-2 rounded flex-grow"
              />
              <input
                type="text"
                name="workType"
                value={formData.workType}
                onChange={handleInputChange}
                placeholder="Toàn thời gian"
                className="border p-2 rounded flex-grow"
              />
            </div>
            <div className="flex gap-5">
              <input
                type="text"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                placeholder="Chuyên viên"
                className="border p-2 rounded flex-grow"
              />
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                placeholder="CNTT"
                className="border p-2 rounded flex-grow"
              />
            </div>
            <div className="flex gap-5">
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="Lập trình viên"
                className="border p-2 rounded flex-grow"
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Hà Nội"
                className="border p-2 rounded flex-grow"
              />
            </div>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="3-5 năm"
              className="border p-2 rounded"
            />
            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleInputChange}
              placeholder="Thông tin phúc lợi và lương*"
              className="border p-2 rounded"
              rows="4"
            />
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
                Tiếp tục
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
