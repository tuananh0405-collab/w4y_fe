import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };
  return (
    <div className="flex flex-row w-full min-h-screen">
      {/* Left Section */}
      <div className="flex-grow flex flex-col items-center p-5">
        {/* <Header /> */}
        <header className="flex justify-between items-center p-4 w-full">
          <h1 className="text-4xl font-normal text-black">LOGO</h1>
          <nav className="flex gap-10 items-center">
            <a
              href="#"
              className="text-xl font-bold text-gray-900 hover:text-gray-600"
            >
              Việc làm
            </a>
            <a
              href="#"
              className="text-xl font-bold text-gray-900 hover:text-gray-600"
            >
              Hồ sơ & CV
            </a>
            <a
              href="#"
              className="text-xl font-bold text-gray-900 hover:text-gray-600"
            >
              Công cụ
            </a>
            <a
              href="#"
              className="text-xl font-bold text-gray-900 hover:text-gray-600"
            >
              W4UVIP
            </a>
          </nav>
        </header>
        {/* <WelcomeSection /> */}
        <div className="flex justify-center items-center w-full min-w-[324px] p-5">
          <h1 className="font-margarine text-5xl font-normal text-gray-900 text-center">
            Welcome back!
          </h1>
        </div>
        {/* <LoginForm /> */}
        <form
          className="max-w-[670px] mx-auto flex flex-col gap-8 p-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label className="text-lg">Email đăng nhập*</label>
            <div className="flex items-center border rounded">
              <img
                src="https://dashboard.codeparrot.ai/api/image/Z9fsu5IdzXb5OlU6/ic-outli.png"
                alt="email"
                className="w-6 h-6 mx-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow p-2 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg">Mật khẩu*</label>
            <div className="flex items-center border rounded">
              <img
                src="https://dashboard.codeparrot.ai/api/image/Z9fsu5IdzXb5OlU6/frame-2.png"
                alt="password"
                className="w-6 h-6 mx-2"
              />
              <input
                type="password"
                placeholder="Mật khẩu (từ 6 - 25 ký tự)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="flex-grow p-2 outline-none"
              />
            </div>
          </div>

          <div className="text-right">
            <a href="#" className="text-orange-500 text-sm">
              Quên mật khẩu?
            </a>
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white rounded py-3 font-bold"
          >
            Đăng nhập
          </button>

          <button className="flex items-center justify-center gap-2 border rounded py-3">
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z9fsu5IdzXb5OlU6/devicon.png"
              alt="Google"
              className="w-8 h-8"
            />
            <span>Đăng nhập bằng Google</span>
          </button>
        </form>
      </div>
      {/* Right Section */}
      <div className="flex-grow flex justify-center items-center bg-gradient-to-br from-orange-500 to-yellow-500">
        {/* <ImageSection /> */}
        <div className="flex justify-center items-center w-full h-full bg-inherit">
          <div className="relative w-full max-w-[789px]">
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z9fsu5IdzXb5OlU6/3-2.png"
              alt="Promotional"
              className="w-full h-auto"
            />
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z9fsu5IdzXb5OlU6/frame-14.png"
              alt="Decorative overlay"
              className="absolute top-0 left-0 w-[15%] h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
