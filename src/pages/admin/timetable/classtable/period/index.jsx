import ContentWithTitle from "@/components/custom/div";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
const CreatePeriod = () => {
  return (
    <ContentWithTitle title="Create period ">
      <div className="grid grid-cols-12  gap-4 ">
        <div className="col-span-12 md:col-span-6 lg:col-span-9"></div>
      </div>
    </ContentWithTitle>
  );
};

export default CreatePeriod;
