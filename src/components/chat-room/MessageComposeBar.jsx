import { EmojiEmotions, Send } from "@mui/icons-material";
import { Button, Popover, Stack, TextField } from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

// The bar right below message list that allows typing and sending message
const MessageComposeBar = ({ onSend, listOnSendRef }) => {
  const [message, setMessage] = useState("");

  const [emojiAnchorEl, setEmojiAnchorEl] = useState(null);

  const handleEmojiClick = (event) => {
    setEmojiAnchorEl(event.currentTarget);
  };

  const handleEmojiClose = () => {
    setEmojiAnchorEl(null);
  };

  const handleEmojiSelect = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    // handleEmojiClose();
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
    }
    if (listOnSendRef && listOnSendRef.current) {
      try {
        listOnSendRef.current()
      }
      catch (e) {
        console.error(e)
      }
    }
  };

  const handleTextFieldKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex p-4">
      <Stack width="100%" direction={"row"} gap={2}>
        <Button
          onClick={handleEmojiClick}
          className="hover:ring-2 hover:ring-teal-600 hover:ring-offset-2 transition"
          sx={{
            color: "#0f766e",
            borderRadius: "50%",
            minWidth: 0,
            width: 40,
            height: 40,
            padding: 0,
          }}
        >
          <EmojiEmotions />
        </Button>
        <Popover
          open={Boolean(emojiAnchorEl)}
          anchorEl={emojiAnchorEl}
          onClose={handleEmojiClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <EmojiPicker
            lazyLoadEmojis={true}
            onEmojiClick={handleEmojiSelect}
            width={300}
            height={400}
          />
        </Popover>
        <TextField
          value={message}
          onChange={(v) => setMessage(v.target.value)}
          onKeyDown={handleTextFieldKeyDown}
          className="grow p-0"
          sx={{
            // Rounded
            "& .MuiOutlinedInput-root": {
              borderRadius: "24px",
            },
            // Inner input's padding
            "& .MuiOutlinedInput-input": {
              padding: "8px 10px",
            },
          }}
        />
        <Button
          onClick={handleSendMessage}
          className="hover:ring-2 hover:ring-teal-600 hover:ring-offset-2 transition"
          color="inherit"
          sx={{
            color: "#0f766e",
            borderRadius: "50%",
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
