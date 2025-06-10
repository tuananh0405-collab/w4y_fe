import { CircularProgress, Stack } from "@mui/material";
import ConversationListItem from "./ConversationListItem";
import { useGetRecentMessagedUsersQuery } from "../../redux/api/chatApiSlice";

// List of available conversations
const ConversationList = ({ senderId, onSelect }) => {
  const { data: userListQuery, error: fetchError, isLoading: isFetchingList } = useGetRecentMessagedUsersQuery({ senderId, query: "a" });
  const { data: userList } = userListQuery ?? { data: [] }

  if (isFetchingList) {
    return (
      <div className="grow flex flex-row justify-center w-full bg-blue-100">
        <CircularProgress />
      </div>
    )
  }

  if (fetchError) {
    return (
      <div className="grow flex flex-row justify-center w-full bg-blue-100">
        {JSON.stringify(fetchError)}
      </div>
    )
  }

  return (
    <div className="grow flex flex-col gap-2 p-4 bg-red-200 overflow-auto">
      <Stack>
        {userList.map((user) =>
          <ConversationListItem name={user.name} email={user.email} lastMessage={user.lastMessage} lastMessageAt={user.lastMessageAt} onSelect={() => onSelect(user.receiverId)} />
        )}
      </Stack>
    </div>
  );
};

export default ConversationList;
