import { useState } from "react";
import { Dropdown } from "antd";
import {
  AutoAwesome,
  Bookmark,
  ForwardToInbox,
  KeyboardArrowDown,
  KeyboardArrowUp,
  SavedSearch,
} from "@mui/icons-material";

const notificationItems = [
  {
    type: "group",
    label: "Khám phá",
    children: [
      {
        key: "top-jobs",
        label: (
          <a href="/top-jobs">
            <SavedSearch sx={{ color: "#00796b" }} className="me-2" />Tìm việc
            làm
          </a>
        ),
      },
      {
        key: "recommended-jobs",
        label: (
          <a href="/recommended-jobs">
            <AutoAwesome sx={{ color: "#00796b" }} className="me-2" />{" "}
            Việc làm phù hợp
          </a>
        ),
      },
    ],
  },
  {
    type: "group",
    label: "Việc của bạn",
    children: [
      {
        key: "saved-jobs",
        type: "disabled",
        label: (
          <span className="text-gray-500 opacity-50">
            <Bookmark sx={{ color: "#00796b" }} className="me-2" />
            Việc đã lưu
          </span>
        ),
      },
      {
        key: "applied-jobs",
        label: (
          <a href="/job-applied">
            <ForwardToInbox sx={{ color: "#00796b" }} className="me-2" />
            Việc làm đã ứng tuyển
          </a>
        ),
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
