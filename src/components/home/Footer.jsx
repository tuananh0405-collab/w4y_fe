import React from 'react';
import { logoIcon } from '../../assets';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-white py-8 px-6 md:px-12 lg:px-24 xl:px-36">
      <div className="w-full h-px bg-black opacity-20 mb-8"></div>

      <div className="flex flex-col md:flex-row justify-between gap-12">
        {/* Column 1 */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="text-lg font-bold uppercase mb-6 tracking-wide">VỀ W4U</h3>
          <ul className="text-sm font-light space-y-2 text-gray-700">
            <li className="hover:text-teal-600 cursor-pointer transition">Giới thiệu</li>
            <li className="hover:text-teal-600 cursor-pointer transition">Tuyển dụng</li>
            <li className="hover:text-teal-600 cursor-pointer transition">Liên hệ</li>
            <li className="hover:text-teal-600 cursor-pointer transition">Hỏi đáp</li>
            <li className="hover:text-teal-600 cursor-pointer transition">Chính sách bảo mật</li>
            <li className="hover:text-teal-600 cursor-pointer transition">Điều khoản dịch vụ</li>
            <li className="hover:text-teal-600 cursor-pointer transition">Quy chế hoạt động</li>
          </ul>
          <div className="flex items-center mt-8 text-gray-600 text-xs">
            <div className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center mr-2 font-light">C</div>
            <span>Copyright © 2025 W4U</span>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="text-lg font-bold uppercase mb-6 tracking-wide">HỒ SƠ VÀ CV</h3>
          <ul className="text-sm font-light space-y-2 text-gray-700">
            <li className="hover:text-teal-600 cursor-pointer transition">Quản lý CV của bạn</li>
            <li className="hover:text-teal-600 cursor-pointer transition">W4U profile</li>
            <li className="hover:text-teal-600 cursor-pointer transition">Hướng dẫn viết CV</li>
            <li className="hover:text-teal-600 cursor-pointer transition">Thư viện CV theo ngành nghề</li>
            <li className="hover:text-teal-600 cursor-pointer transition">Review CV</li>
          </ul>
        </div>

        {/* Column 3 - Logo */}
        <div className="flex justify-center items-center flex-1 min-w-[180px]">
          <div
            className="cursor-pointer"
            onClick={() => navigate("/")}
            aria-label="Back to homepage"
          >
            <img src={logoIcon} alt="Logo" className="h-70 w-auto" />
          </div>
        </div>

        {/* Column 4 - Newsletter */}
        <div className="flex-1 min-w-[250px]">
          <p className="text-sm font-light mb-6 text-gray-700">
            Sign up for emails and receive $15 off your order of $75 or more. Exclusions apply.
          </p>
          <form className="flex flex-col gap-3 mb-6" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email" className="text-sm font-light text-gray-800">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              className="border-b border-gray-500 focus:outline-none focus:border-teal-500 pb-2 transition"
              required
            />
            <button
              type="submit"
              className="w-24 h-10 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded transition"
            >
              SIGN UP
            </button>
          </form>
          <div className="flex gap-5 mb-6">
            <img src="https://dashboard.codeparrot.ai/api/image/Z9fvHSppvFKitUQv/image-36.png" alt="Facebook" className="w-7 h-7 cursor-pointer hover:opacity-80 transition" />
            <img src="https://dashboard.codeparrot.ai/api/image/Z9fvHSppvFKitUQv/image-37.png" alt="Twitter" className="w-7 h-7 cursor-pointer hover:opacity-80 transition" />
            <img src="https://dashboard.codeparrot.ai/api/image/Z9fvHSppvFKitUQv/image-38.png" alt="Instagram" className="w-7 h-7 cursor-pointer hover:opacity-80 transition" />
          </div>
          <p className="text-sm font-semibold underline cursor-pointer text-gray-700 hover:text-teal-600 transition">
            Do Not Sell My Personal Information.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
