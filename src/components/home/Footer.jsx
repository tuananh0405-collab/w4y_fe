import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#F2D49B] py-5">
      <div className="w-full h-px bg-black opacity-40 mb-5"></div>
      <div className="flex justify-between px-36 gap-10">
        <div>
          <h3 className="text-lg font-bold uppercase mb-5">VỀ W4U</h3>
          <ul className="text-sm font-light">
            <li>Giới thiệu</li>
            <li>Tuyển dụng</li>
            <li>Liên hệ</li>
            <li>Hỏi đáp</li>
            <li>Chính sách bảo mật</li>
            <li>Điều khoản dịch vụ</li>
            <li>Quy chế hoạt động</li>
          </ul>
          <div className="flex items-center mt-5">
            <div className="w-5 h-5 border border-black rounded-full flex items-center justify-center mr-2 text-xs font-light">C</div>
            <span className="text-sm font-light">Copyright © 2025 W4U</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold uppercase mb-5">HỒ SƠ VÀ CV</h3>
          <ul className="text-sm font-light">
            <li>Quản lý CV của bạn</li>
            <li>W4U profile</li>
            <li>Hướng dẫn viết CV</li>
            <li>Thư viện CV theo ngành nghề</li>
            <li>Review CV</li>
          </ul>
        </div>

        <div className="text-6xl font-normal">LOGO</div>

        <div className="max-w-xs">
          <p className="text-sm font-light mb-5">Sign up for emails and receive $15 off your order of $75 or more. Exclusions apply</p>
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-sm font-light">Email Address</label>
            <input type="email" className="border-b border-black pb-1" />
            <button className="w-20 h-6 bg-white border border-black text-sm font-semibold">SIGN UP</button>
          </div>
          <div className="flex gap-5 mb-5">
            <img src="https://dashboard.codeparrot.ai/api/image/Z9fvHSppvFKitUQv/image-36.png" alt="social" className="w-7 h-7" />
            <img src="https://dashboard.codeparrot.ai/api/image/Z9fvHSppvFKitUQv/image-37.png" alt="social" className="w-7 h-7" />
            <img src="https://dashboard.codeparrot.ai/api/image/Z9fvHSppvFKitUQv/image-38.png" alt="social" className="w-7 h-7" />
          </div>
          <p className="text-sm font-semibold underline cursor-pointer">Do Not Sell My Personal Information.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
