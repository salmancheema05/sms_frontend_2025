import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";
export const maritalStatusApi = createApi({
  reducerPath: "maritalStatusApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getAllMaritalListapi: builder.mutation({
      query: (data) => ({
        url: "fetchAllMaritalStatus",
        method: "GET",
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
  }),
});
export const { useGetAllMaritalListapiMutation } = maritalStatusApi;
