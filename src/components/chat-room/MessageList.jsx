import { CircularProgress } from "@mui/material";
import { useGetChatHistoryQuery } from "../../redux/api/chatApiSlice";
import Message from "./Message";
import { socket } from "../../socket";
import { useEffect, useState } from "react";

// Display a range of message in the current conversation
const MessageList = ({ senderId, receiverId }) => {
  const { data: messageListQuery, error: fetchError, isLoading: isFetchingList } = useGetChatHistoryQuery({ senderId, receiverId });

  // State that both socket and api manage
  const [messageList, setMessageList] = useState(messageListQuery?.data)

  // Resets message list when renderId/receiverId changes
  useEffect(() => {
    setMessageList(messageListQuery?.data)
  }, [messageListQuery?.data])

  // Init socket events
  useEffect(() => {
    socket.on("receivedChatMessage", (message) => {
      if (messageList) {
        setMessageList([message, ...messageList])
      }
    })

    return () => {
      socket.off("receivedChatMessage")
    }
  }, [messageList])

  if (isFetchingList) {
    return (
      <div className="grow flex flex-row justify-center w-full">
        <CircularProgress />
      </div>
    )
  }

  if (fetchError) {
    return (
      <div className="grow flex flex-row justify-center w-full">
        {JSON.stringify(fetchError)}
      </div>
    )
  }

  if (!messageList || messageList.length < 1) {
    return (
      <div className="grow flex flex-col gap-2 p-4">
        {JSON.stringify(messageListQuery)}
        Connect to a conversation to start
      </div>
    );
  }

  return (
    <div className="grow flex flex-col-reverse gap-2 p-4">
      <>
        {messageList.map((message) => <Message message={message} sentByUser={message.senderId === senderId} />)}
      </>
    </div>
  );
};

export default MessageList;
