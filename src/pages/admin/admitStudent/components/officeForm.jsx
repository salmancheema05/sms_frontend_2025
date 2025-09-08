import React, { useState } from "react";
import ContentWithTitle from "@/components/custom/div";
import {
  DefaultDatepicker,
  DefaultInput,
  SelectBoxWithValidate,
} from "@/components/custom/inputs";
const OfficeForm = () => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [session, setSession] = useState([
    { id: 1, name: "Boy" },
    { id: 2, name: "Girl" },
  ]);
  const [classes, setclasses] = useState([
    { id: 1, name: "Grade-1" },
    { id: 2, name: "Grade-2" },
    { id: 3, name: "Grade-3" },
  ]);
  return (
    <>
      <ContentWithTitle title="Office Work">
        <form action="">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <SelectBoxWithValidate label="Choose Class" options={classes} />
            </div>
            <div className="col-span-1">
              <SelectBoxWithValidate label="Choose Session" options={session} />
            </div>
            <div className="col-span-1">
              <div className="mt-0">
                <DefaultDatepicker label="Admission Date" />
              </div>
            </div>
            <div className="col-span-1">
              <DefaultInput label="Admission Fee" placeholder="Admission Fee" />
            </div>
            <div className="col-span-1">
              <DefaultInput label="Security Fee" placeholder="Security Fee" />
            </div>
            <div className="col-span-1">
              <DefaultInput
                label="Admission Form Number"
                placeholder="Admission Form Number"
              />
            </div>
          </div>
        </form>
      </ContentWithTitle>
    </>
  );
};

export default OfficeForm;
