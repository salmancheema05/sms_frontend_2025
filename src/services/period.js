import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";
export const periodApi = createApi({
  reducerPath: "periodApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    createSchoolTimeApi: builder.mutation({
      query: (data) => ({
        url: "createschooltime",
        method: "POST",
        body: data,
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
    getSchoolTimeApi: builder.mutation({
      query: (data) => ({
        url: `getschooltimebyquery?school_id=${data.school_id}`,
        method: "GET",
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
  }),
});
export const { useCreateSchoolTimeApiMutation, useGetSchoolTimeApiMutation } =
  periodApi;
