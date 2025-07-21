import { apiSlice } from "./apiSlice";
import { JOB_SKILL_URL } from "../constants";

export const jobSkillApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobSkills: builder.query({
      query: ({ name, page = 1, limit = 10 }) => ({
        url: JOB_SKILL_URL,
        params: { name, page, limit },
      }),
      providesTags: ["JobSkill"],
    }),

    getJobSkillsByIds: builder.query({
      query: ({ ids }) => ({
        url: `${JOB_SKILL_URL}/by-ids`,
        method: "POST",
        body: { ids },
      }),
      providesTags: ["UsersJobSkill"],
    }),

    createJobSkill: builder.mutation({
      query: (data) => ({
        url: JOB_SKILL_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["JobSkill"],
    }),
  }),
});

export const {
  useGetJobSkillsQuery,
  useCreateJobSkillMutation,
  useGetJobSkillsByIdsQuery,
} = jobSkillApiSlice;
