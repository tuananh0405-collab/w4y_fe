import { CircularProgress, Typography } from "@mui/material";
import { useGetChatHistoryQuery } from "../../redux/api/chatApiSlice";
import Message from "./Message";
import { socket } from "../../socket";
import { useEffect, useMemo, useState } from "react";
import { EmojiPeople } from "@mui/icons-material";
import { isValidDateString } from "../../utils/dateUtils";
import DateDivider from "./DateDivider";

const parseTime = (val) => {
  if (val && isValidDateString(val)) {
    const date = new Date(val);

    const d = date.getDate().toString();
    const m = (date.getMonth() + 1).toString();
    const y = date.getFullYear();
    return `${d} tháng ${m}, ${y}`;
  } else {
    if (val) return val;
    return "";
  }
};

// Display a range of message in the current conversation
const MessageList = ({ senderId, receiverId }) => {
  const {
    data: messageListQuery,
    error: fetchError,
    isLoading: isFetchingList,
  } = useGetChatHistoryQuery({ senderId, receiverId });

  // State that both socket and api manage
  const [messageList, setMessageList] = useState(messageListQuery?.data);
  const groupedMessages = useMemo(() => {
    if (!messageList || !messageList.length) {
      return [];
    }

    const result = [];

    for (const msg of messageList) {
      const dateKey = parseTime(msg.sentAt); // YYYY-MM-DD
      const lastGroup = result[result.length - 1];

      if (
        !lastGroup ||
        (lastGroup.date !== dateKey)
      ) {
        result.push({
          date: dateKey,
          messages: [msg],
        });
      } else {
        lastGroup.messages.push(msg);
      }
    }

    return result;
  }, [messageList]);

  // Resets message list when renderId/receiverId changes
  useEffect(() => {
    setMessageList(messageListQuery?.data);
  }, [messageListQuery?.data]);

  // Init socket events
  useEffect(() => {
    socket.on("receivedChatMessage", (message) => {
      if (messageList) {
        setMessageList([message, ...messageList]);
      }
    });

    return () => {
      socket.off("receivedChatMessage");
    };
  }, [messageList]);

  if (isFetchingList) {
    return (
      <div className="grow flex flex-row justify-center items-center w-full">
        <CircularProgress
          sx={{
            "& .MuiCircularProgress-svg": {
              color: "teal",
            },
          }}
        />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="grow flex flex-row justify-center w-full">
        {JSON.stringify(fetchError)}
      </div>
    );
  }

  if (!groupedMessages || groupedMessages.length < 1) {
    return (
      <div className="grow flex flex-col gap-2 p-4 justify-center items-center">
        <EmojiPeople sx={{ fontSize: 80, color: "gray" }} />
        <Typography variant="p" className="text-gray">
          Hãy bắt đầu một cuộc trò chuyện!
        </Typography>
      </div>
    );
  }

  return (
    <div className="grow flex flex-col-reverse overflow-y-auto gap-2 p-2">
      {groupedMessages.map((msgGroup) => (
        <div key={msgGroup.date}>
          <DateDivider label={msgGroup.date} />
          <div className="flex flex-col-reverse gap-1">
            {msgGroup.messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                sentByUser={message.senderId === senderId}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
