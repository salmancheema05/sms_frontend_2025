import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";
export const sessionApi = createApi({
  reducerPath: "sessionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getAllSessionapi: builder.mutation({
      query: (data) => ({
        url: "fetchallSession",
        method: "GET",
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
  }),
});
export const { useGetAllSessionapiMutation } = sessionApi;
