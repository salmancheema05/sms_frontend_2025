import ContentWithTitle from "@/components/custom/div";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  DefaultSelectBox,
  SelectBoxWithValidate,
} from "@/components/custom/inputs";
import { useGetAllClassesForSelectboxapiMutation } from "@/services/classes";
import { useSelector } from "react-redux";
import useCreateToken from "@/hooks/createNewToken";
import { useGetSchoolTimeApiMutation } from "@/services/period";
import { useGetSessionByqueryapiMutation } from "@/services/session";
import { useFetchAllSubjectByClassapiMutation } from "@/services/subject";

const schema = yup.object().shape({
  subject_code_id: yup.string().required("Select Subject Code is required"),
});
const CreateClassTable = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      teacher_salary: "",
      job_type: "",
      email: "",
    },
  });
  const navigate = useNavigate();
  const { token, refreshToken, school_id } = useSelector(
    (state) => state.persisted?.user_auth
  );
  const { list } = useSelector((state) => state.persisted?.daysList);
  const [schoolTime, setSchoolTime] = useState(null);
  const [classes, setClasses] = useState([]);
  const [session, setSession] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const { createNewToken } = useCreateToken();
  const [getAllClassesForSelectboxapi] =
    useGetAllClassesForSelectboxapiMutation();
  //   const [getSchoolClassTimeApi] = useGetSchoolClassTimeApiMutation();
  const [getSessionByqueryapi] = useGetSessionByqueryapiMutation();
  const [fetchAllSubjectByClassapi] = useFetchAllSubjectByClassapiMutation();
  const getInstituteClasses = async () => {
    if (token) {
      const res = await getAllClassesForSelectboxapi({
        school_id: school_id,
        token: token,
      });
      if (res.data.error) {
        const newToken = await createNewToken({
          refreshToken: refreshToken,
          token: token,
        });
        const result = await getAllClassesForSelectboxapi({
          school_id: school_id,
          token: newToken.data.message,
        });
        setClasses(result.data.result);
      } else {
        setClasses(res.data.result);
      }
    }
  };
  const handleCallApis = async (data) => {
    // fetchSchoolTime(data);
    fetchSession(data);
    fetchSubject(data);
  };
  const fetchSchoolTime = async (class_id) => {
    try {
      const res = await getSchoolClassTimeApi({
        school_id: school_id,
        class_id: class_id,
        token: token,
      });
      if (res.data.error) {
        const newToken = await createNewToken({
          refreshToken: refreshToken,
          token: token,
        });
        const response = await getSchoolClassTimeApi({
          school_id: school_id,
          class_id: class_id,
          token: newToken.data.message,
        });
        setSchoolTime(response.data.result);
      } else {
        setSchoolTime(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSession = async (class_id) => {
    try {
      const res = await getSessionByqueryapi({
        school_id: school_id,
        class_id: class_id,
        token: token,
      });
      if (res.data.error) {
        const newToken = await createNewToken({
          refreshToken: refreshToken,
          token: token,
        });
        const response = await getSessionByqueryapi({
          school_id: school_id,
          class_id: class_id,
          token: newToken.data.message,
        });
        console.log(response);
        setSession(response.data.result);
      } else {
        setSession(res.data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSubject = async (class_id) => {
    try {
      const res = await fetchAllSubjectByClassapi({
        school_id: school_id,
        class_id: class_id,
        token: token,
      });
      if (res.data.error) {
        const newToken = await createNewToken({
          refreshToken: refreshToken,
          token: token,
        });
        const response = await fetchAllSubjectByClassapi({
          school_id: school_id,
          class_id: class_id,
          token: newToken.data.message,
        });
        setSubjects(response.data.result);
      } else {
        setSubjects(res.data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getInstituteClasses();
  }, []);
  return (
    <>
      <div className=" w-full flex justify-end ">
        <div
          className="bg-blue-950 w-auto px-5 text-center font-bold cursor-pointer p-2 rounded-2xl"
          onClick={() => navigate("/create-period")}
        >
          Create period
        </div>
      </div>
      <ContentWithTitle title="Create Class Time Table">
        <div className="grid grid-cols-12  gap-4 ">
          <div className="col-span-12 md:col-span-6 lg:col-span-9">
            <Controller
              name="choose_Class"
              control={control}
              render={({ field }) => (
                <SelectBoxWithValidate
                  label="Choose Class"
                  options={classes}
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value); // Update form value
                    handleCallApis(value); // Make API call
                  }}
                />
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <div className="mt-10">
              School Time:
              {schoolTime !== null
                ? schoolTime.start_time + " - " + schoolTime.end_time
                : null}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-12">
            <Controller
              name="choose_gender"
              control={control}
              render={({ field }) => (
                <DefaultSelectBox
                  label="Choose Session"
                  options={session}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-12">
            <Controller
              name="choose_gender"
              control={control}
              render={({ field }) => (
                <SelectBoxWithValidate
                  label="Choose Days"
                  options={list}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <Controller
              name="choose_gender"
              control={control}
              render={({ field }) => (
                <SelectBoxWithValidate
                  label="Choose Subject"
                  options={subjects}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <Controller
              name="choose_gender"
              control={control}
              render={({ field }) => (
                <SelectBoxWithValidate
                  label="Choose period"
                  options={[{ id: 1, className: "grade 1" }]}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </ContentWithTitle>
    </>
  );
};

export default CreateClassTable;
