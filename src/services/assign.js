import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";
export const assignApi = createApi({
  reducerPath: "assignApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    teacherAssignToClassapi: builder.mutation({
      query: (data) => ({
        url: `getclasssubjectshasnoteacher?school_id=${data.school_id}&subject_code_name=${data.subject_code_name}&level_name=${data.level_name}
            `,
        method: "GET",
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
    assignInsertapi: builder.mutation({
      query: (data) => ({
        url: "assignteachertosubjectandclass",
        method: "POST",
        body: data,
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
  }),
});
export const {
  useTeacherAssignToClassapiMutation,
  useAssignInsertapiMutation,
} = assignApi;
