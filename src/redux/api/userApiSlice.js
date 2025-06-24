import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constants"; 

export const userApiSlice = apiSlice.injectEndpoints({

    
  endpoints: (builder) => ({
    getTotalUserCount: builder.query({
      query: () => ({
        url: `${USER_URL}/stats/total`,
        method: "GET",
      }),
    }),

    getApplicantRecruiterCount: builder.query({
      query: () => ({
          url: `${USER_URL}/stats/role-counts`,
          method: "GET",
      }),
    }),

    // Monthly user growth
    getMonthlyUserGrowth: builder.query({
      query: (year) => ({
        url: `${USER_URL}/stats/monthly-growth?year=${year}`,
        method: "GET",
      }),
    }),

    // Quarterly user growth
    getQuarterlyUserGrowth: builder.query({
      query: (year) => ({
        url: `${USER_URL}/stats/quarterly-growth?year=${year}`,
        method: "GET",
      }),
    }),

    // Yearly user growth
    getYearlyUserGrowth: builder.query({
      query: (endYear) => ({
        url: `${USER_URL}/stats/yearly-growth?endYear=${endYear}`,
        method: "GET",
      }),
    }),

  }),
});

export const {
    useGetTotalUserCountQuery,
    useGetApplicantRecruiterCountQuery,
    useGetMonthlyUserGrowthQuery,
    useGetQuarterlyUserGrowthQuery,
    useGetYearlyUserGrowthQuery

} = userApiSlice;
