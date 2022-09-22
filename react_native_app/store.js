import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./src/slices/modalSlice";
import workoutReducer from "./src/slices/workoutSlice";
import availableExercisesReducer from "./src/slices/availableExercisesSlice";
import workoutHistoryReducer from "./src/slices/workoutHistorySlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    workout: workoutReducer,
    availableExercises: availableExercisesReducer,
    workoutHistory: workoutHistoryReducer,
  },
});
