import React, { useState } from "react";
import { FaBuilding, FaEnvelope, FaPhone, FaKey, FaBell, FaGlobe, FaCog, FaMoon } from "react-icons/fa";

const SettingsTab = () => {
  const [language, setLanguage] = useState("vi");
  const [theme, setTheme] = useState("light");

  return (
    <div className="p-8 space-y-8 bg-[#d9f9f7] rounded-lg max-w-4xl mx-auto">
      {/* Thông tin tài khoản */}
      <section className="bg-[#e6f9f8] rounded-lg p-6 space-y-4">
        <h1 className="font-bold text-xl">Cài đặt tài khoản</h1>
        <h2 className="font-semibold text-sm mb-4">Thông tin tài khoản</h2>

        {/* Company */}
        <div className="flex items-center space-x-4">
          <FaBuilding className="text-gray-600 w-5 h-5" />
          <label htmlFor="company" className="min-w-[130px] font-medium">
            Tên công ty*
          </label>
          <input
            id="company"
            type="text"
            value="Công ty TNHH"
            readOnly
            className="flex-grow border border-gray-300 rounded-md px-3 py-2 bg-white cursor-not-allowed text-gray-700"
          />
        </div>

        {/* Email */}
        <div className="flex items-center space-x-4">
          <FaEnvelope className="text-gray-600 w-5 h-5" />
          <label htmlFor="email" className="min-w-[130px] font-medium">
            Email liên hệ*
          </label>
          <input
            id="email"
            type="email"
            value="123@company.com"
            readOnly
            className="flex-grow border border-gray-300 rounded-md px-3 py-2 bg-white cursor-not-allowed text-gray-700"
          />
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-4">
          <FaPhone className="text-gray-600 w-5 h-5" />
          <label htmlFor="phone" className="min-w-[130px] font-medium">
            Điện thoại liên hệ*
          </label>
          <input
            id="phone"
            type="tel"
            value="(+84)12345678"
            readOnly
            className="flex-grow border border-gray-300 rounded-md px-3 py-2 bg-white cursor-not-allowed text-gray-700"
          />
        </div>

        {/* Password */}
        <div className="flex items-center space-x-4">
          <FaKey className="text-gray-600 w-5 h-5" />
          <label htmlFor="password" className="min-w-[130px] font-medium">
            Mật khẩu*
          </label>
          <input
            id="password"
            type="password"
            value="********"
            readOnly
            className="flex-grow border border-gray-300 rounded-md px-3 py-2 bg-white cursor-not-allowed text-gray-700"
          />
        </div>

        {/* Button chỉnh sửa */}
        <div className="flex justify-end">
          <button className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-md">
            <FaKey />
            <span>Chỉnh sửa thông tin</span>
          </button>
        </div>
      </section>

      {/* Thông báo */}
      <section className="bg-[#e6f9f8] rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 font-semibold">
          <FaBell className="w-5 h-5" />
          <h3>Thông báo</h3>
        </div>
        <div className="space-y-2 text-gray-700">
          <label className="flex items-center space-x-2">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Nhận thông báo khi có ứng viên mới</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Nhận thông báo khi tin sắp hết hạn</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>Nhận email khuyến mãi</span>
          </label>
        </div>
      </section>

      {/* Giao diện & Ngôn ngữ */}
      <section className="bg-[#e6f9f8] rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
          <FaGlobe className="w-5 h-5" />
          <h3>Giao diện & Ngôn ngữ</h3>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <label htmlFor="language" className="font-medium">
              Ngôn ngữ:
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 rounded-md p-1"
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-medium">Giao diện:</span>
            <button
              onClick={() => setTheme("light")}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md border ${
                theme === "light" ? "bg-gray-300" : "bg-white"
              }`}
            >
              <FaCog />
              <span>Sáng</span>
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md border ${
                theme === "dark" ? "bg-gray-300" : "bg-white"
              }`}
            >
              <FaMoon />
              <span>Tối</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsTab;
