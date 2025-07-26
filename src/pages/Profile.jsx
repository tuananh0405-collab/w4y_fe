
import React, { useRef, useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Divider, message, Modal, Form, Input, Select, Button, Popconfirm, DatePicker } from "antd";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import Rating from "@mui/material/Rating";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import TestimonialCard from "../components/profile/TestimonialCard";
import CreateProjectForm from "../components/profile/CreateProjectForm";
import {
  useCountApplicationsQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetApplicantProfileQuery,
  useGetMyProjectsQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useUpdateUserProfileMutation
} from "../redux/api/applicantApiSlice";
import { useGetUserReviewsQuery } from "../redux/api/applicationApiSlice";
import { useGetJobSkillsByIdsQuery } from "../redux/api/jobSkillApiSlice";
import theme from "../utils/theme";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

// Profile Edit Modal Component
const ProfileEditModal = ({ visible, onCancel, onSave, initialValues, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        jobTitle: initialValues.jobTitle,
        skills: initialValues.skills?.join(", "),
        userDetail: initialValues.userDetail,
        level: initialValues.level,
        openToWork: initialValues.openToWork ? "yes" : "no",
        timeWork: initialValues.timeWork,
        education: initialValues.education?.map((edu) => ({
          ...edu,
          startDate: edu.startDate ? dayjs(edu.startDate) : null,
          endDate: edu.endDate ? dayjs(edu.endDate) : null,
        })) || [],
        experience: initialValues.experience?.map((exp) => ({
          ...exp,
          startDate: exp.startDate ? dayjs(exp.startDate) : null,
          endDate: exp.endDate ? dayjs(exp.endDate) : null,
        })) || [],
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = async (values) => {
    const formattedValues = {
      ...values,
      skills: values.skills ? values.skills.split(",").map((s) => s.trim()).filter((s) => s) : [],
      openToWork: values.openToWork === "yes",
      education: values.education.map((edu) => ({
        ...edu,
        startDate: edu.startDate ? edu.startDate.format("YYYY-MM-DD") : "",
        endDate: edu.endDate ? edu.endDate.format("YYYY-MM-DD") : "",
      })),
      experience: values.experience.map((exp) => ({
        ...exp,
        startDate: exp.startDate ? exp.startDate.format("YYYY-MM-DD") : "",
        endDate: exp.endDate ? exp.endDate.format("YYYY-MM-DD") : "",
      })),
    };
    await onSave(formattedValues);
  };

  return (
    <Modal
      visible={visible}
      title="Chỉnh sửa hồ sơ"
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={loading ? "Đang lưu..." : "Lưu"}
      cancelText="Hủy"
      okButtonProps={{ disabled: loading }}
      width={800}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item name="jobTitle" label="Chức danh" rules={[{ required: true, message: "Vui lòng nhập chức danh" }]}>
          <Input placeholder="Chức danh" />
        </Form.Item>
        <Form.Item name="skills" label="Kỹ năng" help="Nhập các kỹ năng, cách nhau bằng dấu phẩy">
          <Input placeholder="Kỹ năng, ví dụ: JavaScript, React, Node.js" />
        </Form.Item>
        <Form.Item name="userDetail" label="Giới thiệu bản thân">
          <Input.TextArea rows={4} placeholder="Giới thiệu ngắn gọn về bạn" />
        </Form.Item>
        <Form.Item name="level" label="Cấp độ">
          <Select placeholder="Chọn cấp độ">
            <Option value="junior">Junior</Option>
            <Option value="middle">Middle</Option>
            <Option value="senior">Senior</Option>
            <Option value="lead">Lead</Option>
          </Select>
        </Form.Item>
        <Form.Item name="openToWork" label="Open to Work?">
          <Select placeholder="Chọn trạng thái">
            <Option value="yes">Đang tìm việc</Option>
            <Option value="no">Không tìm việc</Option>
          </Select>
        </Form.Item>
        <Form.Item name="timeWork" label="Loại hình làm việc">
          <Select placeholder="Chọn loại hình">
            <Option value="full-time">Full-time</Option>
            <Option value="part-time">Part-time</Option>
            <Option value="freelance">Freelance</Option>
          </Select>
        </Form.Item>
        <Form.List name="education">
          {(fields, { add, remove }) => (
            <div>
              <h3 className="text-lg font-semibold text-teal-700 mb-3">Học vấn</h3>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="mb-4 space-y-2 bg-white p-4 rounded shadow-sm">
                  <Form.Item {...restField} name={[name, "school"]} label="Trường" rules={[{ required: true, message: "Vui lòng nhập trường" }]}>
                    <Input placeholder="Trường" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "fieldOfStudy"]} label="Chuyên ngành" rules={[{ required: true, message: "Vui lòng nhập chuyên ngành" }]}>
                    <Input placeholder="Chuyên ngành" />
                  </Form.Item>
                  <div className="flex gap-2">
                    <Form.Item {...restField} name={[name, "startDate"]} label="Ngày bắt đầu" rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}>
                      <DatePicker picker="month" format="MMM YYYY" style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "endDate"]} label="Ngày kết thúc">
                      <DatePicker picker="month" format="MMM YYYY" style={{ width: "100%" }} />
                    </Form.Item>
                  </div>
                  <Button type="link" danger onClick={() => remove(name)}>
                    Xoá
                  </Button>
                </div>
              ))}
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Thêm học vấn
              </Button>
            </div>
          )}
        </Form.List>
        <Form.List name="experience">
          {(fields, { add, remove }) => (
            <div>
              <h3 className="text-lg font-semibold text-teal-700 mb-3">Kinh nghiệm làm việc</h3>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="mb-4 space-y-2 bg-white p-4 rounded shadow-sm">
                  <Form.Item {...restField} name={[name, "position"]} label="Vị trí" rules={[{ required: true, message: "Vui lòng nhập vị trí" }]}>
                    <Input placeholder="Vị trí" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "company"]} label="Công ty" rules={[{ required: true, message: "Vui lòng nhập công ty" }]}>
                    <Input placeholder="Công ty" />
                  </Form.Item>
                  <div className="flex gap-2">
                    <Form.Item {...restField} name={[name, "startDate"]} label="Ngày bắt đầu" rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}>
                      <DatePicker picker="month" format="MMM YYYY" style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "endDate"]} label="Ngày kết thúc">
                      <DatePicker picker="month" format="MMM YYYY" style={{ width: "100%" }} />
                    </Form.Item>
                  </div>
                  <Button type="link" danger onClick={() => remove(name)}>
                    Xoá
                  </Button>
                </div>
              ))}
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Thêm kinh nghiệm
              </Button>
            </div>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

