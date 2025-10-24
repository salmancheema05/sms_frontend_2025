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
import { useSchoolClassTimeApiMutation } from "@/services/period";
import AlertModel from "@/components/custom/admin/modal/alertModel";
const schema = yup.object().shape({
  institute_class_id: yup.string().required(" Class is required"),
  start_time: yup.string().required("Start time is required"),
  end_time: yup.string().required("End time is required"),
});
const CreateTime = () => {
  const { token, refreshToken, school_id, user_id } = useSelector(
    (state) => state.persisted?.user_auth
  );
  const [classes, setClasses] = useState([]);
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
      start_time: "",
      end_time: "",
    },
  });
  const [getAllClassesForSelectboxapi] =
    useGetAllClassesForSelectboxapiMutation();
  const [schoolClassTimeApi] = useSchoolClassTimeApiMutation();
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
  const onSubmit = async (data) => {
    try {
      setDisbled(true);
      const obj = {
        ...data,
        school_id: school_id,
        creator_id: user_id,
      };
      const res = await schoolClassTimeApi({ object: obj, token: token });
      if (res.data.error) {
        console.log("create new token");
        const response = await createNewToken({
          refreshToken: refreshToken,
          token: token,
        });
        const newToken = response.data.message;
        const saveData = await schoolClassTimeApi({
          object: obj,
          token: newToken,
        });
        setAlertMessage(saveData.data.message);
        reset({
          institute_class_id: "",
          start_time: "",
          end_time: "",
        });
        setAlertModelOpen(true);
        setDisbled(false);
      } else {
        console.log("old token");
        setAlertMessage(saveData.data.message);
        setAlertModelOpen(true);
        reset({
          institute_class_id: "",
          start_time: "",
          end_time: "",
        });
        setDisbled(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchAllClasses();
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
          <div className="col-span-12">
            <Controller
              name="institute_class_id"
              control={control}
              render={({ field }) => (
                <SelectBoxWithValidate
                  label="Select Class"
                  options={classes}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            {errors.institute_class_id && (
              <ErrorShow error={errors.institute_class_id.message} />
            )}
          </div>
          <div className="col-span-12">
            <Controller
              name="start_time"
              control={control}
              render={({ field }) => (
                <InputWithValidate
                  type="time"
                  label="School Start Time"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.start_time && (
              <ErrorShow error={errors.start_time.message} />
            )}
          </div>
          <div className="col-span-12">
            <Controller
              name="end_time"
              control={control}
              render={({ field }) => (
                <InputWithValidate
                  type="time"
                  label="School End Time"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.end_time && <ErrorShow error={errors.end_time.message} />}
          </div>
          <div className="col-span-12">
            <DefaultButton
              type="submit"
              disabledData={disabled}
              label="Create time"
            />
          </div>
        </div>
      </form>
    </ContentWithTitle>
  );
};

export default CreateTime;
