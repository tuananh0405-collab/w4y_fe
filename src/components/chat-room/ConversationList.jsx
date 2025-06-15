import { Skeleton, Stack, Typography } from "@mui/material";
import ConversationListItem from "./ConversationListItem";
import { useGetRecentMessagedUsersQuery } from "../../redux/api/chatApiSlice";

// List of available conversations
const ConversationList = ({ senderId, onSelect, query, isChangingQuery }) => {
  const { data: userListQuery, error: fetchError, isLoading: isFetchingList } = useGetRecentMessagedUsersQuery({ senderId, query });
  const { data: userList } = userListQuery ?? { data: [] }

  if (isFetchingList || isChangingQuery) {
    return (
      <div className="grow flex flex-col justify-center w-full gap-2 p-2">
        <Skeleton variant="rounded" height={60} />
        <Skeleton variant="rounded" height={60} />
        <Skeleton variant="rounded" height={60} />
      </div>
    )
  }

  if (fetchError) {
    return (
      <div className="grow flex flex-row justify-center w-full">
        {JSON.stringify(fetchError)}
      </div>
    )
  }

  return (
    <div className="grow flex flex-col gap-2 overflow-auto">
      {!query && <Typography variant="body1" paddingX={2} className="w-full font-light">CÁC CUỘC TRÒ CHUYỆN CỦA BẠN:</Typography>}
      <Stack>
        {userList.map((user) =>
          <ConversationListItem key={user.email} name={user.name} email={user.email} lastMessage={user.lastMessage} lastMessageAt={user.lastMessageAt} onSelect={() => onSelect(user.receiverId)} />
        )}
      </Stack>
    </div>
  );
};

export default ConversationList;
