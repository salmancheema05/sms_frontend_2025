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
import MultiSelect from "@/components/custom/multiSelect";
const schema = yup.object().shape({
  institute_class_id: yup
    .array()
    .min(1, "Please select at least one class")
    .required("Classes are required"),
});
const CreateTime = () => {
  const { token, refreshToken, school_id, user_id } = useSelector(
    (state) => state.persisted?.user_auth
  );
  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
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
      //setDisbled(true);
      console.log(data);
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
                <MultiSelect
                  options={classes}
                  placeholder="Select class..."
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