// Contact Edit Modal Component
const ContactEditModal = ({ visible, onCancel, onSave, initialValues, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        email: initialValues.email || "",
        phone: initialValues.phone || "",
        city: initialValues.city || "",
        district: initialValues.district || "",
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = async (values) => {
    await onSave(values);
  };

  return (
    <Modal
      visible={visible}
      title="Chỉnh sửa thông tin liên hệ"
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={loading ? "Đang lưu..." : "Lưu"}
      cancelText="Hủy"
      okButtonProps={{ disabled: loading }}
      width={600}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { type: "email", message: "Vui lòng nhập email hợp lệ" },
            { required: true, message: "Vui lòng nhập email" },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item
          name="city"
          label="Tỉnh/Thành phố"
          rules={[{ required: true, message: "Vui lòng nhập tỉnh/thành phố" }]}
        >
          <Input placeholder="Nhập tỉnh/thành phố" />
        </Form.Item>
        <Form.Item
          name="district"
          label="Quận/Huyện"
          rules={[{ required: true, message: "Vui lòng nhập quận/huyện" }]}
        >
          <Input placeholder="Nhập quận/huyện" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Profile = () => {
  const user = useSelector((state) => state.auth.userState);
  const userId = user?.user?.id;
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const {
    data: reviewsData,
    isLoading: isReviewLoading,
    error: reviewError,
  } = useGetUserReviewsQuery(userId, { skip: !userId });
  const {
    data: projectData,
    isLoading: isProjectLoading,
    error: projectError,
    refetch: refetchProjects,
  } = useGetMyProjectsQuery();
  const { data, isLoading, error, refetch: refetchProfile } = useGetApplicantProfileQuery({
    skip: !userId,
  });
  const [updateAvatar, { isLoading: isUploading }] = useUploadAvatarMutation();
  const [updateUserProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [updateUserContact, { isLoading: isUpdatingContact }] = useUpdateUserProfileMutation();
  const { data: countData, isLoading: isCountLoading } = useCountApplicationsQuery(undefined, {
    skip: !userId,
  });
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [contactEditMode, setContactEditMode] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    skills: [],
    userDetail: "",
    level: "",
    openToWork: false,
    timeWork: "",
    education: [],
    experience: [],
    email: "",
    phone: "",
    city: "",
    district: "",
  });

  useEffect(() => {
    if (data?.data) {
      const profile = data.data;
      setFormData({
        jobTitle: profile.jobTitle || "",
        skills: profile.skills || [],
        userDetail: profile.userDetail || "",
        level: profile.level || "",
        openToWork: profile.openToWork || false,
        timeWork: profile.timeWork || "",
        education: profile.education || [],
        experience: profile.experience || [],
        email: profile.email || "",
        phone: profile.phone || "",
        city: profile.city || "",
        district: profile.district || "",
      });
    }
  }, [data]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await updateAvatar(formData).unwrap();
      message.success("Cập nhật avatar thành công");
      window.location.reload();
    } catch (error) {
      message.error("Lỗi khi upload avatar");
      console.error(error);
    }
  };

  const handleSave = async (values) => {
    try {
      await updateUserProfile(values).unwrap();
      message.success("Cập nhật hồ sơ thành công");
      setEditMode(false);
      refetchProfile();
    } catch (error) {
      message.error("Lỗi khi cập nhật hồ sơ");
      console.error(error);
    }
  };

  const handleContactSave = async (values) => {
    try {
      await updateUserContact(values).unwrap();
      message.success("Cập nhật thông tin liên hệ thành công");
      setContactEditMode(false);
      refetchProfile();
    } catch (error) {
      message.error("Lỗi khi cập nhật thông tin liên hệ");
      console.error(error);
    }
  };

  const showForm = () => {
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
  };

  const handleCreateProject = async (values) => {
    try {
      await createProject(values).unwrap();
      message.success("Dự án đã được tạo thành công");
      refetchProjects();
      setIsFormVisible(false);
    } catch (error) {
      message.error("Lỗi khi tạo dự án mới");
      console.error(error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId).unwrap();
      message.success("Dự án đã được xoá thành công");
      refetchProjects();
    } catch (error) {
      alert("Lỗi khi tạo dự án mới");
      console.error(error);
    }
  };

  const skillIds = user?.skills?.map(skill => skill.id) || [];
  const check = {
  nonEmptyArray: (arr) => Array.isArray(arr) && arr.length > 0,
};
  const {
    data: userSkillsQuery,
    isLoading: isLoadingUserSkills,
    error: errorLoadingUserSkills,
  } = useGetJobSkillsByIdsQuery({ ids: skillIds }, {
    skip: !check.nonEmptyArray(skillIds),
  });


  const userSkillsDocs = useMemo(() => {
    return userSkillsQuery?.data ?? [];
  }, [userSkillsQuery]);


  const profile = data?.data || {};

  const resumeFiles = profile.resumeFiles || [];
  const applicationCount = countData?.data?.totalApplications || 0;
  const projects = projectData?.data || [];
  const reviewCount = Array.isArray(reviewsData) ? reviewsData.length : 0;
  const averageRating =
    reviewCount > 0
      ? (reviewsData.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewCount).toFixed(1)
      : 0;


  return (
    <div className="bg-[#F8FDFC]">
      <Header />
      <div className="flex flex-col md:flex-row justify-center p-8 space-y-8 md:space-y-0 md:space-x-8">
        {/* Left Section - Profile Display */}
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
                "&:hover": { opacity: 0.6 },
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
              <h2 className="text-lg text-gray-600 mt-2">
                {formData.jobTitle || "Chưa có chức danh"}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Rating
                name="read-only"
                value={Number(averageRating)}
                precision={0.5}
                readOnly
              />
              <span className="text-lg font-semibold">{averageRating}</span>
              <span className="text-gray-500 text-base">
                ({reviewCount} đánh giá)
              </span>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-6 bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-teal-700 mb-3">
              Giới thiệu bản thân
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {formData.userDetail || "Chưa có thông tin giới thiệu"}
            </p>
          </div>

          {/* Open to Work, Level, Work Type */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl shadow-sm">
            <label className="flex flex-col text-gray-700 font-semibold">
              Open to Work?
              <span className="mt-2 text-gray-900">
                {formData.openToWork ? "Đang tìm việc" : "Không tìm việc"}
              </span>
            </label>
            <label className="flex flex-col text-gray-700 font-semibold">
              Loại hình làm việc
              <span className="mt-2 text-gray-900">
                {formData.timeWork === "full-time"
                  ? "Full-time"
                  : formData.timeWork === "part-time"
                  ? "Part-time"
                  : formData.timeWork === "freelance"
                  ? "Freelance"
                  : "Không rõ"}
              </span>
            </label>
            <label className="flex flex-col text-gray-700 font-semibold">
              Cấp độ
              <span className="mt-2 text-gray-900 capitalize">
                {formData.level || "Không rõ cấp độ"}
              </span>
            </label>
          </div>

          {/* Education */}
          <div className="mt-6 bg-gray-50 p-6 rounded-xl shadow-sm">
            <Divider orientation="left" className="text-teal-700 font-semibold">
              Học vấn
            </Divider>
            {formData.education.length > 0 ? (
              formData.education.map((edu, index) => (
                <div key={edu._id || index} className="mb-4">
                  <p className="text-gray-900">
                    <strong>Trường:</strong> {edu.school}
                  </p>
                  <p className="text-gray-900">
                    <strong>Chuyên ngành:</strong> {edu.fieldOfStudy}
                  </p>
                  <p className="text-gray-900">
                    <strong>Thời gian:</strong>{" "}
                    {dayjs(edu.startDate).format("MMM YYYY")} –{" "}
                    {edu.endDate ? dayjs(edu.endDate).format("MMM YYYY") : "Hiện tại"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Chưa có thông tin học vấn.</p>
            )}
          </div>

          {/* Experience */}
          <div className="mt-6 bg-gray-50 p-6 rounded-xl shadow-sm">
            <Divider orientation="left" className="text-teal-700 font-semibold">
              Kinh nghiệm làm việc
            </Divider>
            {formData.experience.length > 0 ? (
              formData.experience.map((exp, index) => (
                <div key={exp._id || index} className="mb-4">
                  <p className="text-base font-semibold">{exp.position}</p>
                  <p className="text-sm italic text-gray-700">{exp.company}</p>
                  <p className="text-sm text-gray-600">
                    {dayjs(exp.startDate).format("MMM YYYY")} -{" "}
                    {exp.endDate ? dayjs(exp.endDate).format("MMM YYYY") : "Hiện tại"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Chưa có kinh nghiệm làm việc.</p>
            )}
          </div>

          {/* Skills */}
          <div className="mt-6 bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-teal-700 mb-3">Kỹ Năng</h3>
            <div className="h-px bg-gray-300 my-4"></div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.length > 0 ? (
                formData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center px-3 py-1 rounded-full bg-gray-200"
                  >
                    {skill}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 mt-2">Chưa có kỹ năng</p>
              )}
            </div>
          </div>

          {/* Edit Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setEditMode(true)}
              className="px-8 py-3 rounded-lg border border-teal-600 text-teal-600 font-semibold hover:bg-teal-50 transition-colors duration-200"
            >
              Chỉnh sửa
            </button>

          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 space-y-6">

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-teal-700">Thông tin liên hệ</h3>
              <Button
                onClick={() => setContactEditMode(true)}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200"
                aria-label="Chỉnh sửa thông tin liên hệ"
              >
                Chỉnh sửa
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Email", value: profile.email || "Chưa có email" },
                { label: "Điện thoại", value: profile.phone || "Chưa có số điện thoại" },
                { label: "Tỉnh/Thành phố", value: profile.city || "Chưa có địa điểm" },
                { label: "Quận/Huyện", value: profile.district || "Chưa có địa điểm" },
              ].map(({ label, value }, idx) => (
                <label key={idx} className="flex flex-col text-gray-700 font-medium">
                  {label}
                  <span className="mt-1 bg-gray-100 p-3 rounded-lg text-gray-900 text-sm">
                    {value}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Featured Projects Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-800">Các dự án tiêu biểu của bạn</h2>
              <button
                onClick={showForm}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200"
                aria-label="Thêm dự án mới"
              >
                + Thêm dự án mới
              </button>
            </div>
            <hr className="border-gray-200 mb-6" />
            {isFormVisible && (
              <CreateProjectForm
                onCancel={handleCancel}
                onCreate={handleCreateProject}
                loading={isCreating}
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <img
                    src={
                      project.media[0]?.type === "image"
                        ? project.media[0].url
                        : "https://img.freepik.com/premium-vector/man-working-laptop-flat-character-illustration_648489-379.jpg?semt=ais_items_boosted&w=740"
                    }
                    alt={project.title}
                    className="w-full h-48 object-cover bg-gray-200"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-base md:text-lg font-semibold text-gray-800">{project.title}</h3>
                      {project.status === "featured" && (
                        <span className="bg-teal-100 text-teal-600 px-2 py-1 rounded-full text-xs font-medium">
                          Nổi bật
                        </span>
                      )}
                      {project.status === "draft" && (
                        <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-medium">
                          Bản nháp
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => navigate(`/project-room/${project._id}`)}
                        className="border border-teal-600 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors duration-200"
                        aria-label={`Xem chi tiết dự án ${project.title}`}
                      >
                        Xem chi tiết
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200 disabled:opacity-50"
                        disabled={isDeleting}
                        aria-label={`Xoá dự án ${project.title}`}
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

      {/* Profile Edit Modal */}
      <ProfileEditModal
        visible={editMode}
        onCancel={() => setEditMode(false)}
        onSave={handleSave}
        initialValues={formData}
        loading={isUpdating}
      />

      {/* Contact Edit Modal */}
      <ContactEditModal
        visible={contactEditMode}
        onCancel={() => setContactEditMode(false)}
        onSave={handleContactSave}
        initialValues={{
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          district: formData.district,
        }}
        loading={isUpdating}
      />

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
                designation="Nhà tuyển dụng"
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