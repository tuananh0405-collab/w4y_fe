import { Button, Stack } from "@mui/material";

// Represents each items in the suggestion list
/* Currently includes:
  * name
  * email
  * descriptions stack
  */
const SuggestionListItem = ({ id, name, email, descriptionsLabel, descriptionsStack, onSelect }) => {
  return (
    <Button onClick={() => onSelect(id)} className="w-full">
      <div className="flex items-center p-4 bg-red-300 w-full">
        <Stack>
          <p>name: {name}</p>
          <p>email: {email}</p>
          <p class="font-bold ...">{descriptionsLabel}</p>
          <Stack>
            {descriptionsStack.map((desc) => <p>{desc}</p>)}
          </Stack>
        </Stack>
      </div>
    </Button>
  );
};

export default SuggestionListItem;
