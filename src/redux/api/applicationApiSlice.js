import { apiSlice } from "./apiSlice"; // Import apiSlice
import { APPLICATION_URL } from "../constants"; // Đảm bảo bạn có URL API cho ứng viên

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
  }),
});

export const {
  useApplyJobMutation,
  useViewApplicationStatusQuery,
} = applicationApiSlice;
