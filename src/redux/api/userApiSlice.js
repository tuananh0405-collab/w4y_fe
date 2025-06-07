import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get user profile
    getUserProfile: builder.query({
      query: () => ({
        url: `${USER_URL}/profile`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    // Update user profile
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/update`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    // Admin: Create new user
    createUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/admin/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    // Admin: Update user
    adminUpdateUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `${USER_URL}/admin/update/${userId}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "User", id: userId },
      ],
    }),

    // Admin: Delete user
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USER_URL}/admin/delete/${userId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    // Admin: Get all users with advanced search
    getAllUsers: builder.query({
      query: (params) => ({
        url: `${USER_URL}/admin/users`,
        method: "GET",
        params: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          search: params?.search,
          accountType: params?.accountType,
          isVerified: params?.isVerified,
          gender: params?.gender,
          city: params?.city,
          district: params?.district,
          startDate: params?.startDate,
          endDate: params?.endDate,
          sortBy: params?.sortBy,
          sortOrder: params?.sortOrder,
        },
        credentials: "include",
      }),
      transformResponse: (response) => ({
        users: response.data.users,
        pagination: response.data.pagination,
        filters: response.data.filters,
        sorting: response.data.sorting,
      }),
      providesTags: ["User"],
    }),

    // Forgot password
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/forgot_password`,
        method: "POST",
        body: data,
      }),
    }),

    // Reset password
    resetPassword: builder.mutation({
      query: ({ token, data }) => ({
        url: `${USER_URL}/reset_password/${token}`,
        method: "POST",
        body: data,
      }),
    }),

    // Get recruiter stats
    getRecruiterStats: builder.query({
      query: () => ({
        url: `${USER_URL}/recruiter/stats`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    // Update recruiter profile
    updateRecruiterProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/recruiter/profile`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useCreateUserMutation,
  useAdminUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetRecruiterStatsQuery,
  useUpdateRecruiterProfileMutation,
} = userApiSlice;
