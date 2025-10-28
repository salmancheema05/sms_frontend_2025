import React, { useState, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export const DefaultInput = ({ label, ...rest }) => {
  return (
    <>
      <div className="flex mt-2">
        <Label htmlFor={label} className="text-input-label-color">
          {label}
        </Label>
      </div>
      <div className="mt-2">
        <Input id={label} {...rest} className="h-11" />
      </div>
    </>
  );
};
export const InputWithValidate = ({ label, ...rest }) => {
  return (
    <>
      <div className="flex">
        <Label htmlFor={label} className="text-input-label-color">
          {label}
        </Label>
        <span className="ml-1 mt-1  text-bold text-red-500">*</span>
      </div>
      <div className="">
        <Input id={label} {...rest} className="h-11" />
      </div>
    </>
  );
};
export const DefaultDatepicker = ({ label, value, onChange }) => {
  const [date, setDate] = useState();
  return (
    <>
      <Popover>
        <div className="flex mb-1">
          <label className="block text-sm font-medium px-1 text-input-label-color">
            {label}
          </label>
          <span className="text-red-600">*</span>
        </div>
        <PopoverTrigger asChild className="py-5">
          <Button
            variant="outline"
            data-empty={!value}
            className="w-full data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
          >
            <CalendarIcon />
            {value && !isNaN(new Date(value)) ? (
              format(new Date(value), "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={(date) => onChange(date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
export const DefaultSelectBox = ({ label, options, ...rest }) => {
  return (
    <Select {...rest}>
      <div className="flex">
        <label className="block text-sm font-medium px-1 text-gray-400 mb-2.5">
          {label}
        </label>
      </div>
      <SelectTrigger className="w-full py-5 text-gray-400">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options?.map((item, index) => {
            const keys = Object.keys(item);
            const valueKey = keys[0];
            const labelKey = keys[1];

            return (
              <SelectItem
                key={item[valueKey] || index}
                value={String(item[valueKey])}
                className="text-gray-400"
              >
                {item[labelKey]}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
// export const MultiSelectBox = ({ label, options, ...rest }) => {
//   const multiSelectRef = useRef(null);
//   const selectAll = () => {
//     if (multiSelectRef.current) {
//       multiSelectRef.current.selectAll();
//     }
//   };

//   const clearAll = () => {
//     if (multiSelectRef.current) {
//       multiSelectRef.current.clearAll();
//     }
//   };

//   const focusInput = () => {
//     if (multiSelectRef.current) {
//       multiSelectRef.current.focus();
//     }
//   };

//   const selectSpecific = () => {
//     if (multiSelectRef.current) {
//       multiSelectRef.current.setValue(["react", "vue"]);
//     }
//   };
//   return (
//     <div className="space-y-4">
//       <MultiSelect
//         ref={multiSelectRef}
//         options={options}
//         onValueChange={(value) => console.log("Value changed:", value)}
//         placeholder="Controlled via ref methods"
//       />

//       <div className="flex flex-wrap gap-2">
//         <Button onClick={selectAll} size="sm">
//           Select All
//         </Button>
//         <Button onClick={clearAll} size="sm" variant="outline">
//           Clear All
//         </Button>
//         <Button onClick={focusInput} size="sm" variant="outline">
//           Focus Input
//         </Button>
//         <Button onClick={selectSpecific} size="sm" variant="secondary">
//           Select React & Vue
//         </Button>
//       </div>
//     </div>
//   );
// };
export const SelectBoxWithValidate = ({ label, options, ...rest }) => {
  return (
    <Select {...rest}>
      <div className="flex">
        <label className="block text-sm font-medium px-1 text-input-label-color mb-2.5">
          {label}
        </label>
        <span className="text-red-600">*</span>
      </div>
      <SelectTrigger className="w-full py-5 text-gray-400">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options?.map((item, index) => {
            const keys = Object.keys(item);
            const valueKey = keys[0];
            const labelKey = keys[1];

            return (
              <SelectItem
                key={item[valueKey] || index}
                value={String(item[valueKey])}
                className="text-gray-400"
              >
                {item[labelKey]}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const UploadButton = ({
  label = "Upload File",
  accept = "*", // e.g. "image/*,.pdf"
  onChange,
  setFileName,
  setPreview,
}) => {
  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      console.log("path", file);
      setFileName(file.name);
      setPreview(url);
      onChange(file);
    }
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      <label className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 cursor-pointer">
        {label}
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </div>
  );
};
