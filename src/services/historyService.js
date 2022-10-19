import { api } from "./api";

export const historyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCompletedWorkoutsFromHistory: builder.query({
      query: () => "/history/completedWorkouts",
      providesTags: ["CompletedWorkouts"],
    }),
    addCompletedWorkoutToHistory: builder.mutation({
      query: (completedWorkout) => ({
        url: "/history/addCompletedWorkout",
        method: "POST",
        body: completedWorkout,
      }),
      invalidatesTags: ["CompletedWorkouts"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCompletedWorkoutsFromHistoryQuery,
  useAddCompletedWorkoutToHistoryMutation,
} = historyApi;
