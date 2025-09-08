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
  }),
});
export const { useCreateSubjectapiMutation } = subjectApi;
