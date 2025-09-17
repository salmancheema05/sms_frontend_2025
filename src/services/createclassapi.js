import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";
export const createClassApi = createApi({
  reducerPath: "createClassApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    createClassapi: builder.mutation({
      query: (data) => ({
        url: "createinstituteclass",
        method: "POST",
        body: data,
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
    fetchAllInstituteClassapi: builder.mutation({
      query: ({ token, school_id }) => ({
        url: `fetchallinstituteclasses?school_id=${school_id}`,
        method: "GET",
        headers: {
          authorizated: `Bearer ${token}`,
        },
      }),
    }),
    getAllSubjectOfClassapi: builder.mutation({
      query: ({ token, className, school_id }) => ({
        url: `findallsubjectofclass?subject_name=${className}&school_id=${school_id}`,
        method: "GET",
        headers: {
          authorizated: `Bearer ${token}`,
        },
      }),
    }),
  }),
});
export const {
  useCreateClassapiMutation,
  useFetchAllInstituteClassapiMutation,
  useGetAllSubjectOfClassapiMutation,
} = createClassApi;
