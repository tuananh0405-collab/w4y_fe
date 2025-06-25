import React, { useRef, useState, useEffect } from "react";
import Footer from "../components/home/Footer";
import Header from "../components/home/Header";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import Rating from "@mui/material/Rating";
import TestimonialCard from "../components/profile/TestimonialCard";
import { useSelector } from "react-redux";
import {
  useCountApplicationsQuery,
  useCreateProjectMutation,
  useGetApplicantProfileQuery,
  useGetMyProjectsQuery,
  useUpdateUserProfileMutation,
  useUploadAvatarMutation,
} from "../redux/api/applicantApiSlice";
import theme from "../utils/theme";
import { useGetUserReviewsQuery } from "../redux/api/applicationApiSlice";
import { useNavigate } from "react-router-dom";
import CreateProjectForm from "../components/profile/CreateProjectForm";

const Profile = () => {



  const user = useSelector((state) => state.auth.userState);
  const userId = user?.user?.id;
  const {
    data: reviewsData,
    isLoading: isReviewLoading,
    error: reviewError,
  } = useGetUserReviewsQuery(userId, { skip: !userId });
  const {
    data: projectData,
    isLoading: isProjectLoading,
    error: projectError,
  } = useGetMyProjectsQuery();

  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const { data, isLoading, error } = useGetApplicantProfileQuery({
    skip: !userId,
  });

  const [updateAvatar, { isLoading: isUploading }] = useUploadAvatarMutation();

  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const { data: countData, isLoading: isCountLoading } =
    useCountApplicationsQuery(undefined, { skip: !userId });
      const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();

     const [isFormVisible, setIsFormVisible] = useState(false);

  // Show form to add a new project
  const showForm = () => {
    setIsFormVisible(true);
  };

  // Hide form
  const handleCancel = () => {
    setIsFormVisible(false);
  };

  // Handle form submission for creating a new project
const handleCreateProject = async (values) => {
  try {
    await createProject(values).unwrap();
    alert("Dự án đã được tạo thành công");
    setIsFormVisible(false);
  } catch (error) {
    alert("Lỗi khi tạo dự án mới");
    console.error(error);
  }
};

  const [editMode, setEditMode] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    if (data?.data) {
      const profile = data.data;
      setJobTitle(profile.jobTitle || "");
      setSkills(profile.skills || []);
      setEmail(profile.email || "");
      setPhone(profile.phone || "");
      setCity(profile.city || "");
      setDistrict(profile.district || "");
    }
  }, [data]);

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

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      if (!skills.includes(e.target.value.trim())) {
        setSkills([...skills, e.target.value.trim()]);
      }
      e.target.value = "";
    }
  };
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await updateAvatar(formData).unwrap();
      alert("Cập nhật avatar thành công");
      window.location.reload(); // Refresh page after successful upload
    } catch (error) {
      console.error("Lỗi khi upload avatar:", error);
    }
  };
  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = async () => {
    try {
      await updateUserProfile({
        jobTitle,
        skills,
        email,
        phone,
        city,
        district,
      }).unwrap();
      alert("Cập nhật thành công");
      setEditMode(false);
    } catch (err) {
      alert("Lỗi khi cập nhật");
      console.error(err);
    }
  };

  const profile = data?.data || [];
  const resumeFiles = profile.resumeFiles || [];
  const applicationCount = countData?.data?.totalApplications || 0;

  // const defaultProjects = [
  //   {
  //     id: 1,
  //     title: "Exhibition AR",
  //     description: "Ứng dụng thực tế tăng cường cho bảo tàng Việt Nam",
  //     status: "featured",
  //     image:
  //       "https://dashboard.codeparrot.ai/api/image/Z9zBKSppvFKitUlc/rectangl.png",
  //   },
  //   {
  //     id: 2,
  //     title: "Exhibition AR",
  //     description: "Ứng dụng thực tế tăng cường cho bảo tàng Việt Nam",
  //     status: "featured",
  //     image:
  //       "https://dashboard.codeparrot.ai/api/image/Z9zBKSppvFKitUlc/rectangl-2.png",
  //   },
  // ];
  const projects = projectData?.data || [];

  return (
    <div className="bg-[#F8FDFC]">
      <Header />
      <div className="flex flex-col md:flex-row justify-center p-8 space-y-8 md:space-y-0 md:space-x-8">
        {/* Bên trái - Profile & Edit */}
        <div className="flex-1 bg-white rounded-2xl p-8">
          <div
            className="flex flex-col items-center gap-8 mb-8 relative group"
            onClick={() => fileInputRef.current?.click()}
          >
            <Avatar
              alt={profile.name || "User"}
              src={profile.avatarUrl || ""}
              sx={{
                width: 210,
                height: 210,
                bgcolor: "#d9d9d9",
                opacity: 1,
                transition: "opacity 0.3s",
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.6,
                },
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <EditIcon className="text-white text-4xl" />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              className="hidden"
            />
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                {profile.name || "Chưa có tên"}
              </h1>

              {/* Job Title */}
              {editMode ? (
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Chức danh"
                  className="mt-2 px-3 py-2 border rounded w-full max-w-md text-center"
                />
              ) : (
                <h2 className="text-lg text-gray-500">
                  {jobTitle || "Chưa có chức danh"}
                </h2>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Rating
                name="read-only"
                value={profile.rating || 0}
                precision={0.5}
                readOnly
              />
              <span className="text-lg">
                ({profile.rating?.toFixed(1) || 0})
              </span>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Kỹ Năng</h3>
            <div className="h-px bg-gray-300 my-4"></div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className={`flex items-center px-3 py-1 rounded-full cursor-pointer select-none ${
                    editMode ? "bg-green-200" : "bg-gray-200"
                  }`}
                  onClick={() => editMode && handleRemoveSkill(skill)}
                  title={editMode ? "Click để xoá" : ""}
                >
                  {skill}
                  {editMode && <span className="ml-1 font-bold">×</span>}
                </div>
              ))}
              {editMode && (
                <input
                  type="text"
                  placeholder="Nhập kỹ năng rồi nhấn Enter"
                  onKeyDown={handleAddSkill}
                  className="border p-2 rounded w-full max-w-sm"
                />
              )}
              {!editMode && skills.length === 0 && (
                <p className="text-gray-500 mt-2">Chưa có kỹ năng</p>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 max-w-md p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-6 text-teal-700">
              Thông tin liên hệ
            </h3>
            <div className="flex flex-col gap-6">
              <label className="flex flex-col text-gray-700 font-semibold">
                Email
                {editMode ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    placeholder="Email"
                  />
                ) : (
                  <span className="mt-2 block bg-gray-50 p-3 rounded text-gray-900">
                    {email || "Chưa có email"}
                  </span>
                )}
              </label>

              <label className="flex flex-col text-gray-700 font-semibold">
                Điện thoại
                {editMode ? (
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    placeholder="Số điện thoại"
                  />
                ) : (
                  <span className="mt-2 block bg-gray-50 p-3 rounded text-gray-900">
                    {phone || "Chưa có số điện thoại"}
                  </span>
                )}
              </label>

              <label className="flex flex-col text-gray-700 font-semibold">
                Tỉnh/Thành phố
                {editMode ? (
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-2 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    placeholder="Tỉnh/Thành phố"
                  />
                ) : (
                  <span className="mt-2 block bg-gray-50 p-3 rounded text-gray-900">
                    {city || "Chưa có địa điểm"}
                  </span>
                )}
              </label>

              <label className="flex flex-col text-gray-700 font-semibold">
                Quận/Huyện
                {editMode ? (
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="mt-2 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    placeholder="Quận/Huyện"
                  />
                ) : (
                  <span className="mt-2 block bg-gray-50 p-3 rounded text-gray-900">
                    {district || "Chưa có địa điểm"}
                  </span>
                )}
              </label>
            </div>
          </div>

          {/* Buttons Edit / Save */}
          <div className="mt-8 flex justify-center ">
            {editMode ? (
              <button
                onClick={handleSave}
                disabled={isUpdating}
                className="px-8 py-3 rounded bg-teal-600 text-white font-semibold hover:bg-teal-700 cursor-pointer"
              >
                {isUpdating ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="px-8 py-3 rounded border border-teal-600 text-teal-600 font-semibold hover:bg-teal-100 cursor-pointer"
              >
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>

        {/* Bên phải giữ nguyên */}
        <div className="flex-1">
          {/* Job Statistics Section */}
          <div className="bg-white rounded-xl p-6 shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-6">Quản lý dự án tiêu biểu</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[
                { value: resumeFiles.length, label: "Danh sách CV của bạn" },
                { value: applicationCount, label: "Dự án đã ứng tuyển" },
                { value: 312, label: "Lượt xem hồ sơ" },
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
              <button  onClick={showForm}
                className="text-white px-4 py-2 rounded-lg"
                style={{ backgroundColor: theme.colors.tealGreen }}
              >
                + Thêm dự án mới
              </button>
            </div>
            <div className="h-px bg-black mb-8"></div>
 {/* Show CreateProjectForm when isFormVisible is true */}
      {isFormVisible && (
        <CreateProjectForm
          onCancel={handleCancel}
          onCreate={handleCreateProject}
          loading={isCreating}
        />
      )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
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
                        onClick={() => navigate(`/project-room/${project._id}`)}
                        className="border px-4 py-2 rounded-lg cursor-pointer"
                        style={{
                          borderColor: theme.colors.tealGreen,
                          color: theme.colors.tealGreen,
                        }}
                      >
                        Xem chi tiết
                      </button>

                      <button
                        className="text-white px-4 py-2 rounded-lg cursor-pointer"
                        style={{ backgroundColor: theme.colors.tealGreen }}
                      >
                        Xoá dự án
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
        <h1 className="font-bold text-2xl mb-6">Đánh giá từ nhà tuyển dụng</h1>
        <img
          src="https://dashboard.codeparrot.ai/api/image/Z9zDwZIdzXb5Olpw/line-20.png"
          alt="line"
          className="w-full h-px bg-gray-400 mb-8"
        />
        <div className="flex flex-col gap-8 w-full">
          {isReviewLoading ? (
            <p>Đang tải đánh giá...</p>
          ) : reviewError ? (
            <p className="text-red-600">Lỗi khi tải đánh giá</p>
          ) : reviewsData?.length === 0 ? (
            <p className="text-gray-500">Chưa có đánh giá nào</p>
          ) : (
            reviewsData.map((review, index) => (
              <TestimonialCard
                key={index}
                name={review.reviewer?.name || "Ẩn danh"}
                designation={"Nhà tuyển dụng"}
                rating={review.rating}
                description={review.comment || "Không có nhận xét"}
                avatarSrc={
                  review.reviewer?.avatarUrl ||
                  "https://dashboard.codeparrot.ai/api/image/Z9zDwZIdzXb5Olpw/ellipse.png"
                }
              />
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
