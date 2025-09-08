import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";
export const bloodGroupListApi = createApi({
  reducerPath: "bloodGroupListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getAllBloodGroupListapi: builder.mutation({
      query: (data) => ({
        url: "fetchallbloodgroup",
        method: "GET",
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
  }),
});
export const { useGetAllBloodGroupListapiMutation } = bloodGroupListApi;
