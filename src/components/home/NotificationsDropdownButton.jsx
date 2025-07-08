import { useMemo } from "react";
import { useGetUnreadMessageSendersQuery } from "../../redux/api/chatApiSlice";
import { userIcon } from "../../assets";
import { getMessageAge } from "../../utils/dateUtils";
import { Dropdown } from "antd";
import { NotificationsActive } from "@mui/icons-material";

export default function NotificationsDropdownButton() {
  const {
    data: unreadMessagesNotifications,
    isLoading: loadingUnreadMessagesNotifications,
    error: unreadMessagesNotificationsError,
  } = useGetUnreadMessageSendersQuery();

  const notificationList = useMemo(() => {
    if (loadingUnreadMessagesNotifications) {
      return [
        {
          key: "loading",
          label: <span>Đang tải thông báo...</span>,
        },
      ];
    }

    if (unreadMessagesNotificationsError) {
      return [
        {
          key: "error",
          label: (
            <span className="text-red-300">
              Có lỗi xảy ra khi tải thông báo
            </span>
          ),
        },
      ];
    }

    if (
      !unreadMessagesNotifications ||
      !Array.isArray(unreadMessagesNotifications.data) ||
      unreadMessagesNotifications.data.length === 0
    ) {
      return [
        {
          key: "empty",
          label: <span>Không có thông báo mới</span>,
        },
      ];
    }

    return unreadMessagesNotifications.data.map((user) => ({
      key: user.senderId,
      label: (
        <a href="/a">
          <Stack
            direction={"row"}
            gap={2}
            alignItems={"center"}
            className="px-3 py-2 rounded-md hover:bg-teal-600/20"
          >
            <Avatar
              src={user.avatarUrl || userIcon}
              alt="User Avatar"
              className="w-12 h-12 cursor-pointer hover:ring-2 hover:ring-teal-600 hover:ring-offset-2 transition"
              aria-label="Menu người dùng"
            />
            <Stack>
              <div>
                <strong>{user.unreadCount}</strong> Tin nhắn chưa đọc từ{" "}
                <strong>{user.name || user.email}</strong>
              </div>
              <div style={{ fontSize: 12, color: "#888" }}>
                {user.latestMessage}
              </div>
              <div style={{ fontSize: 11, color: "#aaa" }}>
                {getMessageAge(user.latestSentAt)}
              </div>
            </Stack>
          </Stack>
        </a>
      ),
      isNotification: true, // Set this for the element to be counted by the badge on top right that counts the number of notifications
    }));
  }, [
    loadingUnreadMessagesNotifications,
    unreadMessagesNotificationsError,
    unreadMessagesNotifications,
  ]);

  const numberOfNotifications = useMemo(() => {
    return notificationList.filter((notification) =>
      notification.isNotification
    )
      .length;
  }, [notificationList]);

  return (
    <Dropdown
      menu={{ items: notificationList }}
      trigger={["click"]}
      placement="bottomRight"
      arrow
    >
      <div className="relative inline-block">
        <button className="w-12 h-12 rounded-md cursor-pointer text-teal-600 hover:text-teal-700 bg-transparent hover:bg-gray-200 transition relative">
          {numberOfNotifications > 0 && (
            <span className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 text-xs px-1.5 py-0.5 rounded-full bg-red-500 text-white min-w-[1.5rem] flex items-center justify-center z-10">
              {numberOfNotifications}
            </span>
          )}
          <NotificationsActive />
        </button>
      </div>
    </Dropdown>
  );
}
