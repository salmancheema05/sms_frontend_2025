import DefaultButton from "@/components/custom/button";
import ContentWithTitle from "@/components/custom/div";
import DynamicTwoFields from "@/components/custom/dynamicInput";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateToken from "@/hooks/createNewToken";
import { useGetAllClassesapiMutation } from "@/services/classes";
import { SelectBoxWithValidate } from "@/components/custom/inputs";
import { useSelector } from "react-redux";
import ErrorShow from "@/components/custom/errorShow";

import { useCreateSubjectapiMutation } from "@/services/subject";
const schema = yup.object().shape({
  class_id: yup.string().required("Class is required"),
  subjects: yup.array().of(
    yup.object().shape({
      subject_name: yup.string().required("Subject name is required"),
      board_or_writer_name: yup
        .string()
        .required("Writer name / Board name is required"),
    })
  ),
});
const AddSubject = () => {
  const { token, refreshToken, school_id } = useSelector(
    (state) => state.persisted?.user_auth
  );
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { createNewToken } = useCreateToken();
  const [getAllClassesapi] = useGetAllClassesapiMutation();
  const [createSubjectapi] = useCreateSubjectapiMutation();
  const [classes, setClasses] = useState([]);
  const getAllClasses = async () => {
    try {
      if (token) {
        const res = await getAllClassesapi({ token: token });
        if (res.data.error) {
          console.log("create new function");
          await createNewToken({
            refreshToken: refreshToken,
            token: token,
          });
        } else {
          const res = await getAllClassesapi({ token: token });

          const updatedClasses = res.data.result.map((item) => ({
            ...item,
            school_class_id: item.school_class_name,
          }));
          setClasses(updatedClasses);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (token) {
        console.log("submit button clicked");
        const class_name = data.class_id;
        const removeGrade = class_name.replace("grade", "").trim();
        let subjectArray = data.subjects.map((item) => ({
          ...item,
          subject_name: item.subject_name + " " + removeGrade,
        }));
        const object = { school_id: school_id, subjects: subjectArray };
        const res = await createSubjectapi({ token: token, object: object });
        if (res.data.error) {
          const result = await createNewToken({
            refreshToken: refreshToken,
          });
          const response = await createSubjectapi({
            token: result.message,
            object: object,
          });
          console.log("new token", token);
          allfieldRest(response);
        } else {
          allfieldRest(res);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const allfieldRest = (result) => {
    if (result.data.error === false) {
      alert(result.data.message);
      reset({
        class_id: "",
        subjects: [{ subject_name: "", board_or_writer_name: "" }], // reset dynamic fields
      });
    }
  };
  useEffect(() => {
    getAllClasses();
  }, [token]);
  return (
    <ContentWithTitle title="Add New Subject">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <div className="col-span-1">
            <Controller
              name="class_id"
              control={control}
              render={({ field }) => (
                <SelectBoxWithValidate
                  label="Choose Class"
                  options={classes}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            {errors.class_id && <ErrorShow error={errors.class_id.message} />}
          </div>
          <Controller
            name="subjects"
            control={control}
            render={({ field }) => (
              <DynamicTwoFields
                title="Subject"
                field1Label="Subject Name"
                field2Label="Writer Name / Board Name"
                field1Placeholder="e.g english"
                field2Placeholder="Writer Name / Board"
                field1Name="subject_name"
                field2Name="board_or_writer_name"
                value={field.value}
                onChange={field.onChange}
                errors={errors.subjects}
              />
            )}
          />
          <div className="mt-10">
            <DefaultButton type="submit" label="Create a Subject" />
          </div>
        </div>
      </form>
    </ContentWithTitle>
  );
};

export default AddSubject;
