import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    name: "Push Workout",
    notes: "",
    exercises: [
      {
        id: nanoid(),
        name: "Bench Press",
        prevSets: [
          {
            id: nanoid(),
            prevPerformance: "5 x 80kg",
          },
          {
            id: nanoid(),
            prevPerformance: "5 x 80kg",
          },
        ],
      },
      {
        id: nanoid(),
        name: "Pull Up",
        prevSets: [
          {
            id: nanoid(),
            prevPerformance: "12",
          },
          {
            id: nanoid(),
            prevPerformance: "10",
          },
        ],
      },
    ],
  },
  {
    name: "Pull Workout",
    notes: "",
    exercises: [
      {
        id: nanoid(),
        name: "Bench Press",
        prevSets: [
          {
            id: nanoid(),
            prevPerformance: "5 x 80kg",
          },
          {
            id: nanoid(),
            prevPerformance: "5 x 80kg",
          },
        ],
      },
      {
        id: nanoid(),
        name: "Pull Up",
        prevSets: [
          {
            id: nanoid(),
            prevPerformance: "12",
          },
          {
            id: nanoid(),
            prevPerformance: "10",
          },
        ],
      },
    ],
  },
];

const workoutHistorySlice = createSlice({
  name: "workoutHistory",
  initialState,
  reducers: {},
});

export const {} = workoutHistorySlice.actions;

export default workoutHistorySlice.reducer;
