import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const routineSlice = createSlice({
  name: "routine",
  initialState,
  reducers: {
    setRoutines: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setRoutines } = routineSlice.actions;

export default routineSlice.reducer;
