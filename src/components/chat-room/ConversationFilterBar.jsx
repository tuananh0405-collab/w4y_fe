import { Input, Stack } from "@mui/material";

// The bar above conversation list that searches for conversation based on a query
const ConversationFilterBar = () => {
  return (
    <div className="flex justify-between gap-2 p-4 bg-red-100">
      <Stack>
        ConversationFilterBar
        <Input />
      </Stack>
    </div>
  );
};

export default ConversationFilterBar;
