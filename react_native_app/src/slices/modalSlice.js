import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showActiveWorkoutModal: false,
  showWorkoutInfoModal: false,
  showWorkoutEditModal: false,
  showWorkoutMenuModal: false,
  showExerciseAddModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowActiveWorkoutModal: (state, action) => {
      state.showActiveWorkoutModal = action.payload;
    },
    setShowWorkoutInfoModal: (state, action) => {
      state.showWorkoutInfoModal = action.payload;
    },
    setShowWorkoutEditModal: (state, action) => {
      state.showWorkoutEditModal = action.payload;
    },
    setShowWorkoutMenuModal: (state, action) => {
      state.showWorkoutMenuModal = action.payload;
    },
    setShowExerciseAddModal: (state, action) => {
      state.showExerciseAddModal = action.payload;
    },
  },
});

// actions
export const {
  setShowActiveWorkoutModal,
  setShowWorkoutInfoModal,
  setShowWorkoutEditModal,
  setShowWorkoutMenuModal,
  setShowExerciseAddModal,
} = modalSlice.actions;

// selectors
export const selectShowActiveWorkoutModal = (state) =>
  state.modal.showActiveWorkoutModal;
export const selectShowWorkoutInfoModal = (state) =>
  state.modal.showWorkoutInfoModal;
export const selectShowWorkoutEditModal = (state) =>
  state.modal.showWorkoutEditModal;
export const selectShowWorkoutMenuModal = (state) =>
  state.modal.showWorkoutMenuModal;
export const selectShowExerciseAddModal = (state) =>
  state.modal.showExerciseAddModal;

export default modalSlice.reducer;
