import { Button, Stack } from "@mui/material";
import { logoIcon } from "../../assets";
import { Settings } from "@mui/icons-material";
import { Dropdown } from "antd";

// Placholder, TODO
const SETTING_OPTIONS = [
  {
    key: '1',
    label: (
      <a rel="noopener noreferrer" href="/">
        OPTION 1
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a rel="noopener noreferrer" href="/">
        OPTION 2
      </a>
    ),
  },
];

// A header for the conversation panel
/* Currently includes:
  * W4U banner
  * Setting button
  */
const ConversationListHeader = () => {
  return (
    <div>
      <Stack direction={"row"} width={"100%"} alignItems={"center"} gap={2} p={2}>
        <img src={logoIcon} alt="Logo W4U" className="h-14 w-auto" />
        <div className="grow" />
        <a href="/" >
          <Button
            className="h-full w-full cursor-pointer hover:ring-2 hover:ring-teal-600 hover:ring-offset-2 transition"
            color="inherit"
          >
            Về trang chủ
          </Button>
        </a>
        <Dropdown menu={{ items: SETTING_OPTIONS }} trigger={["click"]} placement="bottomRight" arrow>
          <Button
            className="cursor-pointer hover:ring-2 hover:ring-teal-600 hover:ring-offset-2 transition"
            color="inherit"
            sx={{
              borderRadius: '50%',
              minWidth: 0,
              width: 40,
              height: 40,
              padding: 0,
            }}
          >
            <Settings />
          </Button>
        </Dropdown>
      </Stack>
      <div className="h-px bg-black opacity-20" />
    </div >
  );
};

export default ConversationListHeader;
