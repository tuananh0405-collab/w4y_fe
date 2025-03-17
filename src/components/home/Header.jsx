import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center h-32 px-8 bg-transparent">
      <div className="text-4xl font-normal">LOGO</div>
      <nav className="flex gap-10">
        <a href="#" className="text-xl font-bold text-gray-800">Việc làm</a>
        <a href="#" className="text-xl font-bold text-gray-800">Hồ sơ & CV</a>
        <a href="#" className="text-xl font-bold text-gray-800">Công cụ</a>
        <a href="#" className="text-xl font-bold text-gray-800">W4UVIP</a>
      </nav>
      <div className="flex gap-5">
        <button className="text-xl font-medium text-gray-800">Đăng nhập</button>
        <button className="text-xl font-medium text-gray-800 bg-orange-500 rounded-md px-5 py-2">Đăng ký</button>
      </div>
    </header>
  );
};

export default Header;
