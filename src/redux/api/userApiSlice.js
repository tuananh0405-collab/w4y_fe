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

    getListOfUsers: builder.query({
      query: ({ page = 1, pageSize = 10, sortField, sortOrder, filters }) => {
        const query = new URLSearchParams();
        query.append("page", page);
        query.append("pageSize", pageSize);
        if (sortField) query.append("sortField", sortField);
        if (sortOrder) query.append("sortOrder", sortOrder);
        if (filters && filters.length > 0) {
          query.append("filters", JSON.stringify(filters));
        }

        return {
          url: `${USER_URL}/control/list?${query.toString()}`,
          method: "GET",
        };
      },
    }),

    getTopCities: builder.query({
      query: () => ({
        url: `${USER_URL}/stats/topcities`,
        method: "GET",
      }),
    }),

    getAgeGenderPyramid: builder.query({
      query: () => ({
        url: `${USER_URL}/stats/age-gender-pyramid`,
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
  useGetYearlyUserGrowthQuery,
  useGetListOfUsersQuery,
  useGetTopCitiesQuery,
  useGetAgeGenderPyramidQuery

} = userApiSlice;
