import { Stack } from "@mui/material";
import ConversationListItem from "./ConversationListItem";

// List of available conversations
const ConversationList = ({ onSelect }) => {
  return (
    <div className="grow flex flex-col gap-2 p-4 bg-red-200 overflow-auto">
      <Stack>
        ConversationList
        <ConversationListItem name={"Test1"} title={"User1"} onSelect={() => onSelect("68445832b0c26fdd8401ee27")} />
        <ConversationListItem name={"Test2"} title={"User2"} onSelect={() => onSelect("68439c2c3492c26a132cc511")} />
      </Stack>
    </div>
  );
};

export default ConversationList;
