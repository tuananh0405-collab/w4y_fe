// src/redux/api/mediaS3ApiSlice.js
import { apiSlice } from "./apiSlice";
import { MEDIA_URL } from "../constants"; // ví dụ: '/api/media'

export const mediaS3ApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadMediaFile: builder.mutation({
      query: ({ fileName, fileType }) => ({
        url: `${MEDIA_URL}/presign`,
        method: "POST",
        body: { fileName, fileType },
        credentials: "include",
      }),
    }),
    deleteMediaFile: builder.mutation({
      query: ({ key }) => ({
        url: `${MEDIA_URL}/remove`,
        method: "POST",
        body: { key },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useUploadMediaFileMutation,
  useDeleteMediaFileMutation,
} = mediaS3ApiSlice;