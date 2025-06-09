import { apiSlice } from "./apiSlice";
import { APPLICANT_URL, APPLICATION_URL, USER_URL } from "../constants"; // Đảm bảo bạn có URL API cho ứng viên

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
      invalidatesTags: ["UploadedCVs"], // Invalidates the cache for uploaded CVs
    }),

    getUploadedCVs: builder.query({
      query: () => ({
        url: `${APPLICANT_URL}/get-uploaded-cvs`, // URL để lấy danh sách CV đã tải lên
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["UploadedCVs"],
    }),

    deleteUploadedCV: builder.mutation({
      query: (cvId) => ({
        url: `${APPLICANT_URL}/uploaded-cv/${cvId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["UploadedCVs"], // Invalidates the cache for uploaded CVs after deletion
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${APPLICANT_URL}/profile`, // URL để lấy thông tin profile của ứng viên
        method: "GET",
      }),
    }),
    uploadAvatar: builder.mutation({
      query: (formData) => ({
        url: `${USER_URL}/upload_avatar`, // URL cho API upload avatar
        method: "POST",
        body: formData, 
        headers: {
        },
        credentials: "include",
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

    countApplications: builder.query({
      query: () => ({
        url: `${APPLICANT_URL}/count`,
        method: "GET",
        credentials: "include", // nếu cần gửi cookie/token
      }),
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: `${USER_URL}/forgot_password`, // API backend của bạn
        method: "POST",
        body: { email },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `${USER_URL}/reset_password/${token}`, // token truyền trong URL params
        method: "POST", // hoặc PATCH tùy backend, bạn backend dùng POST hoặc PATCH thì thay đổi
        body: { password },
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

 searchApplicants: builder.query({
      query: (filters) => ({
        url: `${APPLICANT_URL}/search`, // URL cho API tìm kiếm ứng viên
        method: "GET",
        params: filters, // Filters sẽ là đối tượng chứa các tham số tìm kiếm
        credentials: "include",
      }),
    }),

  }),
});

export const {
  useUploadCVMutation,
  useGetProfileQuery,
  useGetApplicantProfileQuery,
  useUpdateUserProfileMutation,
  useCountApplicationsQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
    useSearchApplicantsQuery,
  useUploadAvatarMutation,
  useGetUploadedCVsQuery,
  useDeleteUploadedCVMutation,
} = applicantApiSlice;
