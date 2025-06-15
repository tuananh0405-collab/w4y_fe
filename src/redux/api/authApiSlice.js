import { apiSlice } from "./apiSlice";
import { AUTH_URL } from "../constants";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/sign-in`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    signUp: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/sign-up`, // Cập nhật URL cho đăng ký
        method: "POST",
        body: data, // Dữ liệu người dùng gửi khi đăng ký
        credentials: "include", // Giữ cookie nếu cần
      }),
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/verify-email`, // Cập nhật URL cho xác minh email
        method: "POST",
        body: data, // Dữ liệu người dùng gửi khi xác minh email
        credentials: "include", // Giữ cookie nếu cần
      }),
    }),

    signOut: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/sign-out`, // URL cho sign-out
        method: "POST", // Phương thức POST cho đăng xuất
        credentials: "include", // Giữ cookie khi yêu cầu
      }),
    }),

    // Google authentication endpoints
    googleAuth: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/google`,
        method: "GET",
        credentials: "include",
      }),
    }),

    googleCallback: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/google/callback`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useVerifyEmailMutation,
  useSignOutMutation,
  useGoogleAuthMutation,
  useGoogleCallbackMutation,
} = authApiSlice;
