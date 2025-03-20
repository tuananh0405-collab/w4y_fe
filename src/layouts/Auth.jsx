import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Import dispatch từ Redux
import { useSignInMutation } from "../redux/api/authApiSlice"; // Import hook từ apiSlice
import { setCredentials } from "../redux/features/authSlice"; // Import action setCredentials
import { cskhImage, emailIcon, googleBlackIcon, keyPasswordIcon } from "../assets";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, { isLoading, error }] = useSignInMutation(); // Hook để gọi mutation signIn
  const dispatch = useDispatch(); // Khởi tạo dispatch từ Redux
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gọi API đăng nhập
      const userData = await signIn({ email, password }).unwrap(); // Gọi mutation và trả về kết quả

      // Nếu đăng nhập thành công, dispatch setCredentials để lưu vào Redux state và localStorage
      dispatch(setCredentials(userData)); // Lưu thông tin người dùng vào Redux
      navigate('/home')

      console.log(userData); // Xử lý thành công (có thể chuyển hướng hoặc cập nhật trạng thái người dùng)
      // Bạn có thể sử dụng navigate() từ react-router-dom để chuyển hướng sang trang khác
    } catch (err) {
      console.error("Login failed: ", err); // Xử lý lỗi nếu có
    }
  };

  return (
    <div className="flex flex-row w-full min-h-screen">
      {/* Left Section */}
      <div className="flex-grow flex flex-col items-center p-10 bg-white">
        {/* Header */}
        <header className="flex justify-between items-center w-full mb-10">
          <h1 className="text-4xl font-bold text-black">LOGO</h1>
          <nav className="flex gap-10 items-center">
            <a href="#" className="text-xl font-semibold text-gray-900 hover:text-gray-600">
              Việc làm
            </a>
            <a href="#" className="text-xl font-semibold text-gray-900 hover:text-gray-600">
              Hồ sơ & CV
            </a>
            <a href="#" className="text-xl font-semibold text-gray-900 hover:text-gray-600">
              Công cụ
            </a>
            <a href="#" className="text-xl font-semibold text-gray-900 hover:text-gray-600">
              W4UVIP
            </a>
          </nav>
        </header>

        {/* Welcome back text */}
        <div className="flex justify-center items-center w-full mb-8">
          <h1 className="text-5xl font-semibold text-gray-900 text-center">Welcome back!</h1>
        </div>

        {/* Login Form */}
        <form className="max-w-[670px] mx-auto flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">Email đăng nhập*</label>
            <div className="flex items-center border rounded-lg shadow-sm">
              <img src={emailIcon} alt="email" className="w-6 h-6 mx-3" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow p-3 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">Mật khẩu*</label>
            <div className="flex items-center border rounded-lg shadow-sm">
              <img src={keyPasswordIcon} alt="password" className="w-6 h-6 mx-3" />
              <input
                type="password"
                placeholder="Mật khẩu (từ 6 - 25 ký tự)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="flex-grow p-3 outline-none"
              />
            </div>
          </div>

          <div className="text-right">
            <a href="#" className="text-orange-500 text-sm">Quên mật khẩu?</a>
          </div>

          <button
            type="submit"
            className={`bg-orange-500 text-white rounded-lg py-3 font-bold transition-all duration-300 hover:bg-orange-600 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          {error && <div className="text-red-500 mt-2 text-center">Đăng nhập thất bại. Vui lòng thử lại!</div>}

          <button className="flex items-center justify-center gap-2 border rounded-lg py-3 transition-all duration-300 hover:bg-gray-100">
            <img src={googleBlackIcon} alt="Google" className="w-8 h-8" />
            <span>Đăng nhập bằng Google</span>
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="flex-grow flex justify-center items-center bg-gradient-to-br from-orange-500 to-yellow-500 relative">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={cskhImage}
            alt="Promotional"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 left-0 w-[30%] h-full bg-orange-100 opacity-70"></div>
        {/* <div className="absolute top-[30%] left-[20%] text-white p-6">
          <h3 className="font-bold text-2xl mb-3">Môi trường làm việc năng động</h3>
          <ul className="list-disc text-lg ml-6">
            <li>Không ngừng phát triển 6 tháng liên tục</li>
            <li>Thu nhập cao hấp dẫn</li>
          </ul>
          <button className="mt-4 bg-white text-orange-600 font-bold py-2 px-4 rounded-full">
            APPLY NOW
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Auth;
