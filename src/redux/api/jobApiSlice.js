import { apiSlice } from "./apiSlice"; // Import apiSlice
import { JOB_URL } from "../constants"; // Đảm bảo bạn có JOB_URL trong constants.js

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Tạo công việc mới
    createJob: builder.mutation({
      query: (data) => ({
        url: `${JOB_URL}/create`, // URL tạo công việc
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // Lấy danh sách công việc
    // getJobList: builder.query({
    //   query: () => ({
    //     url: `${JOB_URL}/list`,  // URL lấy danh sách công việc
    //     method: "GET",
    //   }),
    // }),
    getJobList: builder.query({
      query: ({ location, position } = {}) => {
        let queryStr = "";
        if (location) queryStr += `location=${location}&`;
        if (position) queryStr += `position=${position}&`;
        return {
          url: `${JOB_URL}?${queryStr}`,
          method: "GET",
        };
      },
    }),

    // Lấy chi tiết công việc
    getJobDetail: builder.query({
      query: (jobId) => ({
        url: `${JOB_URL}/detail/${jobId}`, // URL lấy chi tiết công việc
        method: "GET",
      }),
    }),

    // Cập nhật thông tin công việc
    updateJob: builder.mutation({
      query: ({ jobId, data }) => ({
        url: `${JOB_URL}/update/${jobId}`, // URL cập nhật công việc
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    // Xóa công việc
    deleteJob: builder.mutation({
      query: (jobId) => ({
        url: `${JOB_URL}/delete/${jobId}`, // URL xóa công việc
        method: "DELETE",
        credentials: "include",
      }),
    }),

    getFilterOptions: builder.query({
      query: () => ({
        url: `${JOB_URL}/filter-options`,
        method: "GET",
      }),
    }),

    getJobsByEmployer: builder.query({
      query: (employerId) => ({
        url: `${JOB_URL}/get-by-employer/${employerId}`,
        method: 'GET',
      }),
    }),

    getMonthlyJobStats: builder.query({
      query: (year) => ({
        url: `${JOB_URL}/stats/monthly?year=${year}`,
        method: "GET",
      }),
    }),

    getQuarterlyJobStats: builder.query({
      query: (year) => ({
        url: `${JOB_URL}/stats/quarterly?year=${year}`,
        method: "GET",
      }),
    }),

    getYearlyJobStats: builder.query({
      query: (endYear) => ({
        url: `${JOB_URL}/stats/yearly?endYear=${endYear}`,
        method: "GET",
      }),
    }),

    getJobOverview: builder.query({
      query: () => ({
        url: `${JOB_URL}/overview`,
        method: "GET",
      }),
    }),

  }),
});

export const {
  useCreateJobMutation,
  useGetJobListQuery,
  useGetJobDetailQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetFilterOptionsQuery,
  useGetJobsByEmployerQuery,
  useGetMonthlyJobStatsQuery,
  useGetQuarterlyJobStatsQuery,
  useGetYearlyJobStatsQuery,
  useGetJobOverviewQuery
} = jobApiSlice;
