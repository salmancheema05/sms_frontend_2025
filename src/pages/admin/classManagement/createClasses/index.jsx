import DefaultButton from "@/components/custom/button";
import ContentWithTitle from "@/components/custom/div";
import DynamicField from "@/components/custom/dynamicInput";
import {
  InputWithValidate,
  SelectBoxWithValidate,
} from "@/components/custom/inputs";
import useCreateToken from "@/hooks/createNewToken";
import { useGetAllClassesapiMutation } from "@/services/classes";
import { useGetAllClassGroupapiMutation } from "@/services/classGroup";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import ErrorShow from "@/components/custom/errorShow";
import DynamicTwoFields from "@/components/custom/dynamicInput";
import { useCreateClassapiMutation } from "@/services/createclassapi";

const schema = yup.object().shape({
  class_id: yup.string().required("Class is required"),
  session_id: yup.string().required("Session is required"),
  group_id: yup.string().required("Group is required"),
  subjects: yup.array().of(
    yup.object().shape({
      subject: yup.string().required("Subject name is required"),
      board: yup.string().required("Writer name/Board name is required"),
    })
  ),
});

const CreateClass = () => {
  const sessionList = useSelector((state) => state.persisted?.sessionList.list);
  const { token, refreshToken, school_id, user_id } = useSelector(
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
  const [classes, setClasses] = useState([]);
  const [classGroup, setClassGroup] = useState([]);
  const { createNewToken } = useCreateToken();
  const [getAllClassesapi] = useGetAllClassesapiMutation();
  const [getAllClassGroupapi] = useGetAllClassGroupapiMutation();
  const [createClassapi] = useCreateClassapiMutation();
  const getAllClasses = async () => {
    try {
      if (token) {
        const res = await getAllClassesapi({ token: token });
        if (res.data.error) {
          await createNewToken({
            refreshToken: refreshToken,
            token: token,
          });
        } else {
          const res = await getAllClassesapi({ token: token });
          setClasses(res.data.result);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getAllClassGroup = async () => {
    try {
      if (token) {
        const res = await getAllClassesapi({ token: token });
        if (res.data.error) {
          await createNewToken({
            refreshToken: refreshToken,
            token: token,
          });
        } else {
          const res = await getAllClassGroupapi({ token: token });
          setClassGroup(res.data.result);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  const onSubmit = async (data) => {
    try {
      let obj = {
        ...data,
        school_id,
        creator_id: user_id,
        token: token,
      };
      const res = await createClassapi(obj);

      if (res.data.error) {
        const res = await createNewToken({
          refreshToken: refreshToken,
        });
        obj.token = res.message;
        const result = await createClassapi(obj);
        allfieldRest(result);
      } else {
        allfieldRest(res);
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
        session_id: "",
        group_id: "",
        subjects: [{ subject: "", board: "" }], // reset dynamic fields
      });
    }
  };
  useEffect(() => {
    getAllClasses();
    getAllClassGroup();
  }, [token]);
  return (
    <ContentWithTitle title="Create Class">
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
          <div className="col-span-1">
            <Controller
              name="session_id"
              control={control}
              render={({ field }) => (
                <SelectBoxWithValidate
                  label="Choose Session"
                  options={sessionList}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            {errors.session_id && (
              <ErrorShow error={errors.session_id.message} />
            )}
          </div>
          <div className="col-span-1">
            <Controller
              name="group_id"
              control={control}
              render={({ field }) => (
                <SelectBoxWithValidate
                  label="Choose Group"
                  options={classGroup}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            {errors.group_id && <ErrorShow error={errors.group_id.message} />}
          </div>
          <div className="col-span-1">
            <Controller
              name="subjects"
              control={control}
              render={({ field }) => (
                <DynamicTwoFields
                  title="Subject"
                  field1Label="Subject Name"
                  field1Name="subject"
                  field2Name="board"
                  field1Placeholder="Enter Subject Name"
                  field2Label="Writer Name / Board Name"
                  field2Placeholder="Enter Writer Name / Board"
                  value={field.value}
                  onChange={field.onChange}
                  errors={errors.subjects}
                />
              )}
            />
          </div>
          <DefaultButton type="submit" label="Create a class" />
        </div>
      </form>
    </ContentWithTitle>
  );
};

export default CreateClass;
