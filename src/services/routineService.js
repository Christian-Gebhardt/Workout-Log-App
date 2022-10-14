import { api } from "./api";

export const routineApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRoutines: builder.query({
      query: () => "/routines/",
      providesTags: ["Routines"],
    }),
    addRoutine: builder.mutation({
      query: (routine) => ({
        url: "/routines/",
        method: "POST",
        body: routine,
      }),
      invalidatesTags: ["Routines"],
    }),
    addWorkoutToRoutine: builder.mutation({
      query: ({ id, workout }) => ({
        url: `/routines/addWorkout/${id}`,
        method: "PATCH",
        body: workout,
      }),
      invalidatesTags: ["Routines"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRoutinesQuery,
  useAddRoutineMutation,
  useAddWorkoutToRoutineMutation,
} = routineApi;
