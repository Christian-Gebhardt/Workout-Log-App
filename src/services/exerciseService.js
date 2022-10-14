import { api } from "./api";

export const exerciseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getExercises: builder.query({
      query: () => "/exercises/",
      providesTags: ["AvailableExercises"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetExercisesQuery } = exerciseApi;
