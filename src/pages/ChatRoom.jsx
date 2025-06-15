import { CircularProgress, Typography } from "@mui/material";
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

// Amount of time in milliseconds to wait after user stops typing before fetching
const QUERY_DELAY_MS = 700

const ChatRoom = () => {
  const user = useSelector((state) => state.auth.userState);
  const senderId = user?.user?.id;
  const accountType = user?.user?.accountType;

  const { data: chatTokenQuery, error: fetchError, isLoading: isFetchingToken } = useGetChatTokenQuery({ senderId });
  const { data: chatToken } = chatTokenQuery || { data: null }
  const [receiverId, setReceiverId] = useState(null);
  const [receiverProfile, setReceiverProfile] = useState(null);

  // Manage query for inputs
  const [conversationQuery, setConversationQuery] = useState("");
  // Manage query for fetch (separate so that a delay can be added)
  const [conversationQuery_fetch, setConversationQuery_fetch] = useState("");
  // For the loading effect when fetch with new query
  const [isChangingQuery, setIsChangingQuery] = useState(false);

  // Wait for QUERY_DELAY_MS in milliseconds after user stops typing before fetching
  useEffect(() => {
    setIsChangingQuery(true);
    const timeout = setTimeout(() => {
      setConversationQuery_fetch(conversationQuery);

      // Ensure that loading state is disabled only after setConversationQuery_fetch has been flushed
      requestAnimationFrame(() => {
        setIsChangingQuery(false);
      });
    }, QUERY_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [conversationQuery]);


  const onSend = (!chatToken) ? () => { alert("Invalid chat token, please login and try again") } :
    (!receiverId) ? () => { alert("Please choose an user to chat with") } :
      (message) => {
        socket.emit("sendChatMessage", { chatToken, receiverId, message });
      }

  // Init socket events
  useEffect(() => {
    socket.on("connect", () => {
      // console.log("Connected:", socket.id);
    });

    socket.on("connectToConversation", ({ success, receiver }) => {
      if (success) {
        setReceiverProfile(receiver)
      }
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
    <div className="w-full max-w-1024 min-h-screen grid grid-cols-[1fr_auto_2fr_auto_1fr]">
      <div className="flex justify-center">
        <div className="w-full bg-gray-50 min-w-32 max-w-128">
          <ConversationListHeader />
          <ConversationFilterBar value={conversationQuery} onSetQuery={setConversationQuery} />
          <ConversationList senderId={senderId} onSelect={(str) => setReceiverId(str)} query={conversationQuery_fetch} isChangingQuery={isChangingQuery} />
        </div>
      </div>

      <div className="w-px bg-black opacity-20" />

      {/* Main Content */}
      <div className="flex flex-col h-screen">
        <ConversationDescriptionCard name={receiverProfile?.name} title={receiverProfile?.accountType} />
        <MessageList senderId={senderId} receiverId={receiverId} />
        <MessageComposeBar onSend={onSend} />
      </div>

      <div className="w-px bg-black opacity-20" />

      <div className="flex justify-center">
        <div className="w-full bg-gray-50 min-w-32 max-w-128">
          {accountType === TYPE_RECRUITER && <>
            <Typography variant="body1" paddingX={2} className="w-full bg-gray-200 font-light">CÁC ỨNG VIÊN ĐÃ ỨNG TUYỂN GẦN ĐÂY:</Typography>
            <RecruiterSuggestionList userId={senderId} onSelect={setReceiverId} />
          </>}
          {accountType === TYPE_APPLICANT && <>
            <Typography variant="body1" paddingX={2} className="w-full bg-gray-200 font-light">CÁC VỊ TRÍ BẠN ỨNG TUYỂN:</Typography>
            <ApplicantSuggestionList userId={senderId} onSelect={setReceiverId} />
          </>}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
