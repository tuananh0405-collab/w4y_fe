import { Stack, Typography } from "@mui/material";
import { formatMessageTime } from "../../utils/dateUtils";

// Represents each messages in the message list
const Message = ({ message, sentByUser }) => {
  return (
    <Stack width={"100%"} direction={sentByUser ? "row-reverse" : "row"}>
      <Stack>
        <Stack
          direction={sentByUser ? "row-reverse" : "row"}
          alignItems={"center"}
          gap={2}
        >
          {/*<Avatar src="" sx={{ width: 48, height: 48 }} />*/}
          <Stack
            className="rounded-xl px-4 py-2 max-w-xs"
            color={sentByUser ? "white" : "black"}
            bgcolor={sentByUser ? "#0f766e" : "#e5e7eb"}
          >
            <p>{message.message}</p>
            <p className="text-[11px] text-right">
              {formatMessageTime(message.sentAt)}
            </p>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Message;
