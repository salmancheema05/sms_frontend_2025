import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";
export const addTeacherApi = createApi({
  reducerPath: "addTeacherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    addTeacherapi: builder.mutation({
      query: (data) => ({
        url: "addteacher",
        method: "POST",
        body: data.formdata,
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
    viewAllTeacherapi: builder.mutation({
      query: (data) => ({
        url: `fetchallteachers?school_id=${data.school_id}`,
        method: "GET",
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
    getTeacherapi: builder.mutation({
      query: (data) => ({
        url: `getdetialofteacher?school_id=${data.school_id}&school_teacher_id=${data.school_teacher_id}`,
        method: "GET",
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
    getTeacherImage: builder.mutation({
      query: (data) => ({
        url: `protectimage/${
          data.imageendpoint
        }?foldername=${encodeURIComponent(data.foldername)}`,
        method: "GET",
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
        responseHandler: (response) => response.blob(),
      }),
    }),
    teacherINSchooAndFreeapi: builder.mutation({
      query: (data) => ({
        url: `getallteachersatschoolandfree?school_id=${data.school_id}`,
        method: "GET",
        headers: {
          authorizated: `Bearer ${data.token}`,
        },
      }),
    }),
  }),
});
export const {
  useAddTeacherapiMutation,
  useViewAllTeacherapiMutation,
  useGetTeacherapiMutation,
  useGetTeacherImageMutation,
  useTeacherINSchooAndFreeapiMutation,
} = addTeacherApi;
