import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@env";
import { getValue } from "../util/localStorage";

// initialize an empty api service that we'll inject endpoints into later as needed
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + "/api",
    prepareHeaders: (headers, { getState }) => {
      const user = getState().user.user;

      // set auth token in header if user has one
      if (user && user.token) {
        headers.set("authorization", `Bearer ${user.token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Routines", "AvailableExercises"],
  credentials: "include", // This allows server to set cookies
  endpoints: () => ({}),
});
