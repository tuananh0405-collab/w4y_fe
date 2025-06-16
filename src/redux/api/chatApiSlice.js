import { apiSlice } from "./apiSlice";
import { CHAT_URL } from "../constants";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatToken: builder.query({
      query: ({ senderId }) => ({
        url: `${CHAT_URL}/chatToken`,
        method: "GET",
        params: { senderId },
        credentials: "include",
      }),
    }),

    getChatHistory: builder.query({
      query: ({ senderId, receiverId }) => ({
        url: `${CHAT_URL}/chatHistory`,
        method: "GET",
        params: { senderId, receiverId },
        credentials: "include",
      }),
    }),

    getRecentMessagedUsers: builder.query({
      query: ({ senderId, query }) => ({
        url: `${CHAT_URL}/recentMessagedUsers`,
        method: "GET",
        params: { senderId, query },
        credentials: "include",
      }),
    }),

    getRecruitersGroupedByApplications: builder.query({
      query: ({ applicantId }) => ({
        url: `${CHAT_URL}/recruitersGroupedByApplications`,
        method: "GET",
        params: { applicantId },
        credentials: "include",
      }),
    }),

    getApplicantsGroupedByApplications: builder.query({
      query: ({ recruiterId }) => ({
        url: `${CHAT_URL}/applicantsGroupedByApplications`,
        method: "GET",
        params: { recruiterId },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetChatTokenQuery,
  useGetChatHistoryQuery,
  useGetRecentMessagedUsersQuery,
  useGetRecruitersGroupedByApplicationsQuery,
  useGetApplicantsGroupedByApplicationsQuery,
} = chatApiSlice;
