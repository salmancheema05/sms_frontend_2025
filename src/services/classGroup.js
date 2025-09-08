import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";
export const classGroupApi = createApi({
  reducerPath: "classGroupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getAllClassGroupapi: builder.mutation({
      query: (data) => ({
        url: "fetchclassgroup",
        method: "GET",
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
  }),
});
export const { useGetAllClassGroupapiMutation } = classGroupApi;
