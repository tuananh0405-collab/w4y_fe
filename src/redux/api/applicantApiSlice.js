import { apiSlice } from "./apiSlice";
import { APPLICANT_URL, USER_URL } from "../constants"; // Đảm bảo bạn có URL API cho ứng viên

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
        credentials: "include",
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${APPLICANT_URL}/profile`, // URL để lấy thông tin profile của ứng viên
        method: "GET",
      }),
    }),

    getApplicantProfile: builder.query({
      query: () => ({
        url: `${USER_URL}/profile`,
        method: "GET",
        credentials: "include",
      }),
    }),

    // Thêm mutation cập nhật profile
    updateUserProfile: builder.mutation({
      query: (profileData) => ({
        url: `${USER_URL}/profile`,
        method: "PATCH",
        body: profileData,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // Tự động refetch getApplicantProfile để cập nhật cache sau khi update
      invalidatesTags: [{ type: "ApplicantProfile", id: "LIST" }],
    }),
  }),
});

export const {
  useUploadCVMutation,
  useGetProfileQuery,
  useGetApplicantProfileQuery,useUpdateUserProfileMutation
} = applicantApiSlice;
