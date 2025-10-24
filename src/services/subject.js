import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";
export const subjectApi = createApi({
  reducerPath: "subjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    createSubjectapi: builder.mutation({
      query: (data) => ({
        url: "createsubject",
        method: "POST",
        body: data.object,
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
    createSubjectCodeapi: builder.mutation({
      query: (data) => ({
        url: "createsubjectcode",
        method: "POST",
        body: data.object,
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
    fetchAllSubjectCodeapi: builder.mutation({
      query: (data) => ({
        url: `fetchallsubjectcode?school_id=${data.school_id}`,
        method: "GET",
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
    fetchAllSubjectByClassapi: builder.mutation({
      query: (data) => ({
        url: `getsubjectsbyclass?school_id=${data.school_id}&institute_class_id=${data.class_id}`,
        method: "GET",
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
  }),
});
export const {
  useCreateSubjectapiMutation,
  useCreateSubjectCodeapiMutation,
  useFetchAllSubjectCodeapiMutation,
  useFetchAllSubjectByClassapiMutation,
} = subjectApi;
