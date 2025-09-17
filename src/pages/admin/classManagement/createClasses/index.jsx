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
import { Link } from "react-router-dom";
import {
  useCreateClassapiMutation,
  useGetAllSubjectOfClassapiMutation,
} from "@/services/createclassapi";

const schema = yup.object().shape({
  class_id: yup.string().required("Class is required"),
  session_id: yup.string().required("Session is required"),
  group_id: yup.string().required("Group is required"),
  level: yup.string().required("level is required"),
});

const CreateClass = () => {
  const sessionList = useSelector((state) => state.persisted?.sessionList.list);
  const { token, refreshToken, school_id, user_id } = useSelector(
    (state) => state.persisted?.user_auth
  );
  const levelList = useSelector((state) => state.persisted?.levelList.list);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [disabled, setDisbled] = useState(false);
  const [classes, setClasses] = useState([]);
  const [classGroup, setClassGroup] = useState([]);
  const [subject, setsubject] = useState(null);
  const { createNewToken } = useCreateToken();
  const [getAllClassesapi] = useGetAllClassesapiMutation();
  const [getAllClassGroupapi] = useGetAllClassGroupapiMutation();
  const [createClassapi] = useCreateClassapiMutation();
  const [getAllSubjectOfClassapi] = useGetAllSubjectOfClassapiMutation();
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
      const subjectIds = subject.map((subject) => subject.subject_id);
      if (subject.length == 0) {
        alert("first create subject for class");
      } else {
        let obj = {
          ...data,
          school_id,
          creator_id: user_id,
          token: token,
          subjects: subjectIds,
        };
        setDisbled(true);
        const res = await createClassapi(obj);

        if (res.data.error) {
          const res = await createNewToken({
            refreshToken: refreshToken,
            token: token,
          });
          obj.token = res.data.message;
          const result = await createClassapi(obj);
          allfieldRest(result);
          setsubject(null);
          setDisbled(false);
        } else {
          allfieldRest(res);
          setsubject(null);
          setDisbled(false);
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
        session_id: "",
        group_id: "",
      });
    }
  };
  const handleClassSelection = async (data) => {
    if (token) {
      const classID = data;
      const findClass = classes.find((item) => item.school_class_id == classID);
      const className = findClass.school_class_name;
      const getClassNo = className.replace("grade", "");
      const object = {
        className: getClassNo,
        school_id: school_id,
        token: token,
      };
      const res = await getAllSubjectOfClassapi(object);
      if (res.data.error) {
        const response = await createNewToken({
          refreshToken: refreshToken,
          token: token,
        });
        object.token = response.data.message;
        const result = await getAllSubjectOfClassapi(object);
        console.log(result.data.result);
        setsubject(result.data.result);
      } else {
        setsubject(res.data.result);
      }
    }
  };
  useEffect(() => {
    getAllClasses();
    getAllClassGroup();
  }, [token]);
  return (
    <ContentWithTitle title="Create Class">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Controller
              name="class_id"
              control={control}
              render={({ field }) => (
                <SelectBoxWithValidate
                  label="Choose Class"
                  options={classes}
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value); // Update form value
                    handleClassSelection(value); // Make API call
                  }}
                />
              )}
            />
            {errors.class_id && <ErrorShow error={errors.class_id.message} />}
          </div>
          <div className="col-span-12">
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
          <div className="col-span-12">
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
          <div className="col-span-12">
            <Controller
              name="level"
              control={control}
              render={({ field }) => (
                <SelectBoxWithValidate
                  label="Choose level"
                  options={levelList}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            {errors.level && <ErrorShow error={errors.level.message} />}
          </div>
          <div className="col-span-12 space-y-2">
            {subject?.map((item) => (
              <div
                key={item.school_class_id}
                className="p-3 bg-sidebar-accent rounded-lg border border-gray-200 shadow-sm flex justify-between items-center"
              >
                <span className="font-medium text-primary-text">Subject</span>
                <span className="text-primary-text">{item.subject_name}</span>
              </div>
            ))}
            {subject !== null && subject.length === 0 && (
              <div className="p-3 text-center bg-sidebar-accent rounded-lg border border-gray-200 shadow-sm flex justify-between items-center">
                <Link to="/add-subject" className="text-primary-text underline">
                  first create of subject
                </Link>
              </div>
            )}
          </div>
          <div className="col-span-12 space-y-2">
            <DefaultButton
              type="submit"
              disabled={disabled}
              disabledData={disabled}
              label="Create a class"
            />
          </div>
        </div>
      </form>
    </ContentWithTitle>
  );
};

export default CreateClass;
