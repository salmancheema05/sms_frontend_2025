import DefaultButton from "@/components/custom/button";
import ContentWithTitle from "@/components/custom/div";
import { InputWithValidate } from "@/components/custom/inputs";
import React, { useState } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorShow from "@/components/custom/errorShow";
import { useSelector } from "react-redux";
import { useCreateSubjectCodeapiMutation } from "@/services/subject";
import useCreateToken from "@/hooks/createNewToken";
import { Result } from "postcss";
const schema = yup.object().shape({
  subject_code_name: yup.string().required("Subject Code is required"),
});
const CreateSubjectCode = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { token, refreshToken, school_id } = useSelector(
    (state) => state.persisted?.user_auth
  );
  const [disabled, setDisbled] = useState(false);
  const { createNewToken } = useCreateToken();
  const [createSubjectCodeapi] = useCreateSubjectCodeapiMutation();
  const onSubmit = async (data) => {
    data.school_id = school_id;
    if (token) {
      const res = await createSubjectCodeapi({ object: data, token: token });
      setDisbled(true);
      if (res.data.error) {
        console.log("create new token");
        const result = await createNewToken({
          refreshToken: refreshToken,
          token: token,
        });
        const response = await createSubjectCodeapi({
          object: data,
          token: result.data.message,
        });
        alert(response.data.message);
        reset({
          subject_code_name: "",
        });
        setDisbled(false);
      } else {
        alert(res.data.message);
        reset({
          subject_code_name: "",
        });
        setDisbled(false);
      }
    }
  };
  return (
    <ContentWithTitle title="Create Subject Code">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Controller
              name="subject_code_name"
              control={control}
              render={({ field }) => (
                <InputWithValidate
                  label="Subject Code"
                  placeholder="eng"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.subject_code && (
              <ErrorShow error={errors.subject_code.message} />
            )}
          </div>
        </div>
        <div className="mt-10">
          <DefaultButton
            type="submit"
            disabledData={disabled}
            label="Create  Subject code"
          />
        </div>
      </form>
    </ContentWithTitle>
  );
};

export default CreateSubjectCode;
