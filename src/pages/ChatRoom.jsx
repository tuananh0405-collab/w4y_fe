import { CircularProgress } from "@mui/material";
import ConversationListHeader from "../components/chat-room/ConversationListHeader";
import ConversationFilterBar from "../components/chat-room/ConversationFilterBar";
import ConversationList from "../components/chat-room/ConversationList";
import ConversationDescriptionCard from "../components/chat-room/ConversationDescriptionCard";
import MessageList from "../components/chat-room/MessageList";
import MessageComposeBar from "../components/chat-room/MessageComposeBar";
import { useGetChatTokenQuery } from "../redux/api/chatApiSlice";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import ApplicantSuggestionList from "../components/chat-room/SuggestionList_Applicant";
import RecruiterSuggestionList from "../components/chat-room/SuggestionList_Recruiter";

// TODO: Get these from an centralized enum file
const TYPE_APPLICANT = "Ứng Viên"
const TYPE_RECRUITER = "Nhà Tuyển Dụng"

const ChatRoom = () => {
  const user = useSelector((state) => state.auth.userState);
  const senderId = user?.user?.id;
  const accountType = user?.user?.accountType;

  const { data: chatTokenQuery, error: fetchError, isLoading: isFetchingToken } = useGetChatTokenQuery({ senderId });
  const { data: chatToken } = chatTokenQuery || { data: null }
  const [receiverId, setReceiverId] = useState(null);
  const [receiverProfile, setReceiverProfile] = useState(null);

  const onSend = (!chatToken) ? () => { alert("Invalid chat token") } :
    (!receiverId) ? () => { alert("Please choose an user to chat with") } :
      (message) => {
        socket.emit("sendChatMessage", { chatToken, receiverId, message });
      }

  // Init socket events
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("connectToConversation", ({ success, receiver }) => {
      if (success) {
        console.log(receiver)
        setReceiverProfile(receiver)
      }
      alert("Connected to conversation")
    })

    return () => {
      socket.off("connect");
      socket.off("connectToConversation");
    }
  }, [])

  // Communicate conversation change to socket
  useEffect(() => {
    if (chatToken && receiverId) {
      socket.emit("setActiveConversation", { chatToken, receiverId })
      console.log(`Emmited ${JSON.stringify({ chatToken, receiverId })}`)
    }
  }, [receiverId, chatToken])

  // === RENDER ===
  if (isFetchingToken) {
    return (
      <div className="flex flex-row justify-center w-full min-h-screen bg-gray-200">
        <CircularProgress />
      </div>
    )
  }

  if (fetchError) {
    <div className="flex flex-row justify-center w-full min-h-screen bg-gray-200">
      {JSON.stringify(fetchError)}
    </div>
  }

  return (
    <div className="flex flex-row w-full min-h-screen bg-gray-200">
      {/* Conversation pick Panel */}
      <div className="grow-3 flex flex-col min-h-screen bg-gray-200 p-2">
        <ConversationListHeader />
        <ConversationFilterBar />
        <ConversationList senderId={senderId} onSelect={(str) => { setReceiverId(str); console.log(str) }} />
      </div>

      <div className="grow-0 w-px bg-black opacity-20"></div>

      {/* Main/Chat panel */}
      <div className="grow-7 flex flex-col min-h-screen bg-gray-200 p-2">
        <ConversationDescriptionCard name={receiverProfile?.name} title={receiverProfile?.accountType} />
        <MessageList senderId={senderId} receiverId={receiverId} />
        <MessageComposeBar onSend={onSend} />
      </div>

      <div className="grow-0 w-px bg-black opacity-20"></div>

      {/* Conversation suggest panel */}
      <div className="grow-3 flex flex-col min-h-screen bg-gray-200 p-2">
        {accountType === TYPE_RECRUITER && <RecruiterSuggestionList userId={senderId} onSelect={setReceiverId} />}
        {accountType === TYPE_APPLICANT && <ApplicantSuggestionList userId={senderId} onSelect={setReceiverId} />}
      </div>
    </div>
  );
};

export default ChatRoom;
