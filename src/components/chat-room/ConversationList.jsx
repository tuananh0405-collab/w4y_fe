import ConversationListItem from "./ConversationListItem";

// List of available conversations
const ConversationList = () => {
  return (
    <div className="grow flex flex-col gap-2 p-4 bg-red-200">
      ConversationList
      <ConversationListItem/>
      <ConversationListItem/>
      <ConversationListItem/>
      <ConversationListItem/>
    </div>
  );
};

export default ConversationList;
