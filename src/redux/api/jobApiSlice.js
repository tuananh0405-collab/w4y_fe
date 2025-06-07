import { apiSlice } from "./apiSlice"; // Import apiSlice
import { JOB_URL } from "../constants"; // Đảm bảo bạn có JOB_URL trong constants.js

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create new job posting
    createJob: builder.mutation({
      query: (data) => ({
        url: `${JOB_URL}/create`, // URL tạo công việc
        url: `${JOB_URL}/create`, // URL tạo công việc
        method: "POST",
        body: data,
        credentials: "include",
        credentials: "include",
      }),
      invalidatesTags: ["Job"],
    }),

    // Lấy danh sách công việc
    // getJobList: builder.query({
    //   query: () => ({
    //     url: `${JOB_URL}/list`,  // URL lấy danh sách công việc
    //     method: "GET",
    //   }),
    // }),
    getJobList: builder.query({
      query: (params) => ({
        url: `${JOB_URL}/list`, // URL lấy danh sách công việc
        method: "GET",
        params: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          search: params?.search,
          priorityLevel: params?.priorityLevel,
          minSalary: params?.minSalary,
          maxSalary: params?.maxSalary,
          experience: params?.experience,
          level: params?.level,
          industry: params?.industry,
          position: params?.position,
          location: params?.location,
          minQuantity: params?.minQuantity,
          maxQuantity: params?.maxQuantity,
          startDate: params?.startDate,
          endDate: params?.endDate,
          sortBy: params?.sortBy,
          sortOrder: params?.sortOrder,
        },
      }),
      providesTags: ["Job"],
    }),

    // Get job detail
    getJobDetail: builder.query({
      query: (jobId) => ({
        url: `${JOB_URL}/detail/${jobId}`, // URL lấy chi tiết công việc
        url: `${JOB_URL}/detail/${jobId}`, // URL lấy chi tiết công việc
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Job", id }],
    }),

    // Update job
    updateJob: builder.mutation({
      query: ({ jobId, data }) => ({
        url: `${JOB_URL}/update/${jobId}`, // URL cập nhật công việc
        url: `${JOB_URL}/update/${jobId}`, // URL cập nhật công việc
        method: "PUT",
        body: data,
        credentials: "include",
        credentials: "include",
      }),
      invalidatesTags: (result, error, { jobId }) => [
        { type: "Job", id: jobId },
      ],
    }),

    // Delete job
    deleteJob: builder.mutation({
      query: (jobId) => ({
        url: `${JOB_URL}/delete/${jobId}`, // URL xóa công việc
        url: `${JOB_URL}/delete/${jobId}`, // URL xóa công việc
        method: "DELETE",
        credentials: "include",
      }),
    }),

    getFilterOptions: builder.query({
      query: () => ({
        url: `${JOB_URL}/get-filter-options`,
        method: "GET",
      }),
    }),

     getJobsByEmployer: builder.query({
      query: (employerId) => ({
        url: `${JOB_URL}/get-by-employer/${employerId}`,
        method: 'GET',
      }),
      invalidatesTags: ["Job"],
    }),

    // Get job statistics
    getJobStatistics: builder.query({
      query: (period) => ({
        url: `${JOB_URL}/statistics`,
        method: "GET",
        params: { period },
        credentials: "include",
      }),
      providesTags: ["Job"],
    }),

    // Get recruitment list (Admin only)
    getRecruitmentList: builder.query({
      query: () => ({
        url: `${JOB_URL}/recruitment-list`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Job"],
    }),

    // Get recruiter details (Admin only)
    getRecruiterDetails: builder.query({
      query: (recruiterId) => ({
        url: `${JOB_URL}/recruiter/${recruiterId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: "Job", id }],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetJobListQuery,
  useGetJobDetailQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetJobStatisticsQuery,
  useGetRecruitmentListQuery,
  useGetRecruiterDetailsQuery,
  useGetFilterOptionsQuery,
  useGetJobsByEmployerQuery
} = jobApiSlice;
