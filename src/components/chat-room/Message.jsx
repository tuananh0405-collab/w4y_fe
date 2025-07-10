import { useInView } from "react-intersection-observer";
import { Stack, Typography } from "@mui/material";
import { formatMessageTime } from "../../utils/dateUtils";
import { memo, useEffect } from "react";

// Represents each messages in the message list
const Message = memo(({ message, sentByUser, onRead }) => {
  const { ref, inView } = useInView({
    threshold: 0.5, // consider it in view when at least 50% of it is visible
    triggerOnce: true, // only trigger once
  });

  useEffect(() => {
    if (!sentByUser && inView && !message.is_read) {
      if (onRead) onRead(message._id);
    }
  }, [sentByUser, inView, message, onRead]);

  return (
    <Stack
      width={"100%"}
      direction={sentByUser ? "row-reverse" : "row"}
      ref={ref}
    >
      <Stack>
        <Stack
          direction={sentByUser ? "row-reverse" : "row"}
          alignItems={"center"}
          gap={1}
        >
          {
            /*
            // TODO, I guess
          <Avatar src="" sx={{ width: 48, height: 48 }} />
          */
          }
          <Stack
            className="rounded-xl px-4 py-2 max-w-xs transition"
            color={sentByUser ? "white" : "black"}
            bgcolor={sentByUser
              ? "#0f766e"
              : message.is_read
                ? "#e5e7eb"
                : "#bae6ea"}
          >
            <p>{message.message}</p>
            <p className="text-[11px] text-right">
              {formatMessageTime(message.sentAt)}
            </p>
          </Stack>
          {
            // Kinda ungly, not sure if should be added
            /*
            !message.is_read && !sentByUser &&
            (
              <div className="h-full text-teal-700 font-bold">
                <p className="text-[11px] text-right">
                  Tin nhắn mới
                </p>
              </div>
            )
            */
          }
        </Stack>
      </Stack>
    </Stack>
  );
});

export default Message;
