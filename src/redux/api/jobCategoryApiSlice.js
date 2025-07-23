import { apiSlice } from "./apiSlice";
import { JOB_CATEGORY_URL } from "../constants";

export const jobCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobCategoriesByParent: builder.query({
      query: ({ parentId }) => ({
        url: `${JOB_CATEGORY_URL}/${parentId}`,
        method: "GET",
      }),
      providesTags: ["JobCategory"],
      keepUnusedDataFor: 10, // Remove cache after 10 secs of component unmounting
    }),

    getJobCategoriesByRecursive: builder.query({
      query: ({ categoryId }) => ({
        url: `${JOB_CATEGORY_URL}/recursive/${categoryId}`,
        method: "GET",
      }),
      invalidatesTags: ["JobCategory"],
    }),
  }),
});

export const {
  useGetJobCategoriesByParentQuery,
  useGetJobCategoriesByRecursiveQuery,
} = jobCategoryApiSlice;
