import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";

// Represents each messages in the message list
const Message = ({ message, sentByUser }) => {
  return (
    <Stack width={"100%"} direction={(sentByUser) ? "row-reverse" : "row"}>
      <Stack>
        <Stack direction={(sentByUser) ? "row-reverse" : "row"} alignItems={"center"} gap={2}>
          {/*<Avatar src="" sx={{ width: 48, height: 48 }} />*/}
          <Stack>
            <p className="bg-teal-700 text-white rounded-xl px-4 py-2 max-w-xs">{message.message}</p>
          </Stack>
        </Stack>
        <Typography>{message.sentAt}</Typography>
        {/*<p>By you: {sentByUser ? "true" : "false"}</p>*/}
      </Stack>
    </Stack>
  );
};

export default Message;
