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

    adminSignIn: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/admin/sign-in`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    signUp: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/sign-up`, 
        method: "POST",
        body: data, 
        credentials: "include", 
      }),
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/verify-email`, 
        method: "POST",
        body: data, 
        credentials: "include", 
      }),
    }),

    signOut: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/sign-out`, 
        method: "POST", 
        credentials: "include", 
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
  useAdminSignInMutation
} = authApiSlice;
