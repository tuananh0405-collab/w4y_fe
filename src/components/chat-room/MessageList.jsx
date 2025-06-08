import { CircularProgress } from "@mui/material";
import { useGetChatHistoryQuery } from "../../redux/api/chatApiSlice";
import Message from "./Message";
import { socket } from "../../socket";
import { useEffect, useState } from "react";

// Display a range of message in the current conversation
const MessageList = ({ senderId, receiverId }) => {
  const { data: messageListQuery, error: fetchError, isLoading: isFetchingList } = useGetChatHistoryQuery({ senderId, receiverId });
  const [messageList, setMessageList] = useState(messageListQuery?.messageList)

  useEffect(() => {
    setMessageList(messageListQuery?.messageList)
  }, [messageListQuery?.messageList])

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
      <div className="grow flex flex-row justify-center w-full bg-blue-100">
        <CircularProgress />
      </div>
    )
  }

  if (fetchError) {
    return (
      <div className="grow flex flex-row justify-center w-full bg-blue-100">
        {JSON.stringify(fetchError)}
      </div>
    )
  }

  if (!messageList) {
    return (
      <div className="grow flex flex-col gap-2 p-4 bg-blue-100">
        {JSON.stringify(messageListQuery)}
        Connect to a conversation to start
      </div>
    );
  }

  return (
    <div className="grow flex flex-col-reverse gap-2 p-4 bg-blue-100">
      ConversationList
      {(messageList && messageList.length >= 1) && <>
        {messageList.map((message) => <Message message={message} isByUser={message.senderId === senderId} />)}
      </>}
      {(messageList && messageList.length < 1) && <p>No messages yet</p>}
    </div>
  );
};

export default MessageList;
