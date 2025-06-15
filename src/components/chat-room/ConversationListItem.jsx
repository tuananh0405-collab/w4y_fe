import { Avatar, Stack } from "@mui/material";

/*
function formatDate(date) {
  const pad = (num) => num.toString().padStart(2, '0');

  const minutes = pad(date.getMinutes());
  const hours = pad(date.getHours());
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);

  return `${hours}:${minutes} - ${day}/${month}`;
}
*/

// Represents each items in the conversation list
/* Currently includes:
  * name
  * email
  * lastMessage
  * lastMessageAt
  */
const ConversationListItem = ({ name, email, lastMessage, lastMessageAt, onSelect }) => {
  // Just to hide the warning
  // TODO: Shows the last message and it's sent date (dynamically updates when a message is received)
  lastMessage
  lastMessageAt

  return (
    <div className="flex items-center w-full gap-2 cursor-pointer transition-colors duration-200 hover:bg-gray-100" onClick={onSelect}>
      <Stack className="ps-4 mt-2">
        <Stack direction={"row"} gap={2}>
          <Avatar src="" sx={{ width: 48, height: 48 }} />
          <Stack>
            <h2 className="mb-2 leading-tight max-w-full font-bold" >{name}</h2>
            <h3 className="mb-2 leading-tight max-w-full" >{email}</h3>
          </Stack>
        </Stack>
        {/*
      <p className="font-light">{formatDate(new Date(lastMessageAt))} {lastMessage}</p>
      */}
      </Stack>
    </div>
  );
};

export default ConversationListItem;
