import { apiSlice } from "./apiSlice";
import { CHAT_URL } from "../constants";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatToken: builder.query({
      query: (senderId) => ({
        url: `${CHAT_URL}/chatToken`,
        method: "POST",
        body: { senderId },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getChatHistory: builder.query({
      query: ({senderId, receiverId}) => ({
        url: `${CHAT_URL}/chatHistory`,
        method: "POST",
        body: { senderId, receiverId },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetChatTokenQuery, useGetChatHistoryQuery } = chatApiSlice;
