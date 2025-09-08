import React from "react";
import { UploadButton } from "../inputs";
import User from "@/assets/user.png";
export const UploadAndPreview = ({
  Controller,
  control,
  label,
  setFileName,
  setPreview,
  preview,
}) => {
  return (
    <div className="flex">
      {preview != null ? (
        <img src={preview} className="h-50 w-70 rounded-2xl" />
      ) : (
        <img src={User} className="h-50 w-70  rounded-2xl" />
      )}
      <div className="flex items-center justify-center w-full">
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <UploadButton
              label={label}
              value={field.value}
              setFileName={setFileName}
              setPreview={setPreview}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </div>
  );
};
