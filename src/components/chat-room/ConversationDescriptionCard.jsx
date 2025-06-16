
// The card above message list that display information about the conversation

import { CardActions, CardContent, Stack, Typography, Card, Avatar } from "@mui/material";

/* Currently displays:
  * Recipient's avatar
  * Recipient's name
  * Recipient's title
  */
const ConversationDescriptionCard = ({ name, title }) => {
  return (
    <div className="flex items-center gap-8 p-4  border-b border-gray-300">
      {(!!name && !!title) && <Stack className="w-full">
        <Card
          sx={{ backgroundColor: '#e5e7eb' }}
        >
          <CardContent >
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              <Avatar src="" sx={{ width: 48, height: 48 }} />
              <Stack>
                {!!name && <Typography variant="h5">{name}</Typography>}
                {!!title && <Typography>{title}</Typography>}
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>}
    </div>
  );
};

export default ConversationDescriptionCard;
