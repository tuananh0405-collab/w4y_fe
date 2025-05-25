import React, { use, useState } from 'react';
import { bgImage, deviconGoogleIcon, emailIcon, keyPasswordIcon, passwordCheckIcon, userIcon } from '../assets';
import { useSignUpMutation, useVerifyEmailMutation } from '../redux/api/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { Modal, Input, Button } from "antd";
import theme from '../utils/theme';

const Register_Employee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [signUp, { isLoading: isSigningUp }] = useSignUpMutation();
    const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
    const [isModalVisible, setIsModalVisible] = useState(false); // State for Modal visibility
    const [verificationCode, setVerificationCode] = useState("");
    const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      return alert("You must agree to the terms before registering!"); // Kiểm tra xem có đồng ý điều khoản chưa
    }

    // Thêm trường `accountType` với giá trị "Nhà Tuyển Dụng"
    const updatedFormData = {
      ...formData,
      accountType: "Ứng Viên", // Thêm accountType mặc định
      agreeToTerms: undefined, // Không gửi trường agreeToTerms
    };

    try {
      // Gửi request đăng ký
      const response = await signUp(updatedFormData).unwrap();
      console.log("Registration successful", response);

      // Hiển thị Modal yêu cầu nhập verification code
      setIsModalVisible(true);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  const handleVerifyEmail = async () => {
    if (verificationCode.trim() === "") {
      alert("Please enter the verification code.");
      return;
    }

    try {
      // Gửi yêu cầu xác minh email khi người dùng nhập mã xác minh
      const response = await verifyEmail({
        email: formData.email,
        verificationCode: verificationCode,
        password: formData.password,
      }).unwrap();
      console.log("Email verified successfully", response);

      // Sau khi xác minh thành công, điều hướng về trang đăng nhập
      navigate("/auth");
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Đóng Modal
  };

  return (
     <div
      className="flex flex-col items-center justify-center w-full h-full relative"
      style={{ backgroundColor: theme.colors.mintGreen }} // đổi màu nền chính
    >
      <img src={bgImage} alt="Background" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
      <div className="flex flex-col items-center justify-center w-full max-w-3xl bg-white rounded-3xl shadow-lg p-10 z-10 my-10">
        <div className="flex flex-col items-center w-full max-w-lg p-5">
          <h1 className="font-margarine text-4xl text-gray-900 mb-8">Hi!</h1>
          
          <button
            className="flex items-center justify-center w-full h-16 rounded-lg text-white text-xl font-medium mb-5 hover:brightness-90 transition-all duration-300"
            style={{ backgroundColor: theme.colors.darkTeal }} // đổi màu nút google đăng ký
          >
            <img src={deviconGoogleIcon} alt="Google" className="w-9 h-9 mr-2" />
            Đăng ký bằng Google
          </button>

          <div className="flex items-center w-full my-5">
            <span className="flex-grow h-px bg-black opacity-25"></span>
            <span className="mx-4 text-gray-500 text-xl font-medium">Hoặc bằng email</span>
            <span className="flex-grow h-px bg-black opacity-25"></span>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            {/* Các input với border và focus ring đổi màu */}
            <div className="mb-5">
              <label className="block text-xl font-medium text-gray-900 mb-2">Họ và tên*</label>
              <div className="relative">
                <img src={userIcon} alt="Name" className="absolute left-3 top-3 w-6 h-6" />
                <input
                  type="text"
                  name="name"
                  placeholder="Họ và tên"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none"
                  style={{
                    borderColor: theme.colors.tealGreen,
                  }}
                  onFocus={e => (e.target.style.borderColor = theme.colors.darkTeal)}
                  onBlur={e => (e.target.style.borderColor = theme.colors.tealGreen)}
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xl font-medium text-gray-900 mb-2">Email đăng nhập*</label>
              <div className="relative">
                <img src={emailIcon} alt="Email" className="absolute left-3 top-3 w-6 h-6" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xl font-medium text-gray-900 mb-2">Mật khẩu*</label>
              <div className="relative">
                <img src={keyPasswordIcon} alt="Password" className="absolute left-3 top-3 w-6 h-6" />
                <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu (từ 6 - 25 ký tự)"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xl font-medium text-gray-900 mb-2">Nhập lại mật khẩu*</label>
              <div className="relative">
                <img src={passwordCheckIcon} alt="Confirm Password" className="absolute left-3 top-3 w-6 h-6" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

               {/* Checkbox Điều khoản */}
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

            {/* Nút Hoàn tất */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full h-16 rounded-lg text-white text-xl font-bold mb-5 hover:brightness-90 transition-all duration-300"
              style={{ backgroundColor: theme.colors.darkTeal }}
            >
              {isSigningUp ? "Đang đăng ký..." : "Hoàn tất"}
            </button>

            {/* Modal xác minh email */}
            <Modal
              title="Xác minh email"
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={null}
            >
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-2">Mã xác minh</label>
                <Input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Nhập mã xác minh"
                  className="w-full py-3 border border-gray-300 rounded-lg"
                  style={{
                    borderColor: theme.colors.tealGreen,
                  }}
                  onFocus={e => (e.target.style.borderColor = theme.colors.darkTeal)}
                  onBlur={e => (e.target.style.borderColor = theme.colors.tealGreen)}
                />
                <div className="mt-4 flex justify-end">
                  <Button
                    type="primary"
                    onClick={handleVerifyEmail}
                    disabled={isVerifying || verificationCode.length === 0}
                    style={{ backgroundColor: theme.colors.darkTeal, borderColor: theme.colors.darkTeal }}
                  >
                    Xác minh
                  </Button>
                </div>
              </div>
            </Modal>

            <div className="text-center text-xl">
              <span className="text-gray-700 font-medium">Đã có tài khoản?</span>
              <a href="/auth" className="text-gray-900 font-bold ml-2">Đăng nhập ngay</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register_Employee
