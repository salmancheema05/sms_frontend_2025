import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";
export const classesApi = createApi({
  reducerPath: "classesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getAllClassesapi: builder.mutation({
      query: (data) => ({
        url: "fetchallclasses",
        method: "GET",
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
    getAllClassesForSelectboxapi: builder.mutation({
      query: (data) => ({
        url: `fetchallclssesforselectbox?school_id=${data.school_id}`,
        method: "GET",
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
  }),
});
export const {
  useGetAllClassesapiMutation,
  useGetAllClassesForSelectboxapiMutation,
} = classesApi;
