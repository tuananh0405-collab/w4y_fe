import React from "react";
import { logoIcon } from "../../assets";
import { useNavigate } from "react-router-dom";
import { tiktokImage } from "../../assets";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-white py-8 px-6 md:px-12 lg:px-24 xl:px-36">
      <div className="w-full h-px bg-black opacity-20 mb-8"></div>

      <div className="flex flex-col md:flex-row justify-between gap-12">
        {/* Column 1 */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="text-lg font-bold uppercase mb-6 tracking-wide">
            VỀ W4U
          </h3>
          <ul className="text-sm font-light space-y-2 text-gray-700">
            <li className="hover:text-teal-600 cursor-pointer transition">
              <a href="/">Giới thiệu</a>
            </li>
            <li className="hover:text-teal-600 cursor-pointer transition">
              <a href="/top-jobs">Tuyển dụng</a>
            </li>
          </ul>
          <div className="flex items-center mt-8 text-gray-600 text-xs">
            <div className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center mr-2 font-light">
              C
            </div>
            <span>Copyright © 2025 W4U</span>
          </div>
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
          <form
            className="flex flex-col gap-3 mb-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="email" className="text-sm font-light text-gray-800">
              {" "}
              Gửi phản hồi cho chúng tôi tại
            </label>
            <p className="border-b border-gray-500 focus:outline-none focus:border-teal-500 pb-2 transition">
              vutuananh0405@gmail.com
            </p>
            {/* <button
              type="submit"
              className="w-24 h-10 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded transition"
            >
              Gửi phản hồi cho chúng tôi
            </button> */}
          </form>
          <div className="flex gap-5 mb-6">
            <a
              href="https://www.facebook.com/profile.php?id=100093353077407"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://dashboard.codeparrot.ai/api/image/Z9fvHSppvFKitUQv/image-36.png"
                alt="Facebook"
                className="w-7 h-7 cursor-pointer hover:opacity-80 transition"
              />
            </a>

            <a
              href="https://www.tiktok.com/@w4u25"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={tiktokImage}
                alt="TikTok"
                className="w-7 h-7 cursor-pointer hover:opacity-80 transition"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
