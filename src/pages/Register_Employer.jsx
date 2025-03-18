import React, { useState } from "react";
import { bgImage, cityIcon, companyIcon, deviconGoogleIcon, emailIcon, keyPasswordIcon, passwordCheckIcon, phoneIcon, userIcon } from "../assets";
// import bgImg from "../assets/images/bg.png";
// import googleWhite from '../assets/icons/devicon_google.svg'
// import userIcon from '../assets/icons/user.svg'
// import emailIcon from '../assets/icons/email.svg'
// import passwordKeyIcon from '../assets/icons/key_password.svg'
// import passwordCheckIcon from '../assets/icons/password_check.svg'
// import phoneIcon from '../assets/icons/phone.svg'
// import companyIcon from '../assets/icons/company.svg'
// import cityIcon from '../assets/icons/city.svg'

const Register_Employer = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    gender: "",
    phone: "",
    company: "",
    city: "",
    district: "",
    agreeToTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-orange-100 relative">
      <img
        src={bgImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-lg p-10">
        <div className="relative z-10">
          <form
            className="flex flex-col items-center w-full max-w-lg mx-auto p-5"
            onSubmit={handleSubmit}
          >
            <h1 className="font-margarine text-4xl text-gray-900 mb-8">Hi!</h1>

            <button className="flex items-center justify-center w-full h-16 bg-orange-500 text-white text-xl font-medium rounded-lg mb-5 hover:bg-orange-600 transition-all duration-300">
              <img
                src={deviconGoogleIcon}
                alt="Google"
                className="w-9 h-9 mr-2"
              />
              Đăng ký bằng Google
            </button>

            <div className="flex items-center w-full my-5">
              <span className="flex-grow h-px bg-gray-300"></span>
              <span className="mx-4 text-gray-500">Hoặc bằng email</span>
              <span className="flex-grow h-px bg-gray-300"></span>
            </div>

            {/* Email */}
            <div className="w-full mb-5">
              <label className="block text-lg font-medium text-gray-900 mb-2">
                Email đăng nhập*
              </label>
              <div className="relative">
                <img
                  src={emailIcon}
                  alt="Email"
                  className="absolute left-3 top-3 w-6 h-6"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email (có tên miền công ty)"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div className="w-full mb-5">
              <label className="block text-lg font-medium text-gray-900 mb-2">
                Mật khẩu*
              </label>
              <div className="relative">
                <img
                  src={keyPasswordIcon}
                  alt="Password"
                  className="absolute left-3 top-3 w-6 h-6"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu (từ 6 - 25 ký tự)"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Nhập lại mật khẩu */}
            <div className="w-full mb-5">
              <label className="block text-lg font-medium text-gray-900 mb-2">
                Nhập lại mật khẩu*
              </label>
              <div className="relative">
                <img
                  src={passwordCheckIcon}
                  alt="Confirm Password"
                  className="absolute left-3 top-3 w-6 h-6"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Thông tin nhà tuyển dụng */}
            <h2 className="w-full text-xl font-bold text-gray-900 mb-5">
              Thông tin nhà tuyển dụng
            </h2>

            {/* Họ và tên */}
            <div className="w-full mb-5">
              <label className="block text-lg font-medium text-gray-900 mb-2">
                Họ và tên*
              </label>
              <div className="relative">
                <img
                  src={userIcon}
                  alt="Name"
                  className="absolute left-3 top-3 w-6 h-6"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Họ và tên"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Giới tính */}
            <div className="w-full mb-5">
              <label className="block text-lg font-medium text-gray-900 mb-2">
                Giới tính*
              </label>
              <div className="flex items-center gap-5">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Nam
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Nữ
                </label>
              </div>
            </div>

            {/* Số điện thoại */}
            <div className="w-full mb-5">
              <label className="block text-lg font-medium text-gray-900 mb-2">
                Số điện thoại cá nhân*
              </label>
              <div className="relative">
                <img
                  src={phoneIcon}
                  alt="Phone"
                  className="absolute left-3 top-3 w-6 h-6"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Số điện thoại cá nhân"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Công ty */}
            <div className="w-full mb-5">
              <label className="block text-lg font-medium text-gray-900 mb-2">
                Công ty*
              </label>
              <div className="relative">
                <img
                  src={companyIcon}
                  alt="Company"
                  className="absolute left-3 top-3 w-6 h-6"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Tên công ty"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Địa điểm làm việc */}
            <div className="flex flex-col md:flex-row w-full gap-5 mb-5">
              <div className="flex-grow">
                <label className="block text-lg font-medium text-gray-900 mb-2">
                  Tỉnh/ Thành phố
                </label>
                <div className="relative">
                  <img
                    src={cityIcon}
                    alt="City"
                    className="absolute left-3 top-3 w-6 h-6"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="Tỉnh/ Thành phố"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div className="flex-grow">
                <label className="block text-lg font-medium text-gray-900 mb-2">
                  Quận/ Huyện
                </label>
                <div className="relative">
                  <img
                    src={cityIcon}
                    alt="District"
                    className="absolute left-3 top-3 w-6 h-6"
                  />
                  <input
                    type="text"
                    name="district"
                    placeholder="Quận/ Huyện"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Điều khoản */}
            <div className="flex items-center gap-3 mb-5">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-5 h-5"
              />
              <label className="text-sm text-gray-900">
                Tôi đã đọc và đồng ý với Điều khoản dịch vụ và Chính sách bảo
                mật của W4U.
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-16 bg-orange-600 text-white text-xl font-bold rounded-lg mb-5 hover:bg-orange-700 transition-all duration-300"
            >
              Hoàn tất
            </button>

            <div className="flex gap-2 text-lg">
              <span className="text-gray-700">Đã có tài khoản?</span>
              <a href="#" className="text-gray-900 font-bold">
                Đăng nhập ngay
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register_Employer;
