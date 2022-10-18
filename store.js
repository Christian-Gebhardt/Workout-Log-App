import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import modalReducer from "./src/slices/modalSlice";
import workoutReducer from "./src/slices/workoutSlice";
import workoutHistoryReducer from "./src/slices/workoutHistorySlice";
import userReducer from "./src/slices/userSlice";
import { api } from "./src/services/api";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
    workout: workoutReducer,
    workoutHistory: workoutHistoryReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
