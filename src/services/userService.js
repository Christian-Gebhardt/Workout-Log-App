import { api } from "./api";
import { save } from "../util/localStorage";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      async queryFn(body, _queryApi, _extraOptions, baseQuery) {
        const res = await baseQuery({
          url: `/users/login`,
          method: "POST",
          body,
        });

        // store user data in local storage, when login was successful
        if (res.data && res.data.token) {
          await save("user", JSON.stringify(res.data));
          return { data: res.data };
        }

        return res.error.data.message
          ? { error: res.error.data.message }
          : { error: "Undefined error" };
      },
    }),
    createUser: builder.mutation({
      async queryFn(body, _queryApi, _extraOptions, baseQuery) {
        const res = await baseQuery({
          url: `/users/create`,
          method: "POST",
          body,
        });

        // store user data in local storage, when registration was successful
        if (res.data && res.data.token) {
          await save("user", JSON.stringify(res.data));
          return { data: res.data };
        }

        return res.error.data.message
          ? { error: res.error.data.message }
          : { error: "Undefined error" };
      },
    }),
    getUser: builder.query({
      query: () => `/users/me`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserQuery, useLoginUserMutation, useCreateUserMutation } =
  userApi;
