import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";
export const periodApi = createApi({
  reducerPath: "periodApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    schoolClassTimeApi: builder.mutation({
      query: (data) => ({
        url: "createschooltime",
        method: "POST",
        body: data.object,
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
    getSchoolClassTimeApi: builder.mutation({
      query: (data) => ({
        url: `getschooltimebyquery?school_id=${data.school_id}&institute_class_id=${data.class_id}`,
        method: "GET",
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
  }),
});
export const {
  useSchoolClassTimeApiMutation,
  useGetSchoolClassTimeApiMutation,
} = periodApi;
