import React from "react";
import Footer from "../components/home/Footer";
import Header from "../components/home/Header";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import TestimonialCard from "../components/profile/TestimonialCard";
import { useSelector } from "react-redux";
import { useGetApplicantProfileQuery } from "../redux/api/applicantApiSlice";

const theme = {
  colors: {
    lightGray: '#A8BBB4',
    tealGreen: '#6A9183',
    mintGreen: '#A8E6CF',
    darkTeal: '#3A6656',
    veryDarkGreen: '#183C2E',
  }
};

const Profile = () => {
    // Lấy userId từ redux (hoặc context)
  const user = useSelector(state => state.auth.userState);
  const userId = user?.user?.id;

  // Gọi API lấy profile dữ liệu
  const { data, isLoading, error } = useGetApplicantProfileQuery( { skip: !userId });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Đang tải hồ sơ...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        <span>Lỗi tải hồ sơ</span>
      </div>
    );
  }

  // Lấy dữ liệu profile
  const profile = data?.data || {};
  const skills = profile.skills || [];


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

  // const skills = ["Branding Design", "UI/UX", "Art Working"];

  return (
   <div className="bg-[#F8FDFC]">
      <Header />
      <div className="flex flex-col md:flex-row justify-center p-8 space-y-8 md:space-y-0 md:space-x-8">
        {/* Profile Section */}
        <div className="flex-1 bg-white rounded-2xl p-8">
          <div className="flex flex-col items-center gap-8 mb-8">
            <Avatar
              alt={profile.name || "User"}
              src={profile.avatarUrl || ""}
              sx={{ width: 210, height: 210, bgcolor: "#d9d9d9" }}
            />
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">{profile.name || "Chưa có tên"}</h1>
              <h2 className="text-lg text-gray-500">{profile.jobTitle || "Chưa có chức danh"}</h2>
            </div>
            <div className="flex items-center gap-2">
              <Rating name="read-only" value={profile.rating || 0} precision={0.5} readOnly />
              <span className="text-lg">({profile.rating?.toFixed(1) || 0})</span>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold">Kỹ Năng</h3>
            <div className="h-px bg-gray-300 my-4"></div>
            <div className="flex flex-wrap gap-4">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: theme.colors.mintGreen,
                      color: theme.colors.tealGreen,
                    }}
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">Chưa có kỹ năng</p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold">Thông tin liên hệ</h3>
            <div className="h-px bg-gray-300 my-4"></div>
            <div className="flex flex-col gap-3">
              <p>Email: {profile.email || "Chưa có email"}</p>
              <p>Điện thoại: {profile.phone || "Chưa có số điện thoại"}</p>
              <p>Địa điểm: {profile.city || "Chưa có địa điểm"}</p>
            </div>
          </div>
        </div>

        {/* Right Section - Job Statistics & Featured Projects */}
        <div className="flex-1">
          {/* Job Statistics Section */}
          <div className="bg-white rounded-xl p-6 shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-6">Quản lý dự án tiêu biểu</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { value: 8, label: "Tổng số dự án" },
                { value: 4, label: "Dự án đang hiển thị" },
                { value: 312, label: "Lượt xem dự án" },
                { value: 21, label: "Nhà tuyển dụng đã xem" },
              ].map(({ value, label }, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 flex flex-col gap-6"
                >
                  <span
                    className="text-2xl font-bold"
                    style={{ color: theme.colors.tealGreen }}
                  >
                    {value}
                  </span>
                  <span className="text-lg text-gray-600">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects Section */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Các dự án tiêu biểu của bạn</h2>
              <button
                className="text-white px-4 py-2 rounded-lg"
                style={{ backgroundColor: theme.colors.tealGreen }}
              >
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
                        <span
                          className="px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: theme.colors.mintGreen,
                            color: theme.colors.tealGreen,
                          }}
                        >
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
                      <button
                        className="border px-4 py-2 rounded-lg"
                        style={{ borderColor: theme.colors.tealGreen, color: theme.colors.tealGreen }}
                      >
                        Chỉnh sửa
                      </button>
                      <button
                        className="text-white px-4 py-2 rounded-lg"
                        style={{ backgroundColor: theme.colors.tealGreen }}
                      >
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
