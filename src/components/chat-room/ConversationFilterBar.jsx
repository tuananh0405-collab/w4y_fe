import { Search } from "@mui/icons-material";
import { TextField, InputAdornment, Stack } from "@mui/material";

// The bar above conversation list that searches for conversation based on a query
const ConversationFilterBar = ({ value, onSetQuery }) => {
  return (
    <div className="flex justify-between gap-2 p-4">
      <TextField
        value={value}
        onChange={(v) => onSetQuery(v.target.value)}
        className="w-full p-0"
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
          },
        }}
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
    </div>
  );
};

export default ConversationFilterBar;
