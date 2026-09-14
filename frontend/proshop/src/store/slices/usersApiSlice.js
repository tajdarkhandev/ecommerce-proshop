import { USERS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/login`,
          method: "POST",
          body: data,
        }),
        // transformResponse: function (data) {
        //   return data?.products;
        // },
      }),

      register: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/register`,
          method: "POST",
          body: data,
        }),
      }),

      logout: builder.mutation({
        query: () => ({
          url: `.${USERS_URL}/logout`,
          method: "POST",
        }),
      }),
    };
  },
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  usersApiSlice;
