import React, { useState } from "react";
import { useDispatch } from "react-redux"; 
import { useSignInMutation } from "../redux/api/authApiSlice"; 
import { setCredentials } from "../redux/features/authSlice"; 
import { cskhImage, emailIcon, googleBlackIcon, keyPasswordIcon, logoIcon } from "../assets";
import { useNavigate } from "react-router-dom";
import theme from "../utils/theme";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // thư viện react-icons

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, { isLoading, error }] = useSignInMutation(); 
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await signIn({ email, password }).unwrap(); 
      dispatch(setCredentials(userData)); 
      navigate('/');
      console.log(userData);
    } catch (err) {
      console.error("Login failed: ", err); 
    }
  };
 const menuItems = [
    { label: "Việc làm", path: "/" },
    { label: "Hồ sơ & CV", path: "/up-cv" },
    { label: "Công cụ", path: "/" },
    { label: "W4UVIP", path: "/" },
  ];
  return (
    <div className="flex flex-row w-full min-h-screen">
      {/* Left Section */}
      <div 
        className="flex-grow flex flex-col items-center p-5 bg-white"
        // style={{ backgroundColor: theme.colors.mintGreen }} // đổi nền trắng sang mintGreen
      >
        {/* Header */}
        <header className="flex justify-between items-center w-full mb-10">
         <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img src={logoIcon} alt="Logo" className="h-28 w-auto" />
        </div>
         <nav className="flex gap-10 items-center">
      {menuItems.map(({ label, path }) => (
        <button
          key={label}
          onClick={() => navigate(path)}
          className="text-xl font-semibold hover:text-opacity-75"
          style={{ color: theme.colors.veryDarkGreen }}
        >
          {label}
        </button>
      ))}
    </nav>
        </header>

        {/* Welcome back text */}
        <div className="flex justify-center items-center w-full mb-8">
          <h1 
            className="text-5xl font-semibold text-center"
            style={{ color: theme.colors.veryDarkGreen }}
          >
            Welcome back!
          </h1>
        </div>

        {/* Login Form */}
        <form 
          className="max-w-[670px] mx-auto flex flex-col gap-8 w-full" 
          onSubmit={handleSubmit}
        >
          {/* Email input */}
          <div className="flex flex-col gap-2">
            <label 
              className="text-lg font-semibold" 
              style={{ color: theme.colors.darkTeal }}
            >
              Email đăng nhập*
            </label>
            <div 
              className="flex items-center border rounded-lg shadow-sm"
              style={{ borderColor: theme.colors.tealGreen }}
            >
              <img src={emailIcon} alt="email" className="w-6 h-6 mx-3" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow p-3 outline-none"
                style={{ color: theme.colors.veryDarkGreen }}
              />
            </div>
          </div>

          {/* Password input */}
          <div className="flex flex-col gap-2">
            <label 
              className="text-lg font-semibold" 
              style={{ color: theme.colors.darkTeal }}
            >
              Mật khẩu*
            </label>
            <div 
              className="flex items-center border rounded-lg shadow-sm"
              style={{ borderColor: theme.colors.tealGreen }}
            >
              <img src={keyPasswordIcon} alt="password" className="w-6 h-6 mx-3" />
              <input
              type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu (từ 6 - 25 ký tự)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="flex-grow p-3 outline-none"
                style={{ color: theme.colors.veryDarkGreen }}
              />
               <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="mr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            tabIndex={-1} // tránh nút này nhận focus tab
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={24} />
            ) : (
              <AiOutlineEye size={24} />
            )}
          </button>
            </div>
          </div>

          {/* Forgot password link */}
          <div className="text-right">
            <a 
              href="#" 
              className="text-sm" 
              style={{ color: theme.colors.tealGreen }}
            >
              Quên mật khẩu?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className={`rounded-lg py-3 font-bold transition-all duration-300 cursor-pointer ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
            style={{ 
              backgroundColor: theme.colors.darkTeal,
              color: 'white',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = theme.colors.tealGreen}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = theme.colors.darkTeal}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          {/* Error message */}
          {error && (
            <div className="text-center mt-2" style={{ color: 'red' }}>
              Đăng nhập thất bại. Vui lòng thử lại!
            </div>
          )}

          {/* Google login button */}
          <button 
            type="button"
            className="flex items-center justify-center gap-2 border rounded-lg py-3 transition-all duration-300"
            style={{ borderColor: theme.colors.tealGreen, color: theme.colors.darkTeal }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = theme.colors.mintGreen;
              e.currentTarget.style.color = theme.colors.veryDarkGreen;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = theme.colors.darkTeal;
            }}
          >
            <img src={googleBlackIcon} alt="Google" className="w-8 h-8" />
            <span>Đăng nhập bằng Google</span>
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div 
        className="flex-grow flex justify-center items-center relative"
        style={{ 
          background: `linear-gradient(to bottom right, ${theme.colors.tealGreen}, ${theme.colors.mintGreen})`
        }}
      >
        <div className="absolute inset-0 w-full h-full">
          <img
            src={cskhImage}
            alt="Promotional"
            className="w-full h-full object-cover"
          />
        </div>
        <div 
          className="absolute top-0 left-0 w-[30%] h-full opacity-70"
          style={{ backgroundColor: theme.colors.lightGray }}
        ></div>
      </div>
    </div>
  );
};

export default Auth;
