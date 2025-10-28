import ContentWithTitle from "@/components/custom/div";
import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorShow from "@/components/custom/errorShow";
import { Controller, useForm } from "react-hook-form";
import { InputWithValidate } from "@/components/custom/inputs";
import DefaultButton from "@/components/custom/button";
import { useCreateSchoolTimeApiMutation } from "@/services/period";
import { useSelector } from "react-redux";
import useCreateToken from "@/hooks/createNewToken";
import AlertModel from "@/components/custom/admin/modal/alertModel";
const schema = yup.object().shape({
  start_time: yup.string().required("Start time is required"),
  end_time: yup
    .string()
    .required("End time is required")
    .test("is-greater", "End time must be after start time", function (value) {
      const { start_time } = this.parent;
      if (!start_time || !value) return true; // skip check if one missing
      return value > start_time; // compare as string (works for HH:mm format)
    }),
});
const CreateSchoolTime = () => {
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
    defaultValues: {
      start_time: "",
      end_time: "",
    },
  });
  const [createSchoolTimeApi] = useCreateSchoolTimeApiMutation();
  const { createNewToken } = useCreateToken();
  const [disabled, setDisbled] = useState(false);
  const [alertModel, setAlertModel] = useState(false);
  const [alertMessage, sertAlertMessage] = useState(true);
  const onSubmit = async (data) => {
    try {
      setDisbled(true);
      const obj = {
        ...data,
        school_id: school_id,
        creator_id: user_id,
        token: token,
      };
      const res = await createSchoolTimeApi(obj);

      if (res.data.error) {
        const res = await createNewToken({
          refreshToken: refreshToken,
          token: token,
        });
        obj.token = res.data.message;
        const response = await createSchoolTimeApi(obj);
        sertAlertMessage(response.data.message);
        setAlertModel(true);
        setDisbled(false);
        reset({
          start_time: "",
          end_time: "",
        });
      } else {
        sertAlertMessage(res.data.message);
        setAlertModel(true);
        setDisbled(false);
        reset({
          start_time: "",
          end_time: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <AlertModel
        setAlertModel={setAlertModel}
        title={"Insert Data"}
        show={alertModel}
        showOk={true}
        onCancel={() => setAlertModel(false)}
        description={alertMessage}
      />
      <ContentWithTitle title="Create School time">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4">
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
                    label="School End time"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.end_time && <ErrorShow error={errors.end_time.message} />}
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
    </>
  );
};

export default CreateSchoolTime;
