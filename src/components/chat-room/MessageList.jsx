import { CircularProgress, Typography } from "@mui/material";
import {
  useGetChatHistoryQuery,
  useMarkMessagesAsReadMutation,
} from "../../redux/api/chatApiSlice";
import Message from "./Message";
import { socket } from "../../socket";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const [markMessagesAsRead] = useMarkMessagesAsReadMutation();

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

  const [messageToSetReadBatch, setMessageToSetReadBatch] = useState(new Set()); // Batch of messages that is unread and will all have their is_read updated to true

  const handleMessageOnRead = useCallback((msgId) => {
    setMessageToSetReadBatch(
      (prev) => {
        if (prev.has(msgId)) return prev; // No update if already present
        const newSet = new Set(prev);
        newSet.add(msgId);
        return newSet;
      },
    );
  }, []);

  const updateMessageReadBatch = async () => {
    console.log(`1: ${messageToSetReadBatch.size}`);
    if (messageToSetReadBatch.size > 0) {
      try {
        const results = (await markMessagesAsRead({
          messageIds: Array.from(messageToSetReadBatch),
        })).data;
        console.log(`2`);
        console.log(results.success);
        console.log(results.data);
        console.log(results.data.modifiedCount);
        if (
          results.success && !!results.data && results.data.modifiedCount > 0
        ) {
          console.log("3");
          const { modifiedIds, is_read } = results.data;
          console.log(modifiedIds);
          console.log(is_read);
          setMessageList((prev) => {
            console.log("4");
            console.log(prev);
            const updatedList = prev.map((message) =>
              modifiedIds.find((modifiedMessage) =>
                modifiedMessage === message._id
              )
                ? { ...message, is_read }
                : message
            );
            return updatedList;
          });
          setMessageToSetReadBatch(new Set());
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const scrollTimeout = useRef();

  const handleScroll = () => {
    clearTimeout(scrollTimeout.current);

    scrollTimeout.current = setTimeout(() => {
      updateMessageReadBatch();
    }, 300);
  };

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
    <div
      className="grow flex flex-col-reverse overflow-y-auto gap-2 p-2"
      onScroll={handleScroll}
    >
      {groupedMessages.map((msgGroup) => (
        <div key={msgGroup.date}>
          <DateDivider label={msgGroup.date} />
          <div className="flex flex-col-reverse gap-1">
            {msgGroup.messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                sentByUser={message.senderId === senderId}
                onRead={handleMessageOnRead}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
