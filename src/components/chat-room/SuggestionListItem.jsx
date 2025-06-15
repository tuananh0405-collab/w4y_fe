import { Avatar, Stack } from "@mui/material";

// Represents each items in the suggestion list
/* Currently includes:
  * name
  * email
  * descriptions stack
  */
const SuggestionListItem = ({ id, name, email, descriptionsLabel, descriptionsStack, onSelect }) => {
  id
  return (
    <div key={id}>
      <div className="flex items-center w-full gap-2 cursor-pointer transition-colors duration-200 hover:bg-gray-100 p-1" onClick={onSelect}>
        <Stack className="ps-4 mt-2">
          <Stack direction={"row"} gap={2}>
            <Avatar src="" sx={{ width: 48, height: 48 }} />
            <Stack>
              <h2 className="mb-2 leading-tight max-w-full font-bold" >{name}</h2>
              <h3 className="mb-2 leading-tight max-w-full" >{email}</h3>
            </Stack>
          </Stack>
          <p className="font-light">{descriptionsLabel}</p>
          <Stack>
            {descriptionsStack.map((desc, index) => <p key={index} className="italic">{desc}</p>)}
          </Stack>
          {/*
      <p className="font-light">{formatDate(new Date(lastMessageAt))} {lastMessage}</p>
      */}
        </Stack>
      </div>
      <div className="h-px bg-black opacity-20 mx-4" />
    </div>
  );
};

export default SuggestionListItem;
