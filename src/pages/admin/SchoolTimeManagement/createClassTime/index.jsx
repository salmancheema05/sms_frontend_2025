import ContentWithTitle from "@/components/custom/div";
import {
  InputWithValidate,
  SelectBoxWithValidate,
} from "@/components/custom/inputs";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorShow from "@/components/custom/errorShow";
import DefaultButton from "@/components/custom/button";
import { useGetAllClassesForSelectboxapiMutation } from "@/services/classes";
import { useSelector } from "react-redux";
import useCreateToken from "@/hooks/createNewToken";
import AlertModel from "@/components/custom/admin/modal/alertModel";
import MultiSelect from "@/components/custom/multiSelect";
import { useGetSchoolTimeApiMutation } from "@/services/period";
import { useTimeAssignToClassesapiMutation } from "@/services/assign";
const schema = yup.object().shape({
  school_time_id: yup.string().required("Select School time is required"),
  institute_class_id: yup
    .array()
    .min(1, "Please select at least one class")
    .required("Classes are required"),
});
const CreateTime = () => {
  const { token, refreshToken, school_id, user_id } = useSelector(
    (state) => state.persisted?.user_auth
  );
  const [schoolTime, setSchoolTime] = useState(null);
  const [classes, setClasses] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const { createNewToken } = useCreateToken();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      institute_class_id: "",
    },
  });
  const [getSchoolTimeApi] = useGetSchoolTimeApiMutation();

  const [getAllClassesForSelectboxapi] =
    useGetAllClassesForSelectboxapiMutation();
  const [timeAssignToClassesapi] = useTimeAssignToClassesapiMutation();
  const [disabled, setDisbled] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertModelOpen, setAlertModelOpen] = useState(false);
  const fetchAllClasses = async () => {
    try {
      const obj = { school_id: school_id, token: token };
      const res = await getAllClassesForSelectboxapi(obj);
      if (res.data.status == 400) {
        console.error(res.data.message);
      } else if (res.data.error) {
        await createNewToken({
          refreshToken: refreshToken,
          token: token,
        });
      } else {
        setClasses(res.data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSchoolTime = async () => {
    try {
      const res = await getSchoolTimeApi({
        school_id: school_id,
        token: token,
      });
      if (res.data.error) {
        const newToken = await createNewToken({
          refreshToken: refreshToken,
          token: token,
        });
        const response = await getSchoolTimeApi({
          school_id: school_id,
          token: newToken.data.message,
        });
        setSchoolTime([response.data.result]);
      } else {
        setSchoolTime([res.data.result]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data) => {
    try {
      setDisbled(true);

      const obj = {
        ...data,
        school_id,
        creator_id: user_id,
        token,
      };

      let res = await timeAssignToClassesapi(obj);

      // If token expired or error, refresh and retry
      if (res.data.error) {
        const newToken = await createNewToken({
          refreshToken,
          token,
        });
        obj.token = newToken.data.message;
        res = await timeAssignToClassesapi(obj);
      }

      // Common response handling
      if (res.data.status === 400) {
        console.error(res.data.message);
      }

      setAlertMessage(res.data.message);
      setAlertModelOpen(true);
      setDisbled(false);
      setAllSelected(false);
      reset({
        school_time_id: "",
        institute_class_id: [],
      });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchAllClasses();
    fetchSchoolTime();
  }, [token]);
  return (
    <ContentWithTitle title="Create School Classes Time">
      <AlertModel
        // setAlertModel={setAlertModel}
        title="Created Data"
        show={alertModelOpen}
        showConfirmButton={false}
        showOk={true}
        onCancel={() => setAlertModelOpen(false)}
        description={alertMessage}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 space-y-2">
            <Controller
              name="school_time_id"
              control={control}
              render={({ field }) => (
                <SelectBoxWithValidate
                  label="Select School Time"
                  options={schoolTime}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            {errors.school_time_id && (
              <ErrorShow error={errors.school_time_id.message} />
            )}
          </div>
          <div className="col-span-12">
            <Controller
              name="institute_class_id"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={classes}
                  placeholder="Select class..."
                  allSelected={allSelected}
                  setAllSelected={setAllSelected}
                  value={field.value}
                  onValueChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
            {errors.institute_class_id && (
              <ErrorShow error={errors.institute_class_id.message} />
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

export default CreateTime;
