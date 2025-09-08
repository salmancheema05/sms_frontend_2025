import { UploadAndPreview } from "@/components/custom/admin/uploadPicture";
import ContentWithTitle from "@/components/custom/div";
import DynamicTwoFields from "@/components/custom/dynamicInput";
import ErrorShow from "@/components/custom/errorShow";
import {
  DefaultInput,
  InputWithValidate,
  SelectBoxWithValidate,
} from "@/components/custom/inputs";
import React from "react";
import { useSelector } from "react-redux";

const TeacherInformation = ({
  Controller,
  control,
  errors,
  setFileName,
  preview,
  setPreview,
}) => {
  const genderList = useSelector((state) => state.persisted?.genderList.list);
  const maritalStatus = useSelector(
    (state) => state.persisted?.maritalStatusList.list
  );
  const bloodGroup = useSelector(
    (state) => state.persisted?.bloodGroupList.list
  );
  return (
    <div className="mt-3">
      <ContentWithTitle title="Add New Teacher">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <Controller
              name="teacher_name"
              control={control}
              render={({ field }) => (
                <InputWithValidate
                  label="Teacher Name"
                  placeholder="Teacher Name"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.teacher_name && (
              <ErrorShow error={errors.teacher_name.message} />
            )}
          </div>
          <div className="col-span-1">
            <Controller
              name="spouse"
              control={control}
              render={({ field }) => (
                <InputWithValidate
                  label="Father/husband Name"
                  placeholder="Father/husband Name"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.spouse && <ErrorShow error={errors.spouse.message} />}
          </div>
          <div className="col-span-1">
            <Controller
              name="marital_status"
              control={control}
              render={({ field }) => (
                <SelectBoxWithValidate
                  label="marital Status"
                  options={maritalStatus}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            {errors.marital_status && (
              <ErrorShow error={errors.marital_status.message} />
            )}
          </div>
          <div className="col-span-1">
            <Controller
              name="nic_number"
              control={control}
              render={({ field }) => (
                <InputWithValidate
                  label="Teacher NIC Number"
                  placeholder="Teacher NIC Number"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.nic_number && (
              <ErrorShow error={errors.nic_number.message} />
            )}
          </div>
          <div className="col-span-1">
            <Controller
              name="contact_number"
              control={control}
              render={({ field }) => (
                <InputWithValidate
                  label="Contact Number"
                  placeholder="Contact Number"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.contact_number && (
              <ErrorShow error={errors.contact_number.message} />
            )}
          </div>
          <div className="col-span-1">
            <Controller
              name="choose_gender"
              control={control}
              render={({ field }) => (
                <SelectBoxWithValidate
                  label="Choose Gender"
                  options={genderList}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            {errors.choose_gender && (
              <ErrorShow error={errors.choose_gender.message} />
            )}
          </div>
          <div className="col-span-1">
            <Controller
              name="choose_blood_group"
              control={control}
              render={({ field }) => (
                <SelectBoxWithValidate
                  label="Choose Blood Group"
                  options={bloodGroup}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            {errors.choose_blood_group && (
              <ErrorShow error={errors.choose_blood_group.message} />
            )}
          </div>
          <div className="col-span-1">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <DefaultInput
                  label="Email"
                  placeholder="Email"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.email && <ErrorShow error={errors.email.message} />}
          </div>
          <div className="col-span-1">
            <Controller
              name="current_adress"
              control={control}
              render={({ field }) => (
                <InputWithValidate
                  label="Current Address"
                  placeholder="Current Address"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.current_adresss && (
              <ErrorShow error={errors.current_adresss.message} />
            )}
          </div>
          <div className="col-span-3">
            <UploadAndPreview
              label="Upload Teacher Picture"
              Controller={Controller}
              control={control}
              setFileName={setFileName}
              setPreview={setPreview}
              preview={preview}
            />
          </div>
          <div className="col-span-3 ">
            <Controller
              name="qualification"
              control={control}
              render={({ field }) => (
                <DynamicTwoFields
                  title="Qualification"
                  field1Name="university"
                  field2Name="degree"
                  field1Label="University "
                  field2Label="Degree"
                  field1Placeholder="University"
                  field2Placeholder="Degree"
                  value={field.value} // pass value from RHF
                  onChange={field.onChange} // keep RHF in sync
                  errors={errors.qualification} // show Yup validation
                />
              )}
            />
            {errors.qualification && (
              <ErrorShow error={errors.qualification.message} />
            )}
          </div>
        </div>
      </ContentWithTitle>
    </div>
  );
};

export default TeacherInformation;
