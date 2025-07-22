import { apiSlice } from "./apiSlice";
import { ANALYTICS_URL } from "../constants";

export const analyticsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWebTrafficReport: builder.mutation({
      query: (data) => ({
        url: `${ANALYTICS_URL}/web-traffic`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetWebTrafficReportMutation } = analyticsApiSlice;
