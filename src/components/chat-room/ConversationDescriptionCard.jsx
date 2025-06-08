
// The card above message list that display information about the conversation

import { CardActions, CardContent, Stack } from "@mui/material";
import { Card } from "antd";

/* Currently displays:
  * Recipient's avatar
  * Recipient's name
  * Recipient's title
  */
const ConversationDescriptionCard = ({ name, title }) => {
  return (
    <div className="flex items-center gap-8 p-4 bg-blue-50">
      <Stack className="w-full">
        ConversationDescriptionCard
        <Card variant="outlined" >
          <CardContent>
            {(!!name && !!title) ? name + " - " + title : ""}

          </CardContent>
        </Card>
      </Stack>
    </div>
  );
};

export default ConversationDescriptionCard;
