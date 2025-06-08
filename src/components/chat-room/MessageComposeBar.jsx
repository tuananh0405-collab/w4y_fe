import { Button, Input, Stack } from "@mui/material";
import { useState } from "react";

// The bar right below message list that allows typing and sending message
const MessageComposeBar = ({ onSend }) => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex justify-between gap-2 p-4 bg-blue-200">
      <Stack>
        MessageComposeBar
        <div>
          <Input value={message} onChange={(v) => setMessage(v.target.value)}/>
          <Button onClick={() => onSend(message)}>Send</Button>
        </div>
      </Stack>
    </div>
  );
};

export default MessageComposeBar;
