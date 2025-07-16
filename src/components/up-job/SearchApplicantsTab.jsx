// src/components/SearchApplicantsTab.jsx
import React, { useState } from 'react';
import { useSearchApplicantsQuery } from '../../redux/api/applicantApiSlice';

const SearchApplicantsTab = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');

  // Xử lý thay đổi trong các trường input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'jobTitle':
        setJobTitle(value);
        break;
      case 'skills':
        setSkills(value);
        break;
      case 'experience':
        setExperience(value);
        break;
      case 'location':
        setLocation(value);
        break;
      default:
        break;
    }
  };
  // Lấy các filters từ state
  const filters = { jobTitle, skills, experience, location };

  // Gọi API tìm kiếm với các bộ lọc
  const { data: applicants, error, isLoading } = useSearchApplicantsQuery(filters);
console.log('====================================');
console.log(applicants);
console.log('====================================');
  const handleSearch = () => {
    // Xử lý tìm kiếm ở đây (gửi dữ liệu đến backend hoặc lọc trong frontend)
    console.log({ jobTitle, skills, experience, location });
  };
  return(
 <div className="container mx-auto p-5">
    <div className="box p-5 bg-[#D8F7F2]">
      <div className="header text-2xl font-bold mb-5">Tìm kiếm ứng viên</div>

      <div className="filter-section bg-[#E6F9F5] p-5 rounded-md mb-5">
        {/* Chức danh công việc */}
        <div className="filter-item mb-4">
          <div className="filter-label text-lg mb-2">Chức danh công việc</div>
          <input
            type="text"
            name="jobTitle"
            value={jobTitle}
            onChange={handleInputChange}
            placeholder="Nhập chức danh công việc"
            className="bg-[#F0F8F5] border text-gray-500 p-2 rounded-md w-full"
          />
        </div>

        {/* Kỹ năng */}
        <div className="filter-item mb-4">
          <div className="filter-label text-lg mb-2">Kỹ năng</div>
          <input
            type="text"
            name="skills"
            value={skills}
            onChange={handleInputChange}
            placeholder="Nhập kỹ năng (vd: Java, Python, AWS)"
            className="bg-[#F0F8F5] border text-gray-500 p-2 rounded-md w-full"
          />
        </div>

        {/* Kinh nghiệm */}
        <div className="filter-item mb-4">
          <div className="filter-label text-lg mb-2">Kinh nghiệm</div>
          <input
            type="text"
            name="experience"
            value={experience}
            onChange={handleInputChange}
            placeholder="Nhập số năm kinh nghiệm"
            className="bg-[#F0F8F5] border text-gray-500 p-2 rounded-md w-full"
          />
        </div>

        {/* Địa điểm */}
        <div className="filter-item mb-4">
          <div className="filter-label text-lg mb-2">Địa điểm</div>
          <input
            type="text"
            name="location"
            value={location}
            onChange={handleInputChange}
            placeholder="Nhập địa điểm (vd: Hà Nội)"
            className="bg-[#F0F8F5] border text-gray-500 p-2 rounded-md w-full"
          />
        </div>

        {/* Nút lọc */}
        <div className="filter-buttons flex justify-end gap-4 mt-5">
          <button
            onClick={() => {
              setJobTitle('');
              setSkills('');
              setExperience('');
              setLocation('');
            }}
            className="text-[#4F4F4F] text-md border-2 py-2 px-5 rounded-md border-[#BDBDBD] hover:bg-[#E0E0E0]"
          >
            Đặt lại
          </button>
          <button
            onClick={handleSearch}
            className="bg-[#4CAF50] text-white py-2 px-5 rounded-md hover:bg-[#45A049]"
          >
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
      <div className="results-section mt-5">
    <div className="results-header text-2xl font-bold mb-5">
      Kết quả ({applicants?.length || 0})
    </div>

   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {applicants?.data?.map((applicant, index) => (
    <div key={index} className="card bg-white p-5 shadow-lg rounded-xl border transition-all hover:shadow-xl hover:bg-gray-50">
      <div className="candidate-card text-center mb-4">
        {/* Candidate Initials */}
        <div className="candidate-initials font-bold bg-gray-300 rounded-full w-16 h-16 mx-auto flex items-center justify-center text-white text-xl">
          {applicant.name ? applicant.name.charAt(0) : 'N/A'}
        </div>

        {/* Candidate Name */}
        <div className="candidate-name text-xl font-semibold mt-3 text-gray-800">
          {applicant.name || 'N/A'}
        </div>

        {/* Job Title */}
        <div className="candidate-title text-md text-gray-600 mb-2">
          {applicant.profile?.jobTitle || 'N/A'}
        </div>

        {/* Experience */}
        <div className="candidate-experience text-sm text-gray-500 mb-2">
          {applicant.profile?.experience || 'N/A'} năm kinh nghiệm
        </div>

        {/* Location */}
        <div className="candidate-location text-sm text-gray-500 mb-2">
          {applicant.city || 'N/A'}
        </div>

        {/* Skills */}
        <div className="candidate-skills text-sm text-gray-500 mb-4">
          Kỹ năng: {applicant.profile?.skills || 'N/A'}
        </div>

        {/* Detail Button */}
        <button className="bg-[#4CAF50] text-white py-2 px-6 mt-3 rounded-md hover:bg-[#45A049] focus:outline-none focus:ring-2 focus:ring-green-500 transition-all">
          Xem hồ sơ chi tiết
        </button>
      </div>
    </div>
  ))}
</div>

  </div>
  </div>
  )
}
 


export default SearchApplicantsTab;
