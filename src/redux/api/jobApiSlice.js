import { apiSlice } from "./apiSlice"; // Import apiSlice
import { JOB_URL } from "../constants"; // Đảm bảo bạn có JOB_URL trong constants.js

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Tạo công việc mới
    createJob: builder.mutation({
      query: (data) => ({
        url: `${JOB_URL}/create`,  // URL tạo công việc
        method: "POST",
        body: data,
        credentials:'include'
      }),
    }),

    // Lấy danh sách công việc
    getJobList: builder.query({
      query: () => ({
        url: `${JOB_URL}/list`,  // URL lấy danh sách công việc
        method: "GET",
      }),
    }),

    // Lấy chi tiết công việc
    getJobDetail: builder.query({
      query: (jobId) => ({
        url: `${JOB_URL}/detail/${jobId}`,  // URL lấy chi tiết công việc
        method: "GET",
      }),
    }),

    // Cập nhật thông tin công việc
    updateJob: builder.mutation({
      query: ({ jobId, data }) => ({
        url: `${JOB_URL}/update/${jobId}`,  // URL cập nhật công việc
        method: "PUT",
        body: data,
        credentials:'include'
      }),
    }),

    // Xóa công việc
    deleteJob: builder.mutation({
      query: (jobId) => ({
        url: `${JOB_URL}/delete/${jobId}`,  // URL xóa công việc
        method: "DELETE",
        credentials:'include'
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
} = jobApiSlice;
