import React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { logoIcon, userIcon } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { useSignOutMutation } from "../../redux/api/authApiSlice";
import { useGetApplicantProfileQuery } from "../../redux/api/applicantApiSlice";
import theme from "../../utils/theme";
import { Chat } from "@mui/icons-material";
import NotificationsDropdownButton from "./NotificationsDropdownButton";

const Header = () => {
  const user = useSelector((state) => state.auth.userState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signOut] = useSignOutMutation();
  const userId = user?.user?.id;
  const points = user?.user?.points || 0;

  // Fetch user profile data from API
  const { data, isLoading, error } = useGetApplicantProfileQuery({
    skip: !userId,
  });

  const profile = data?.data || {};

  const handleLogout = async () => {
    try {
      await signOut().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error("Logout failed: ", err);
    }
  };

  const menuItems = [];
  if (user?.user?.accountType !== "Nhà Tuyển Dụng") {
    menuItems.push(
      {
        key: "profile",
        label: (
          <span
            className="font-inter text-[14px] cursor-pointer hover:text-teal-600"
            onClick={() => navigate("/profile")}
          >
            Hồ sơ cá nhân
          </span>
        ),
      },
      {
        type: "divider",
      },
      {
        key: "job-applied",
        label: (
          <span
            className="font-inter text-[14px] cursor-pointer hover:text-teal-600"
            onClick={() => navigate("/job-applied")}
          >
            Công việc đã ứng tuyển
          </span>
        ),
      },
      {
        type: "divider",
      }
    );
  }
  menuItems.push({
    key: "logout",
    label: (
      <span
        className="font-inter text-[14px] text-red-600 cursor-pointer hover:text-red-800"
        onClick={handleLogout}
      >
        Đăng xuất
      </span>
    ),
  });

  const menu = <Menu items={menuItems} />;

  return (
    <header className="flex flex-wrap justify-between items-center py-4 px-6 md:px-10 bg-white shadow-md sticky top-0 z-50">
      <div
        className="text-4xl font-extrabold cursor-pointer select-none flex items-center gap-2"
        onClick={() => navigate("/")}
        aria-label="Trang chủ"
      >
        <img src={logoIcon} alt="Logo W4U" className="h-14 w-auto" />
        <span className="hidden sm:inline text-teal-700 tracking-wide">
          W4U
        </span>
      </div>

      <nav className="flex flex-wrap items-center gap-6 md:gap-10 mt-4 md:mt-0">
        <a
          href="/"
          className="text-lg font-semibold text-gray-800 hover:text-teal-600 transition-colors duration-300"
        >
          Việc làm
        </a>

        {user && user.user.accountType === "Nhà Tuyển Dụng" ? null : (
          <a
            href="/up-cv"
            className="text-lg font-semibold text-gray-800 hover:text-teal-600 transition-colors duration-300"
          >
            Hồ sơ & CV
          </a>
        )}

        {/* <a
          href="#"
          className="text-lg font-semibold text-gray-800 hover:text-teal-600 transition-colors duration-300"
        >
          Công cụ
        </a> */}

        <a
          href="/vip"
          className="text-lg font-semibold text-gray-800 hover:text-teal-600 transition-colors duration-300"
        >
          W4UVIP
        </a>

        {user && user.user.accountType === "Nhà Tuyển Dụng" ? (
          <a
            href="/up-job"
            className="text-lg font-semibold text-white bg-teal-600 rounded-md px-5 py-2 hover:bg-teal-700 active:scale-95 transition-transform duration-200"
          >
            Đăng tuyển ngay
          </a>
        ) : (
          <a
            href="/top-jobs"
            className="text-lg font-semibold text-gray-800 hover:text-teal-600 transition-colors duration-300"
          >
            Tìm việc
          </a>
        )}
      </nav>

      {/* User info */}
      {user ? (
        <div className="flex items-center gap-3 mt-4 md:mt-0 w-full md:w-auto">
          <NotificationsDropdownButton />
          <a href="/chat">
            <button className="w-12 h-12 rounded-md cursor-pointer text-teal-600 hover:text-teal-700 bg-transparent hover:bg-gray-200 transition">
              <Chat />
            </button>
          </a>
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            placement="bottomRight"
            arrow
          >
            <Avatar
              src={profile.avatarUrl || userIcon} // fallback to default if avatarUrl is unavailable
              alt="User Avatar"
              className="w-12 h-12 cursor-pointer hover:ring-2 hover:ring-teal-600 hover:ring-offset-2 transition"
              aria-label="Menu người dùng"
            />
          </Dropdown>
          <div className="flex flex-col min-w-[150px]">
            <span className="font-inter text-lg font-semibold text-[#151515] truncate">
              {user?.user?.name}
            </span>
            <span className="font-inter text-xs text-gray-500 tracking-wide truncate">
              {user?.user?.accountType} ({points} điểm)
            </span>
          </div>
          <Chip
            label="General"
            className="font-inter text-xs font-medium rounded-lg ml-auto select-none"
            style={{ background: theme.colors.mintGreen, color: "#fff" }}
          />
        </div>
      ) : (
        <div className="flex gap-4 mt-4 md:mt-0">
          <button
            className="text-lg font-semibold text-gray-700 hover:text-teal-600 transition-colors duration-300 cursor-pointer"
            onClick={() => navigate("/auth")}
            aria-label="Đăng nhập"
          >
            Đăng nhập
          </button>
          <button
            className="text-lg font-semibold rounded-md px-6 py-2 bg-teal-600 text-white hover:bg-teal-700 active:scale-95 transition-transform duration-200 cursor-pointer"
            onClick={() => navigate("/welcome")}
            aria-label="Đăng ký"
          >
            Đăng ký
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
