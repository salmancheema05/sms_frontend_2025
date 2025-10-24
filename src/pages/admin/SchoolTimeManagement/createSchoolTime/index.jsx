import ContentWithTitle from "@/components/custom/div";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorShow from "@/components/custom/errorShow";
import { Controller, useForm } from "react-hook-form";
import { InputWithValidate } from "@/components/custom/inputs";
const schema = yup.object().shape({
  start_time: yup.string().required("Start time is required"),
  off_time: yup.string().required("off time is required"),
});
const CreateSchoolTime = () => {
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
  return (
    <ContentWithTitle title="Create School time">
      <form action="">
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
              name="off_time"
              control={control}
              render={({ field }) => (
                <InputWithValidate
                  type="time"
                  label="School Off Time"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.end_time && <ErrorShow error={errors.end_time.message} />}
          </div>
        </div>
      </form>
    </ContentWithTitle>
  );
};

export default CreateSchoolTime;
