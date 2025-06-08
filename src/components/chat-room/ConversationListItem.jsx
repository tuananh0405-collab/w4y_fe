import { Button } from "@mui/material";

// Represents each items in the conversation list
const ConversationListItem = ({ name, title, onSelect }) => {
  return (
    <Button onClick={onSelect} className="w-full">
      <div className="flex items-center p-4 bg-red-300 w-full">
        {name} - {title}
      </div>
    </Button>
  );
};

export default ConversationListItem;
