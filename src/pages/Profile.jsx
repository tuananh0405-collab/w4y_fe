import React from "react";
import Footer from "../components/home/Footer";
import Header from "../components/home/Header";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import TestimonialCard from "../components/profile/TestimonialCard";

const Profile = () => {
  const defaultProjects = [
    {
      id: 1,
      title: "Exhibition AR",
      description: "Ứng dụng thực tế tăng cường cho bảo tàng Việt Nam",
      status: "featured",
      image: "https://dashboard.codeparrot.ai/api/image/Z9zBKSppvFKitUlc/rectangl.png",
    },
    {
      id: 2,
      title: "Exhibition AR",
      description: "Ứng dụng thực tế tăng cường cho bảo tàng Việt Nam",
      status: "featured",
      image: "https://dashboard.codeparrot.ai/api/image/Z9zBKSppvFKitUlc/rectangl-2.png",
    },
    {
      id: 3,
      title: "W4U",
      description: "Ứng dụng thực tế tăng cường cho bảo tàng Việt Nam",
      status: "draft",
      image: "https://dashboard.codeparrot.ai/api/image/Z9zBKSppvFKitUlc/rectangl-3.png",
    },
    {
      id: 4,
      title: "Exhibition AR",
      description: "Ứng dụng thực tế tăng cường cho bảo tàng Việt Nam",
      status: "normal",
      image: "https://dashboard.codeparrot.ai/api/image/Z9zBKSppvFKitUlc/rectangl-4.png",
    },
  ];

  const skills = ["Branding Design", "UI/UX", "Art Working"];

  return (
    <div className="bg-[#f9f4e7]">
      <Header />
      <div className="flex flex-col md:flex-row justify-center p-8 space-y-8 md:space-y-0 md:space-x-8">
        {/* Profile Section */}
        <div className="flex-1 bg-white rounded-2xl p-8">
          <div className="flex flex-col items-center gap-8 mb-8">
            <Avatar
              alt="Profile"
              src="https://dashboard.codeparrot.ai/api/image/Z9zBKSppvFKitUlc/ellipse.png"
              sx={{ width: 210, height: 210, bgcolor: "#d9d9d9" }}
            />
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Đỗ Thế Hảo</h1>
              <h2 className="text-lg text-gray-500">Junior Designer</h2>
            </div>
            <div className="flex items-center gap-2">
              <Rating name="read-only" value={4.2} precision={0.5} readOnly />
              <span className="text-lg">(4.2)</span>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold">Kỹ Năng</h3>
            <div className="h-px bg-gray-300 my-4"></div>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold">Thông tin liên hệ</h3>
            <div className="h-px bg-gray-300 my-4"></div>
            <div className="flex flex-col gap-3">
              <p>Email: haodtgudjob@gmail.com</p>
              <p>Điện thoại: +84 987 654 321</p>
              <p>Địa điểm: Hà Nội, Việt Nam</p>
            </div>
          </div>
        </div>

        {/* Right Section - Job Statistics & Featured Projects */}
        <div className="flex-1">
          {/* Job Statistics Section */}
          <div className="bg-white rounded-xl p-6 shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-6">Quản lý dự án tiêu biểu</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 flex flex-col gap-6">
                <span className="text-2xl font-bold text-orange-500">8</span>
                <span className="text-lg text-gray-600">Tổng số dự án</span>
              </div>
              <div className="bg-white rounded-2xl p-6 flex flex-col gap-6">
                <span className="text-2xl font-bold text-orange-500">4</span>
                <span className="text-lg text-gray-600">Dự án đang hiển thị</span>
              </div>
              <div className="bg-white rounded-2xl p-6 flex flex-col gap-6">
                <span className="text-2xl font-bold text-orange-500">312</span>
                <span className="text-lg text-gray-600">Lượt xem dự án</span>
              </div>
              <div className="bg-white rounded-2xl p-6 flex flex-col gap-6">
                <span className="text-2xl font-bold text-orange-500">21</span>
                <span className="text-lg text-gray-600">Nhà tuyển dụng đã xem</span>
              </div>
            </div>
          </div>

          {/* Featured Projects Section */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Các dự án tiêu biểu của bạn</h2>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                + Thêm dự án mới
              </button>
            </div>
            <div className="h-px bg-black mb-8"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {defaultProjects.map((project) => (
                <div
                  key={project.id}
                  className="border border-gray-400 rounded-lg overflow-hidden"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-52 object-cover bg-gray-300"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      {project.status === "featured" && (
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                          Nổi bật
                        </span>
                      )}
                      {project.status === "draft" && (
                        <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
                          Bản nháp
                        </span>
                      )}
                    </div>
                    <p className="mb-8">{project.description}</p>
                    <div className="flex gap-4">
                      <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg">
                        Chỉnh sửa
                      </button>
                      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                        Xoá khỏi nổi bật
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="flex flex-col items-center w-[1360px] p-8 bg-white rounded-2xl shadow-sm justify-center mx-auto">
        <h1 className="font-bold text-2xl mb-6">Đánh giá từ đồng nghiệp & khách hàng</h1>
        <img
          src="https://dashboard.codeparrot.ai/api/image/Z9zDwZIdzXb5Olpw/line-20.png"
          alt="line"
          className="w-full h-px bg-gray-400 mb-8"
        />
        <div className="flex flex-col gap-8 w-full">
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
