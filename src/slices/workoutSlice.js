import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeWorkout: {
    name: "",
    notes: "",
    exercises: [],
  },
  editWorkout: {
    name: "",
    notes: "",
    exercises: [],
  },
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    // activeWorkout reducers
    setActiveWorkout: (state, action) => {
      state.activeWorkout = action.payload;
    },
    setActiveWorkoutName: (state, action) => {
      state.activeWorkout.name = action.payload;
    },
    setActiveWorkoutNotes: (state, action) => {
      state.activeWorkout.notes = action.payload;
    },
    addActiveWorkoutExercises: (state, action) => {
      action.payload.forEach((e) => state.activeWorkout.exercises.push(e));
    },
    removeActiveWorkoutExercise: (state, action) => {
      state.activeWorkout.exercises = state.activeWorkout.exercises.filter(
        (_, i) => action.payload !== i
      );
    },
    addActiveWorkoutSet: (state, action) => {
      state.activeWorkout.exercises
        .find((_, i) => action.payload === i)
        .sets.push({});
    },
    removeActiveWorkoutSet: (state, action) => {
      const updateExercise = state.activeWorkout.exercises.find(
        (_, i) => action.payload.indexExercise === i
      );
      if (updateExercise) {
        updateExercise.sets = updateExercise.sets.filter(
          (_, i) => action.payload.indexSet === i
        );
      }
    },
    resetActiveWorkout: (state) => {
      state.activeWorkout = initialState.activeWorkout;
    },
    updateActiveWorkoutSet: (state, action) => {
      console.log(action.payload.updateSet);
      const updateExercise = state.activeWorkout.exercises.find(
        (_, i) => action.payload.indexExercise === i
      );
      if (updateExercise) {
        updateExercise.sets = updateExercise.sets.map((e, i) =>
          action.payload.indexSet !== i ? e : action.payload.updateSet
        );
      }
    },
    // editWorkout reducers
    setEditWorkout: (state, action) => {
      state.editWorkout = action.payload;
    },
    setEditWorkoutName: (state, action) => {
      state.editWorkout.name = action.payload;
    },
    setEditWorkoutNotes: (state, action) => {
      state.editWorkout.notes = action.payload;
    },
    addEditWorkoutExercises: (state, action) => {
      action.payload.forEach((e) => state.editWorkout.exercises.push(e));
    },
    removeEditWorkoutExercise: (state, action) => {
      state.editWorkout.exercises = state.editWorkout.exercises.filter(
        (_, i) => action.payload !== i
      );
    },
    addEditWorkoutSet: (state, action) => {
      state.editWorkout.exercises
        .find((_, i) => action.payload === i)
        .sets.push({});
    },
    removeEditWorkoutSet: (state, action) => {
      const updateExercise = state.editWorkout.exercises.find(
        (_, i) => action.payload.indexExercise === i
      );
      if (updateExercise) {
        updateExercise.sets = updateExercise.sets.filter(
          (_, i) => action.payload.indexSet === i
        );
      }
    },
    resetEditWorkout: (state) => {
      state.editWorkout = initialState.editWorkout;
    },
  },
});

export const {
  setActiveWorkout,
  setActiveWorkoutName,
  setActiveWorkoutNotes,
  addActiveWorkoutExercises,
  removeActiveWorkoutExercise,
  addActiveWorkoutSet,
  removeActiveWorkoutSet,
  resetActiveWorkout,
  updateActiveWorkoutSet,
  setEditWorkout,
  setEditWorkoutName,
  setEditWorkoutNotes,
  addEditWorkoutExercises,
  removeEditWorkoutExercise,
  addEditWorkoutSet,
  removeEditWorkoutSet,
  resetEditWorkout,
} = workoutSlice.actions;

export const selectActiveWorkout = (state) => state.workout.activeWorkout;
export const selectEditWorkout = (state) => state.workout.editWorkout;

export default workoutSlice.reducer;
