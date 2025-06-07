import Message from "./Message";

// Display a range of message in the current conversation
const MessageList = () => {
  return (
    <div className="grow flex flex-col items-center gap-2 p-4 bg-blue-100">
      MessageList
      <Message/>
      <Message/>
      <Message/>
      <Message/>
    </div>
  );
};

export default MessageList;
