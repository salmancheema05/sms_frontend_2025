import ContentWithTitle from "@/components/custom/div";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorShow from "@/components/custom/errorShow";
import { Controller, useForm } from "react-hook-form";
const schema = yup.object().shape({
  start_time: yup.string().required("Start time is required"),
  end_time: yup.string().required("End time is required"),
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
          <div className="col-span-12"></div>
        </div>
      </form>
    </ContentWithTitle>
  );
};

export default CreateSchoolTime;
