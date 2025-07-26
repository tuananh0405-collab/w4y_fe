import { Button, CircularProgress, Typography } from "@mui/material";
import {
  useGetMessagesQuery,
  useMarkMessagesAsReadMutation,
} from "../../redux/api/chatApiSlice";
import Message from "./Message";
import { socket } from "../../socket";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EmojiPeople } from "@mui/icons-material";
import { isValidDateString } from "../../utils/dateUtils";
import DateDivider from "./DateDivider";
import FetchMoreTriggerSkeleton from "./FetchMoreTriggerSkeleton";

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
const MessageList = ({ senderId, receiverId, listOnSendRef }) => {
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: messageListQuery,
    error: fetchError,
    isLoading: isFetchingList,
  } = useGetMessagesQuery({ senderId, receiverId, page, limit: 20 }, {
    refetchOnMountOrArgChange: true, // Prevent caching
    refetchOnReconnect: true, // Refetch when network connection is regained, because might as well
  });
  const [markMessagesAsRead] = useMarkMessagesAsReadMutation();

  // State that both socket and api manage
  const [messageList, setMessageList] = useState(messageListQuery?.data);

  // Resets message list when renderId/receiverId changes
  useEffect(() => {
    setPage(1);
  }, [senderId, receiverId]);

  // If messageListQuery?.data changes but page is 1 (on senderId or receiverId change, most likely), replace the messageList
  useEffect(() => {
    if (page == 1) {
      setMessageList(messageListQuery?.data);
    }
  }, [page, messageListQuery?.data]);

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

  useEffect(() => {
    if (messageListQuery && messageListQuery.data) {
      const { data, pagination } = messageListQuery;
      if (!!pagination.currentPage && !!data && data.length) {
        // Since this effect hook depends on messageListQuery and page, pagination.currentPage === page means that messageListQuery's hook have updated it
        // from the old page to the new one which was fetched as a result of setPage((prev) => prev + 1). In that case, append the newly fetched message to messageList.
        // Do not do any appending if page == 1 since another hook above already override messageList when page == 1 (can be due to senderId or receiverId changing).
        // Simply setIsLoadingMore(false) in that case
        if (page != 1 && pagination.currentPage === page) {
          setMessageList((prev) => [...prev, ...data]);
          setIsLoadingMore(false);
        } else if (page == 1) {
          setIsLoadingMore(false);
        }
        setHasMore(pagination.hasNextPage);
      }
    }
  }, [messageListQuery, page]);

  const fetchMoreMessages = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    setPage((prev) => prev + 1);
  }, [isLoadingMore, hasMore]);

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
    if (messageToSetReadBatch.size > 0) {
      try {
        const results = (await markMessagesAsRead({
          messageIds: Array.from(messageToSetReadBatch),
        })).data;
        if (
          results.success && !!results.data && results.data.modifiedCount > 0
        ) {
          const { modifiedIds, is_read } = results.data;
          setMessageList((prev) => {
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

  if (listOnSendRef) {
    listOnSendRef.current = updateMessageReadBatch
  }

  const containerRef = useRef(null);

  // Init socket events
  useEffect(() => {
    socket.on("receivedChatMessage", (message) => {
      if (messageList) {
        setMessageList([message, ...messageList]);
        // Wrap in setTimeout so that the scroll down happens after the dom finished rendering the new message
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
          }
        }, 0);
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
      ref={containerRef}
    >
      {groupedMessages.map((msgGroup) => (
        <div key={msgGroup.date}>
          <DateDivider label={msgGroup.date} />
          <div className="flex flex-col-reverse gap-1">
            {msgGroup.messages.map((message) => (
              <Message
                key={message._id}
                message={message}
                sentByUser={message.senderId === senderId}
                onRead={handleMessageOnRead}
              />
            ))}
          </div>
        </div>
      ))}
      {hasMore && !isLoadingMore && (
        <FetchMoreTriggerSkeleton
          onFetchMore={() => setTimeout(fetchMoreMessages, 300)}
        />
      )}
    </div>
  );
};

export default MessageList;
