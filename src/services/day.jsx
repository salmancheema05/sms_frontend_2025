import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";
export const dayApi = createApi({
  reducerPath: "dayApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getAllDaysapi: builder.mutation({
      query: (data) => ({
        url: "getalldays",
        method: "GET",
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
  }),
});
export const { useGetAllDaysapiMutation } = dayApi;
