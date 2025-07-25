import { apiSlice } from "./apiSlice"; // Import apiSlice
import { APPLICATION_URL, REVIEW_URL } from "../constants"; // Đảm bảo bạn có URL API cho ứng viên

export const applicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Đăng ký đơn ứng tuyển
    applyJob: builder.mutation({
      query: ({ jobId, formData }) => ({
        url: `${APPLICATION_URL}/apply/${jobId}`, // API để đăng ký ứng tuyển
        method: "POST",
        body: formData, // gửi formData chứa file CV
        headers: {
          //   "Content-Type": "multipart/form-data", // Đảm bảo gửi file qua multipart/form-data
        },
        credentials: "include", // Nếu cần gửi cookie/Authorization header
      }),
    }),

    // Xem trạng thái đơn ứng tuyển
    viewApplicationStatus: builder.query({
      query: (applicationId) => ({
        url: `${APPLICATION_URL}/application/status/${applicationId}`, // API để xem trạng thái đơn ứng tuyển
        method: "GET",
        credentials: "include",
      }),
    }),

    getApplicationsWithInfo: builder.query({
      query: ({ employerId }) => ({
        url: `${APPLICATION_URL}/applications/${employerId}`,
        method: "GET",
      }),
    }),

    updateApplicationStatus: builder.mutation({
      query: ({ applicationId, status }) => ({
        url: `${APPLICATION_URL}/update-status/${applicationId}`,
        method: "PATCH",
        credentials: "include",
        body: { status },
      }),
    }),

    // Tạo review mới
    createReview: builder.mutation({
      query: ({ reviewUserId, rating, comment, jobId }) => ({
        url: `${REVIEW_URL}/create/${reviewUserId}`,
        method: "POST",
        body: { rating, comment, jobId },
        credentials: "include",
      }),
    }),

    // Lấy danh sách review mà user đã nhận
    getUserReviews: builder.query({
      query: (userId) => ({
        url: `${REVIEW_URL}/list/${userId}`,
        method: "GET",
      }),
    }),

    // Lấy danh sách công việc đã ứng tuyển của user
    getAppliedJobs: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `${APPLICATION_URL}/applied-jobs?page=${page}&limit=${limit}&search=${encodeURIComponent(
          search
        )}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getApplicationStatusDistribution: builder.query({
      query: () => ({
        url: `${APPLICATION_URL}/stats/status-distribution`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getApplicationsByJob: builder.query({
      query: ({ limit = 4 } = {}) => ({
        url: `${APPLICATION_URL}/stats/by-job?limit=${limit}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getApplicationsSubmittedOverTime: builder.query({
      query: () => ({
        url: `${APPLICATION_URL}/stats/submitted-over-time`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllApplications: builder.query({
      query: ({
        page = 1,
        limit = 10,
        sortField = "appliedAt",
        sortOrder = "desc",
      } = {}) => ({
        url: `${APPLICATION_URL}/all-applications?page=${page}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useApplyJobMutation,
  useUpdateApplicationStatusMutation,
  useViewApplicationStatusQuery,
  useGetApplicationsWithInfoQuery,
  useCreateReviewMutation,
  useGetUserReviewsQuery,
  useGetAppliedJobsQuery,
  useGetApplicationStatusDistributionQuery,
  useGetApplicationsByJobQuery,
  useGetApplicationsSubmittedOverTimeQuery,
  useGetAllApplicationsQuery,
} = applicationApiSlice;
