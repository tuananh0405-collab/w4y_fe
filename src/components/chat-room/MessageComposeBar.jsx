import { EmojiEmotions, Search, Send } from "@mui/icons-material";
import { Button, Input, InputAdornment, Stack, TextField } from "@mui/material";
import { useState } from "react";

// The bar right below message list that allows typing and sending message
const MessageComposeBar = ({ onSend }) => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex p-4">
      <Stack width="100%" direction={"row"} gap={2}>
        <Button
          // onClick={() => onSend(message)}
          className="hover:ring-2 hover:ring-teal-600 hover:ring-offset-2 transition"
          sx={{
            color: "#0f766e",
            borderRadius: '50%',
            minWidth: 0,
            width: 40,
            height: 40,
            padding: 0,
          }}
        >
          <EmojiEmotions />
        </Button>
        <TextField
          value={message}
          onChange={(v) => setMessage(v.target.value)}
          className="grow p-0"
          sx={{
            // Rounded
            '& .MuiOutlinedInput-root': {
              borderRadius: '24px',
            },
            // Inner input's padding
            '& .MuiOutlinedInput-input': {
              padding: '8px 10px',
            },
          }} />
        <Button
          onClick={() => onSend(message)}
          className="hover:ring-2 hover:ring-teal-600 hover:ring-offset-2 transition"
          color="inherit"
          sx={{
            color: "#0f766e",
            borderRadius: '50%',
            minWidth: 0,
            width: 40,
            height: 40,
            padding: 0,
          }}
        >
          <Send />
        </Button>
      </Stack>
    </div>
  );
};

export default MessageComposeBar;
