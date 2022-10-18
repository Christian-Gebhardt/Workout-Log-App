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
    deleteRoutine: builder.mutation({
      query: ({ routineId }) => ({
        url: `/routines/${routineId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Routines"],
    }),
    addWorkoutToRoutine: builder.mutation({
      query: ({ routineId, workout }) => ({
        url: `/routines/addWorkout/${routineId}`,
        method: "POST",
        body: workout,
      }),
      invalidatesTags: ["Routines"],
    }),
    deleteWorkoutFromRoutine: builder.mutation({
      query: ({ routineId, workoutId }) => ({
        url: `/routines/deleteWorkout/${routineId}/${workoutId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Routines"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRoutinesQuery,
  useAddRoutineMutation,
  useDeleteRoutineMutation,
  useAddWorkoutToRoutineMutation,
  useDeleteWorkoutFromRoutineMutation,
} = routineApi;
