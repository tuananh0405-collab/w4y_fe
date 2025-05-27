import React from "react";
import { employeeImage, employerImage } from "../assets";
import { useNavigate } from "react-router-dom";
import theme from "../utils/theme";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1200px] mx-auto p-8 font-sans">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Chào bạn,
        </h1>
        <p className="text-lg font-light text-gray-700 mb-1">
          Bạn hãy dành ra vài giây để xác nhận thông tin dưới đây nhé!
        </p>
        <hr className="border border-gray-300 my-6 w-2/3 mx-auto" />
        <p className="text-lg font-semibold text-gray-700">
          Để tối ưu tốt nhất cho trải nghiệm của bạn với W4U, vui lòng lựa chọn nhóm phù hợp với bạn
        </p>
      </div>

      <div className="flex justify-center gap-20 mt-8">
        {/* Nhà tuyển dụng */}
        <div className="flex flex-col items-center gap-6 cursor-pointer hover:scale-[1.05] transition-transform duration-300 ease-in-out">
          <div
            className="w-[350px] h-[350px] rounded-3xl overflow-hidden bg-[#A8BBB4] shadow-lg flex justify-center items-center"
            style={{ boxShadow: `0 8px 15px ${theme.colors.tealGreen}80` }}
            onClick={() => navigate("/register-employer")}
          >
            <img
              src={employerImage}
              alt="Recruiter"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            className="w-[300px] py-4 rounded-full text-white text-xl font-semibold
                       bg-[#3A6656] hover:bg-[#2D5848] active:scale-[0.95]
                       shadow-md shadow-[#2D584880] transition-all duration-200"
            onClick={() => navigate("/register-employer")}
          >
            Tôi là nhà tuyển dụng
          </button>
        </div>

        {/* Ứng viên tìm việc */}
        <div className="flex flex-col items-center gap-6 cursor-pointer hover:scale-[1.05] transition-transform duration-300 ease-in-out">
          <div
            className="w-[350px] h-[350px] rounded-3xl overflow-hidden bg-[#A8BBB4] shadow-lg flex justify-center items-center"
            style={{ boxShadow: `0 8px 15px ${theme.colors.tealGreen}80` }}
            onClick={() => navigate("/register-employee")}
          >
            <img
              src={employeeImage}
              alt="Job Seeker"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            className="w-[300px] py-4 rounded-full text-white text-xl font-semibold
                       bg-[#183C2E] hover:bg-[#145233] active:scale-[0.95]
                       shadow-md shadow-[#14523380] transition-all duration-200"
            onClick={() => navigate("/register-employee")}
          >
            Tôi là ứng viên tìm việc
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
