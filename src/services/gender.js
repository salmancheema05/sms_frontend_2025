import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";
export const genderApi = createApi({
  reducerPath: "genderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getAllGenderapi: builder.query({
      query: () => "fetchallgender",
    }),
  }),
});
export const { useGetAllGenderapiQuery } = genderApi;
