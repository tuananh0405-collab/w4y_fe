import React, { useState } from "react";
import { AiOutlineKey, AiOutlineLock } from "react-icons/ai";

export const ResetPasswordBox = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [logoutOtherDevices, setLogoutOtherDevices] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }
    // Logic gửi API cập nhật mật khẩu mới
    console.log({ newPassword, logoutOtherDevices });
  };

  return (
    <main className="bg-white rounded-[40px] shadow-lg max-w-md mx-auto p-8 w-full font-sans">
      <div className="text-center mb-8">
        <div className="text-3xl font-normal">LOGO</div>
        <h2 className="text-2xl font-bold mt-2">Tạo lại mật khẩu của bạn</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Mật khẩu mới */}
        <div>
          <label htmlFor="new-password" className="block mb-2 font-semibold text-black text-lg">
            Mật khẩu mới<span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <AiOutlineKey className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              id="new-password"
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700 placeholder-gray-400 text-base"
            />
          </div>
        </div>

        {/* Nhập lại mật khẩu */}
        <div>
          <label htmlFor="confirm-password" className="block mb-2 font-semibold text-black text-lg">
            Nhập lại mật khẩu<span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <AiOutlineLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              id="confirm-password"
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700 placeholder-gray-400 text-base"
            />
          </div>
        </div>

        {/* Checkbox Đăng xuất thiết bị khác */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="logout-other-devices"
            checked={logoutOtherDevices}
            onChange={() => setLogoutOtherDevices((prev) => !prev)}
            className="w-5 h-5 text-green-700 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="logout-other-devices" className="cursor-pointer text-black font-medium text-base select-none">
            Đăng xuất ra khỏi thiết bị khác
          </label>
        </div>

        {/* Nút Hoàn tất */}
        <button
          type="submit"
          className="w-full bg-green-900 hover:bg-green-800 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
        >
          Hoàn tất
        </button>
      </form>

      {/* Footer links */}
      <nav className="flex justify-between mt-6 text-green-700 font-semibold text-base">
        <a href="#" className="hover:underline cursor-pointer">
          Quay lại đăng nhập
        </a>
        <a href="#" className="hover:underline cursor-pointer">
          Đăng ký tài khoản mới
        </a>
      </nav>
    </main>
  );
};
