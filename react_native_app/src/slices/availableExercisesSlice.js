import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    _id: nanoid(),
    name: "Bench Press",
    targetMuscle: "Chest",
  },
  {
    _id: nanoid(),
    name: "Pull Up",
    targetMuscle: "Back",
  },
  {
    _id: nanoid(),
    name: "Dead Lift",
    targetMuscle: "Lower Back",
  },
];

const availableExercisesSlice = createSlice({
  name: "availableExercises",
  initialState,
  reducers: {},
});

export const {} = availableExercisesSlice.actions;

export default availableExercisesSlice.reducer;
