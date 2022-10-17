import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeWorkoutModal: { show: false },
  workoutInfoModal: { show: false, workout: null },
  workoutEditModal: { show: false, routineId: null },
  exerciseAddModal: { show: false },
  routineEditModal: { show: false },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowActiveWorkoutModal: (state, action) => {
      state.activeWorkoutModal.show = action.payload;
    },
    setShowWorkoutInfoModal: (state, action) => {
      state.workoutInfoModal.show = action.payload;
    },
    setShowWorkoutEditModal: (state, action) => {
      state.workoutEditModal.show = action.payload;
    },
    setShowExerciseAddModal: (state, action) => {
      state.exerciseAddModal.show = action.payload;
    },
    setShowRoutineEditModal: (state, action) => {
      state.routineEditModal.show = action.payload;
    },
    setWorkoutEditModalRoutineId: (state, action) => {
      state.workoutEditModal.routineId = action.payload;
    },
    setWorkoutInfoModalWorkout: (state, action) => {
      state.workoutInfoModal.workout = action.payload;
    },
  },
});

// actions
export const {
  setShowActiveWorkoutModal,
  setShowWorkoutInfoModal,
  setShowWorkoutEditModal,
  setShowExerciseAddModal,
  setShowRoutineEditModal,
  setWorkoutEditModalRoutineId,
  setWorkoutInfoModalWorkout,
} = modalSlice.actions;

// selectors
export const selectShowActiveWorkoutModal = (state) =>
  state.modal.activeWorkoutModal.show;
export const selectShowWorkoutInfoModal = (state) =>
  state.modal.workoutInfoModal.show;
export const selectShowWorkoutEditModal = (state) =>
  state.modal.workoutEditModal.show;
export const selectShowExerciseAddModal = (state) =>
  state.modal.exerciseAddModal.show;
export const selectShowRoutineEditModal = (state) =>
  state.modal.routineEditModal.show;
export const selectWorkoutEditModalRoutineId = (state) =>
  state.modal.workoutEditModal.routineId;
export const selectWorkoutInfoModalWorkout = (state) =>
  state.modal.workoutInfoModal.workout;

export default modalSlice.reducer;
