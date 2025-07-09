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
import theme from "../utils/theme";
import DashboardTab from "../components/up-job/DashboardTab";
import CreateJobTab from "../components/up-job/CreateJobTab";
import PostedJobsTab from "../components/up-job/PostedJobsTab";
import ApplicantsTab from "../components/up-job/ApplicantsTab";
import SearchApplicantsTab from "../components/up-job/SearchApplicantsTab";
import CompanyProfileTab from "../components/up-job/CompanyProfileTab";
import ServicePackageTab from "../components/up-job/ServicePackageTab";
import SettingsTab from "../components/up-job/SettingsTab";
import Sidebar from "../components/up-job/Sidebar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const tabsComponents = [
  DashboardTab,
  CreateJobTab,
  PostedJobsTab,
  ApplicantsTab,
  SearchApplicantsTab,
  CompanyProfileTab,
  ServicePackageTab,
  SettingsTab,
];

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
      // Optionally, show a success toast:
      // toast.success("Job created successfully!");
    } catch (error) {
      // Handle error message extraction (array or string)
      const errorMsg =
        Array.isArray(error?.data?.errors)
          ? error.data.errors.map(e => e.msg).join(', ')
          : error?.data?.errors?.msg ||
            error?.data?.message ||
            error?.error ||
            "Error creating job. Please try again.";
      toast.error(errorMsg);
      console.error("Error creating job:", error);
    }
  };



 const [activeIndex, setActiveIndex] = useState(1);
// Hàm xử lý chung chuyển tab
  const handleSelectTab = (index) => {
    setActiveIndex(index);
  };
  const ActiveTab = tabsComponents[activeIndex];

  const handleSubmitJob = (jobData) => {
    console.log("Submit job:", jobData);
    // Gọi API hoặc xử lý ở đây...
  };
  return (
       <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className="flex flex-grow px-20 py-10 shadow-2xl" style={{backgroundColor: theme.colors.bgColor}}>
        <Sidebar
          menuItems={menuItems}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
        <main className="bg-white rounded-lg p-5 w-full shadow-2xl">
          <ActiveTab onBack={() => setActiveIndex(0)} onSubmit={handleSubmitJob}  onSelectTab={handleSelectTab} />
        </main>
      </div>
      <Footer />
      <ToastContainer /> {/* Add this at the root of your page */}
    </div>
  );
};

export default UpJob;
