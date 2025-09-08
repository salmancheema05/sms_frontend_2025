import ContentWithTitle from "@/components/custom/div";
import { InputWithValidate, UploadButton } from "@/components/custom/inputs";
import React from "react";

const StudentBasicInformation = () => {
  const handleFileSelect = (files) => {
    console.log("Selected file(s):", files);
  };
  return (
    <ContentWithTitle title="Student Information">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <InputWithValidate
            label="Student Full Name"
            placeholder="Student Full Name"
          />
        </div>
        <div className="col-span-1">
          <InputWithValidate
            label="Father Full Name"
            placeholder="Father Full Name"
          />
        </div>
        <div className="col-span-1">
          <InputWithValidate label="Gender" placeholder="Gender" />
        </div>
        <div className="col-span-1">
          <InputWithValidate
            label="Student NIC/B Form Number"
            placeholder="Student NIC/B Form Number"
          />
        </div>
        <div className="col-span-1">
          <InputWithValidate
            label="Father NIC Number"
            placeholder="Father NIC Number"
          />
        </div>
        <div className="col-span-1">
          <InputWithValidate
            label="Father Mobile Number"
            placeholder="Father Mobile Number"
          />
        </div>
        <div className="col-span-1">
          <InputWithValidate
            label="Emergency Number"
            placeholder="Emergency Number"
          />
        </div>
        <div className="col-span-1">
          <InputWithValidate
            label="Student Blood Group"
            placeholder="Student Blood Group"
          />
        </div>
        <div className="col-span-1">
          <InputWithValidate
            label="Student Blood Group"
            placeholder="Student Blood Group"
          />
        </div>
        <div className="col-span-1">
          <UploadButton
            label="Choose File"
            onFileSelect={handleFileSelect}
            accept="image/*"
            multiple={true}
          />
        </div>
      </div>
    </ContentWithTitle>
  );
};

export default StudentBasicInformation;
