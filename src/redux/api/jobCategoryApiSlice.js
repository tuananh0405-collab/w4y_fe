import { apiSlice } from "./apiSlice";
import { JOB_CATEGORY_URL } from "../constants";

export const jobCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobCategoriesByParent: builder.query({
      query: ({ parentId }) => ({
        url: `${JOB_CATEGORY_URL}/${parentId}`,
        method: "GET",
      }),
    }),

    getJobCategoriesByRecursive: builder.query({
      query: ({ categoryId }) => ({
        url: `${JOB_CATEGORY_URL}/recursive/${categoryId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetJobCategoriesByParentQuery,
  useGetJobCategoriesByRecursiveQuery,
} = jobCategoryApiSlice;
