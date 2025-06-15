import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  bgImage,
  cityIcon,
  companyIcon,
  deviconGoogleIcon,
  emailIcon,
  keyPasswordIcon,
  passwordCheckIcon,
  phoneIcon,
  userIcon,
} from "../assets";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation, useVerifyEmailMutation } from "../redux/api/authApiSlice";
import { Modal, Input, Button } from "antd";
import theme from "../utils/theme";
import { BASE_URL } from "../redux/constants";

const Register_Employer = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    gender: "",
    phone: "",
    company: "",
    city: "",
    district: "",
    agreeToTerms: false,
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [signUp, { isLoading: isSigningUp }] = useSignUpMutation();
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();

  // Lấy danh sách tỉnh/thành phố khi component mount
  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((res) => setProvinces(res.data))
      .catch((err) => console.error("Failed to load provinces", err));
  }, []);

  // Khi chọn tỉnh/thành phố, lấy danh sách huyện tương ứng
  useEffect(() => {
    if (formData.city) {
      axios
        .get(`https://provinces.open-api.vn/api/p/${formData.city}?depth=2`)
        .then((res) => {
          setDistricts(res.data.districts || []);
          setFormData((prev) => ({ ...prev, district: "" })); // reset huyện khi đổi tỉnh
        })
        .catch((err) => {
          console.error("Failed to load districts", err);
          setDistricts([]);
          setFormData((prev) => ({ ...prev, district: "" }));
        });
    } else {
      setDistricts([]);
      setFormData((prev) => ({ ...prev, district: "" }));
    }
  }, [formData.city]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      return alert("You must agree to the terms before registering!");
    }

    // Thêm accountType, loại bỏ agreeToTerms khỏi data gửi lên server
    const updatedFormData = {
      ...formData,
      accountType: "Nhà tuyển dụng",
      agreeToTerms: undefined,
    };

    try {
      const response = await signUp(updatedFormData).unwrap();
      console.log("Registration successful", response);
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
      const response = await verifyEmail({
        email: formData.email,
        verificationCode,
        password: formData.password,
      }).unwrap();
      console.log("Email verified successfully", response);
      navigate("/auth");
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleGoogleLogin = () => {
    // Store the account type in localStorage before redirecting
    localStorage.setItem('googleAuthType', 'Nhà tuyển dụng');
    window.location.href = `${BASE_URL}/api/v1/auth/google?accountType=Nhà tuyển dụng`;
  };

  return (
    <div
      className="flex justify-center items-center w-full h-full relative"
      style={{ backgroundColor: theme.colors.mintGreen }}
    >
      <img
        src={bgImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-lg p-10 my-10">
        <div className="relative z-10">
          <form
            className="flex flex-col items-center w-full max-w-lg mx-auto p-5"
            onSubmit={handleSubmit}
          >
            <h1 className="font-margarine text-4xl text-gray-900 mb-8">Hi!</h1>

            <button
              className="flex items-center justify-center w-full h-16 text-white text-xl font-medium rounded-lg mb-5 hover:brightness-90 active:scale-[0.98] transition-all duration-300"
              style={{ backgroundColor: theme.colors.darkTeal }}
              onClick={handleGoogleLogin}
            >
              <img src={deviconGoogleIcon} alt="Google" className="w-9 h-9 mr-2" />
              Đăng ký bằng Google
            </button>

            <div className="flex items-center w-full my-5">
              <span className="flex-grow h-px bg-gray-300"></span>
              <span className="mx-4 text-gray-500">Hoặc bằng email</span>
              <span className="flex-grow h-px bg-gray-300"></span>
            </div>

            {/* Email */}
            <div className="w-full mb-5">
              <label className="block text-lg font-medium text-gray-900 mb-2">Email đăng nhập*</label>
              <div className="relative">
                <img src={emailIcon} alt="Email" className="absolute left-3 top-3 w-6 h-6" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email (có tên miền công ty)"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div className="w-full mb-5">
              <label className="block text-lg font-medium text-gray-900 mb-2">Mật khẩu*</label>
              <div className="relative">
                <img src={keyPasswordIcon} alt="Password" className="absolute left-3 top-3 w-6 h-6" />
                <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu (từ 6 - 25 ký tự)"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Nhập lại mật khẩu */}
            <div className="w-full mb-5">
              <label className="block text-lg font-medium text-gray-900 mb-2">Nhập lại mật khẩu*</label>
              <div className="relative">
                <img
                  src={passwordCheckIcon}
                  alt="Confirm Password"
                  className="absolute left-3 top-3 w-6 h-6"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Thông tin nhà tuyển dụng */}
            <h2 className="w-full text-xl font-bold text-gray-900 mb-5">Thông tin nhà tuyển dụng</h2>

            {/* Họ và tên */}
            <div className="w-full mb-5">
              <label className="block text-lg font-medium text-gray-900 mb-2">Họ và tên*</label>
              <div className="relative">
                <img src={userIcon} alt="Name" className="absolute left-3 top-3 w-6 h-6" />
                <input
                  type="text"
                  name="name"
                  placeholder="Họ và tên"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Giới tính */}
            <div className="w-full mb-5">
              <label className="block text-lg font-medium text-gray-900 mb-2">Giới tính*</label>
              <div className="flex items-center gap-5">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Nam
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Nữ
                </label>
              </div>
            </div>

            {/* Số điện thoại */}
            <div className="w-full mb-5">
              <label className="block text-lg font-medium text-gray-900 mb-2">Số điện thoại cá nhân*</label>
              <div className="relative">
                <img src={phoneIcon} alt="Phone" className="absolute left-3 top-3 w-6 h-6" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Số điện thoại cá nhân"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Công ty */}
            <div className="w-full mb-5">
              <label className="block text-lg font-medium text-gray-900 mb-2">Công ty*</label>
              <div className="relative">
                <img src={companyIcon} alt="Company" className="absolute left-3 top-3 w-6 h-6" />
                <input
                  type="text"
                  name="company"
                  placeholder="Tên công ty"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Tỉnh/Thành phố */}
            <div className="w-full mb-5">
              <label className="block text-lg font-medium text-gray-900 mb-2">Tỉnh/Thành phố*</label>
              <div className="relative">
                <img src={cityIcon} alt="City" className="absolute left-3 top-3 w-6 h-6" />
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">-- Chọn Tỉnh/Thành phố --</option>
                  {provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quận/Huyện */}
            <div className="w-full mb-5">
              <label className="block text-lg font-medium text-gray-900 mb-2">Quận/Huyện*</label>
              <div className="relative">
                <img src={cityIcon} alt="District" className="absolute left-3 top-3 w-6 h-6" />
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  disabled={!formData.city}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">-- Chọn Quận/Huyện --</option>
                  {districts.map((district) => (
                    <option key={district.code} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Điều khoản */}
            <div className="flex items-center gap-3 mb-5">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-5 h-5"
              />
              <label className="text-sm text-gray-900">
                Tôi đã đọc và đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của W4U.
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-16 text-white text-xl font-bold rounded-lg mb-5 hover:brightness-90 active:scale-[0.98] transition-all duration-300"
              style={{ backgroundColor: theme.colors.darkTeal }}
              disabled={isSigningUp}
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
                  style={{ borderColor: theme.colors.tealGreen }}
                  onFocus={(e) => (e.target.style.borderColor = theme.colors.darkTeal)}
                  onBlur={(e) => (e.target.style.borderColor = theme.colors.tealGreen)}
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

            <div className="flex gap-2 text-lg">
              <span className="text-gray-700">Đã có tài khoản?</span>
              <a href="/auth" className="text-gray-900 font-bold">
                Đăng nhập ngay
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register_Employer;
