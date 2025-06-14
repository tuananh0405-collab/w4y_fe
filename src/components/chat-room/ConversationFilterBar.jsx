import { Input, Stack } from "@mui/material";

// The bar above conversation list that searches for conversation based on a query
const ConversationFilterBar = ({ value, onSetQuery }) => {
  return (
    <div className="flex justify-between gap-2 p-4 bg-red-100">
      <Stack>
        ConversationFilterBar
        <Input value={value} onChange={(v) => onSetQuery(v.target.value)} />
      </Stack>
    </div>
  );
};

export default ConversationFilterBar;
