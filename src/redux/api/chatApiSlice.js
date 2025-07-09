import { apiSlice } from "./apiSlice";
import { CHAT_URL } from "../constants";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatToken: builder.query({
      query: () => ({
        url: `${CHAT_URL}/token`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getMessages: builder.query({
      query: ({ senderId, receiverId, page = 1, limit = 20 }) => ({
        url: `${CHAT_URL}/messages`,
        method: "GET",
        params: { senderId, receiverId, page, limit },
        credentials: "include",
      }),
    }),

    getConversations: builder.query({
      query: ({ senderId, query }) => ({
        url: `${CHAT_URL}/conversations`,
        method: "GET",
        params: { senderId, query },
        credentials: "include",
      }),
    }),

    getRecruitersGroupedByApplications: builder.query({
      query: ({ applicantId }) => ({
        url: `${CHAT_URL}/recruiters-by-applications`,
        method: "GET",
        params: { applicantId },
        credentials: "include",
      }),
    }),

    getApplicantsGroupedByApplications: builder.query({
      query: ({ recruiterId }) => ({
        url: `${CHAT_URL}/applicants-by-applications`,
        method: "GET",
        params: { recruiterId },
        credentials: "include",
      }),
    }),

    markMessagesAsRead: builder.mutation({
      query: ({ messageIds, is_read = true }) => ({
        url: `${CHAT_URL}/mark-read`,
        method: "PATCH",
        body: { messageIds, is_read },
        credentials: "include",
      }),
    }),

    getUnreadMessageSenders: builder.query({
      query: ({ startDate, endDate } = {}) => ({
        url: `${CHAT_URL}/unread-messages-senders`,
        method: "GET",
        params: { startDate, endDate },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetChatTokenQuery,
  useGetMessagesQuery,
  useGetConversationsQuery,
  useGetRecruitersGroupedByApplicationsQuery,
  useGetApplicantsGroupedByApplicationsQuery,
  useMarkMessagesAsReadMutation,
  useGetUnreadMessageSendersQuery,
} = chatApiSlice;
