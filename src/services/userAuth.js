import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";

export const userAuthApi = createApi({
  reducerPath: "authapi", // unique key for the API
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    userLoginData: builder.mutation({
      query: (data) => ({
        url: "userLogin",
        method: "POST",
        body: data,
      }),
    }),
    userLogoutapi: builder.mutation({
      query: (data) => ({
        url: "userLogout",
        method: "POST",
        body: data,
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
    createNewTokenapi: builder.mutation({
      query: (data) => ({
        url: "createnewtoken",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useUserLoginDataMutation,
  useUserLogoutapiMutation,
  useCreateNewTokenapiMutation,
} = userAuthApi;
