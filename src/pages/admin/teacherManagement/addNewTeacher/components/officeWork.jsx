import ContentWithTitle from "@/components/custom/div";
import ErrorShow from "@/components/custom/errorShow";
import {
  DefaultDatepicker,
  InputWithValidate,
  SelectBoxWithValidate,
} from "@/components/custom/inputs";
import React from "react";

const OfficeWork = ({ Controller, control, errors }) => {
  return (
    <ContentWithTitle title="office Work">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <Controller
            name="joining_date"
            control={control}
            render={({ field }) => (
              <DefaultDatepicker
                label="Joining Date"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.joining_date && (
            <ErrorShow error={errors.joining_date.message} />
          )}
        </div>

        <div className="col-span-6">
          <Controller
            name="teacher_salary"
            control={control}
            render={({ field }) => (
              <InputWithValidate
                type="number"
                label="Teacher Salary"
                placeholder="Teacher Salary"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.teacher_salary && (
            <ErrorShow error={errors.teacher_salary.message} />
          )}
        </div>

        <div className="col-span-6">
          <Controller
            name="job_type"
            control={control}
            render={({ field }) => (
              <InputWithValidate
                type="text"
                label="Job type"
                placeholder="full time /contract/part time"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.job_type && <ErrorShow error={errors.job_type.message} />}
        </div>
        <div className="col-span-6">
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <InputWithValidate
                type="text"
                label="Subject"
                placeholder="english"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.subject && <ErrorShow error={errors.subject.message} />}
        </div>
      </div>
    </ContentWithTitle>
  );
};

export default OfficeWork;
