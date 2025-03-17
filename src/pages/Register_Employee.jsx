import React, { useState } from 'react'

const Register_Employee = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
      };
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-orange-200 relative">
    <img src="https://dashboard.codeparrot.ai/api/image/Z9frfJIdzXb5OlU5/vector-1.png" alt="Background" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
    <div className="flex flex-col items-center justify-center w-full max-w-3xl bg-white rounded-3xl shadow-lg p-10 z-10">
      {/* <RegistrationForm /> */}
      <div className="flex flex-col items-center w-full max-w-lg p-5">
      <h1 className="font-margarine text-4xl text-gray-900 mb-8">Hi!</h1>
      
      <button className="flex items-center justify-center w-full h-16 bg-orange-500 rounded-lg text-white text-xl font-medium mb-5">
        <img src="https://dashboard.codeparrot.ai/api/image/Z9frfJIdzXb5OlU5/devicon.png" alt="Google" className="w-9 h-9 mr-2" />
        Đăng ký bằng Google
      </button>

      <div className="flex items-center w-full my-5">
        <span className="flex-grow h-px bg-black opacity-25"></span>
        <span className="mx-4 text-gray-500 text-xl font-medium">Hoặc bằng email</span>
        <span className="flex-grow h-px bg-black opacity-25"></span>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-5">
          <label className="block text-xl font-medium text-gray-900 mb-2">Họ và tên*</label>
          <div className="relative">
            <img src="https://dashboard.codeparrot.ai/api/image/Z9frfJIdzXb5OlU5/wpf-name.png" alt="Name" className="absolute left-3 top-3 w-6 h-6" />
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-xl font-medium text-gray-900 mb-2">Email đăng nhập*</label>
          <div className="relative">
            <img src="https://dashboard.codeparrot.ai/api/image/Z9frfJIdzXb5OlU5/ic-outli.png" alt="Email" className="absolute left-3 top-3 w-6 h-6" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-xl font-medium text-gray-900 mb-2">Mật khẩu*</label>
          <div className="relative">
            <img src="https://dashboard.codeparrot.ai/api/image/Z9frfJIdzXb5OlU5/carbon-p.png" alt="Password" className="absolute left-3 top-3 w-6 h-6" />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu (từ 6 - 25 ký tự)"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-xl font-medium text-gray-900 mb-2">Nhập lại mật khẩu*</label>
          <div className="relative">
            <img src="https://dashboard.codeparrot.ai/api/image/Z9frfJIdzXb5OlU5/mdi-pass.png" alt="Confirm Password" className="absolute left-3 top-3 w-6 h-6" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center mb-5">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-lg text-gray-900">
            Tôi đã đọc và đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của W4U.
          </label>
        </div>

        <button type="submit" className="w-full h-16 bg-orange-600 rounded-lg text-white text-xl font-bold mb-5">
          Hoàn tất
        </button>

        <div className="text-center text-xl">
          <span className="text-gray-700 font-medium">Đã có tài khoản?</span>
          <a href="#" className="text-gray-900 font-bold ml-2">Đăng nhập ngay</a>
        </div>
      </form>
    </div>
    </div>
  </div>
  )
}

export default Register_Employee
