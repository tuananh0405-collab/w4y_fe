import { Button, Stack } from "@mui/material";

// Represents each items in the conversation list
/* Currently includes:
  * name
  * email
  * lastMessage
  * lastMessageAt
  */
const ConversationListItem = ({ name, email, lastMessage, lastMessageAt, onSelect }) => {
  return (
    <Button onClick={onSelect} className="w-full">
      <div className="flex items-center p-4 bg-red-300 w-full">
        <Stack>
          <p>name: {name}</p>
          <p>email: {email}</p>
          <p>lastMessage: {lastMessage} - {lastMessageAt}</p>
        </Stack>
      </div>
    </Button>
  );
};

export default ConversationListItem;
