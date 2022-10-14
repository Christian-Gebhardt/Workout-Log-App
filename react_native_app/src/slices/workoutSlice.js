import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  name: "Push Workout",
  notes: "",
  exercises: [],
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setExercises: (state, action) => {
      state.exercises = action.payload;
    },
    addExercises: {
      reducer: (state, action) => {
        action.payload.forEach((e) => state.exercises.push(e));
      },
      prepare: (exercises) => {
        return {
          payload: exercises.map((e) => ({ ...e, id: nanoid() })),
        };
      },
    },
    removeExercise: (state, action) => {
      state.exercises = state.exercises.filter(
        (e) => e.id !== action.payload.id
      );
    },
    addSet: (state, action) => {
      state.exercises
        .find((e) => e.id === action.payload.id)
        .prevSets.push({
          id: nanoid(),
          prevPerformance: "-",
        });
    },
    removeSet: (state, action) => {
      const updateExercise = state.exercises.find(
        (e) => e.id === action.payload.exercise.id
      );
      if (updateExercise) {
        updateExercise.prevSets = updateExercise.prevSets.filter(
          (s) => s.id !== action.payload.set.id
        );
      }
    },
  },
});

export const {
  setName,
  setNotes,
  setExercises,
  addExercises,
  removeExercise,
  addSet,
  removeSet,
} = workoutSlice.actions;

export const selectName = (state) => state.workout.name;
export const selectNotes = (state) => state.workout.notes;
export const selectExercises = (state) => state.workout.exercises;

export default workoutSlice.reducer;
