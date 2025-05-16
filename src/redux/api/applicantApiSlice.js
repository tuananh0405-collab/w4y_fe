import { apiSlice } from "./apiSlice";
import { APPLICANT_URL } from "../constants"; // Đảm bảo bạn có URL API cho ứng viên

export const applicantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadCV: builder.mutation({
      query: (formData) => ({
        url: `${APPLICANT_URL}/upload-cv`, // URL cho API upload CV
        method: "POST",
        body: formData, // formData là dữ liệu bạn gửi, bao gồm file CV
        headers: {
        //   "Content-Type": "multipart/form-data", // Đảm bảo Content-Type đúng cho việc upload file
        },
        credentials:'include'
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${APPLICANT_URL}/profile`, // URL để lấy thông tin profile của ứng viên
        method: "GET",
      }),
    }),
  }),
});

export const { useUploadCVMutation, useGetProfileQuery } = applicantApiSlice;
