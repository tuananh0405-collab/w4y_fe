import React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { userIcon, logoIcon } from "../../assets";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector để lấy dữ liệu từ Redux
import { logout } from "../../redux/features/authSlice"; // Import logout action
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "antd"; // Import Dropdown và Menu của Ant Design
import { useSignOutMutation } from "../../redux/api/authApiSlice";
import theme from "../../utils/theme";

const Header = () => {
  const user = useSelector((state) => state.auth.userState); // Lấy thông tin người dùng từ Redux state
  const dispatch = useDispatch(); // Để gọi dispatch cho action logout
  const navigate = useNavigate();
  const [signOut] = useSignOutMutation(); // Khởi tạo useSignOutMutation hook

  const handleLogout = async () => {
    try {
      await signOut().unwrap();
      dispatch(logout()); // Gọi action logout khi người dùng click vào nút Đăng xuất
      navigate('/')
    } catch (error) {
      console.error("Login failed: ", err); // Xử lý lỗi nếu có
    }
  };

  const menu = (
    <Menu>
      {user?.user?.accountType !== "Nhà Tuyển Dụng" && (
      <Menu.Item key="1" onClick={() => navigate("/profile")}>
        <span className="font-inter text-[14px]">Hồ sơ cá nhân</span>
      </Menu.Item>
    )}
      <Menu.Divider />
      <Menu.Item key="3" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="flex justify-between items-center h-32 px-8 bg-white">
      <div className="text-4xl font-normal cursor-pointer"  onClick={() => navigate("/")}>
        <img src={logoIcon} alt="Logo" className="h-20 w-auto" />
      </div>
      <nav className="flex gap-10">
        <a href="/" className="text-xl font-bold text-gray-800">
          Việc làm
        </a>
        
        {user && user.user.accountType === "Nhà Tuyển Dụng" ? (
          <></>
        ) : (
          <a href="/up-cv" className="text-xl font-bold text-gray-800">
          Hồ sơ & CV
        </a>
        )}
        <a href="#" className="text-xl font-bold text-gray-800">
          Công cụ
        </a>
        <a href="#" className="text-xl font-bold text-gray-800">
          W4UVIP
        </a>
        {user && user.user.accountType === "Nhà Tuyển Dụng" ? (
          <a href="/up-job" className="text-xl font-bold text-gray-800">
            Đăng tuyển ngay
          </a>
        ) : (
          <a href="/" className="text-xl font-bold text-gray-800">
            Tìm việc
          </a>
        )}
      </nav>

      {/* Hiển thị thông tin người dùng nếu đã đăng nhập */}
      {user ? (
        <div className="flex items-center w-[300px] p-1 gap-2">
          <Dropdown overlay={menu} trigger={["click"]}>
            <Avatar
              src={userIcon}
              alt="User avatar"
              className="w-[49px] h-[49px] cursor-pointer"
            />
          </Dropdown>
          <div className="flex flex-col gap-1">
            <span className="font-inter text-[20px] font-medium text-[#151515]">
              {user.user.name}
            </span>
            <div className="flex p-2">
              <span className="font-inter text-[12px] font-normal text-[#151515]">
                {user.user.accountType}
              </span>
            </div>
          </div>
          <Chip
            label="General"
            className="bg-[#ee4806] text-white font-inter text-[12px] font-medium rounded-lg ml-auto"
            style={{ background: theme.colors.mintGreen }}
          />
        </div>
      ) : (
        // Nếu chưa có user, hiển thị các nút Đăng ký và Đăng nhập
        <div className="flex gap-5">
          <button
            className="text-xl font-medium text-gray-800 cursor-pointer"
            onClick={() => navigate("/auth")}
          >
            Đăng nhập
          </button>
          <button
            className="text-xl font-medium text-gray-800 rounded-md px-5 py-2 cursor-pointer"
            onClick={() => navigate("/welcome")}
            style={{ background: theme.colors.mintGreen }}
          >
            Đăng ký
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
