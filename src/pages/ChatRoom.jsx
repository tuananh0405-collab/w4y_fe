import { Button } from "@mui/material";
import ConversationListHeader from "../components/chat-room/ConversationListHeader";
import ConversationFilterBar from "../components/chat-room/ConversationFilterBar";
import ConversationList from "../components/chat-room/ConversationList";
import ConversationDescriptionCard from "../components/chat-room/ConversationDescriptionCard";
import MessageList from "../components/chat-room/MessageList";
import MessageComposeBar from "../components/chat-room/MessageComposeBar";

const ChatRoom = () => {
  return (
    <div className="flex flex-row w-full min-h-screen bg-gray-200">
      {/* Conversation pick Panel */}
      <div className="grow-3 flex flex-col min-h-screen bg-gray-200 p-2">
        <ConversationListHeader />
        <ConversationFilterBar />
        <ConversationList />
      </div>

      <div className="grow-0 w-px bg-black opacity-20"></div>

      {/* Main/Chat panel */}
      <div className="grow-7 flex flex-col min-h-screen bg-gray-200 p-2">
        <ConversationDescriptionCard/>
        <MessageList/>
        <MessageComposeBar/>
      </div>

      <div className="grow-0 w-px bg-black opacity-20"></div>

      {/* Conversation suggest panel */}
      <div className="grow-3 flex flex-col min-h-screen bg-gray-200 p-2">
        idk top cv have ts
      </div>
    </div>
  );
};

export default ChatRoom;
