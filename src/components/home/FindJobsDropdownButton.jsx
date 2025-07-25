import { useMemo, useState } from "react";
import { useGetUnreadMessageSendersQuery } from "../../redux/api/chatApiSlice";
import { userIcon } from "../../assets";
import { getMessageAge } from "../../utils/dateUtils";
import { Avatar, Dropdown } from "antd";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  NotificationsActive,
} from "@mui/icons-material";
import { Stack } from "@mui/material";

const notificationItems = [
  {
    type: "group",
    label: "Khám phá",
    children: [
      {
        key: "top-jobs",
        label: <a href="/top-jobs">Tìm việc làm</a>,
      },
      {
        key: "recommended-jobs",
        label: <a href="/recommended-jobs">Việc làm phù hợp</a>,
      },
    ],
  },
  {
    type: "group",
    label: "Việc của bạn",
    children: [
      {
        key: "saved-jobs",
        label: <a href="/saved-jobs">Việc đã lưu</a>,
      },
      {
        key: "applied-jobs",
        label: <a href="/applied-jobs">Việc làm đã ứng tuyển</a>,
      },
    ],
  },
];

export default function FindJobsDropdownButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      menu={{ items: notificationItems }}
      trigger={["hover"]}
      placement="bottomLeft"
      arrow
      open={isOpen}
      onOpenChange={(v) => setIsOpen(v)}
    >
      <div className="relative inline-block">
        <a href="/top-jobs">
          <button className="text-lg font-semibold text-gray-800 hover:text-teal-600 transition-colors duration-300">
            Tìm việc
            {!isOpen && <KeyboardArrowDown />}
            {isOpen && <KeyboardArrowUp />}
          </button>
        </a>
      </div>
    </Dropdown>
  );
}
