import { Stack } from "@mui/material";

// Represents each messages in the message list
const Message = ({ message, isByUser }) => {
  return (
    <div className="flex w-full items-center p-4 bg-blue-300">
      <Stack>
        <p>{message.message}</p>
        <p>{message.sentAt}</p>
        <p>By you: {isByUser ? "true" : "false"}</p>
      </Stack>
    </div>
  );
};

export default Message;
