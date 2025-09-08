import DefaultButton from "@/components/custom/button";
import { AuthCard } from "@/components/custom/cards";
import {
  InputWithValidate,
  SelectBoxWithValidate,
} from "@/components/custom/inputs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SchoolRegistor = () => {
  const genderArray = useSelector((state) => state.genderList);
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center  gap-6 p-6 md:p-10">
      <div className="flex w-[60%] flex-col gap-6">
        <AuthCard title="Pak Smart Edu" className="w-full">
          <form action="">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-1">
                <InputWithValidate
                  label="First Name"
                  placeholder="First Name"
                />
              </div>
              <div className="col-span-1">
                <InputWithValidate label="Last Name" placeholder="Last Name" />
              </div>
              <div className="col-span-1">
                <InputWithValidate label="Email" placeholder="Email" />
              </div>
              <div className="col-span-1">
                <InputWithValidate label="Password" placeholder="Password" />
              </div>
              <div className="col-span-1">
                <InputWithValidate
                  label="School Name"
                  placeholder="School Name"
                />
              </div>
              <div className="col-span-1">
                <InputWithValidate
                  label="Phone Number"
                  placeholder="Phone Number"
                />
              </div>
              <div className="col-span-2">
                <InputWithValidate label="Adress" placeholder="Address" />
              </div>
              <div className="col-span-1">
                <SelectBoxWithValidate
                  label="Select Gender"
                  options={genderArray.list}
                />
              </div>
              <div className="col-span-1">
                <SelectBoxWithValidate
                  label="Who are you"
                  options={genderArray.list}
                />
              </div>
              <div className="col-span-2 mt-5">
                <DefaultButton type="submit" variant="default" label="Submit" />
              </div>
            </div>
            <div className="text-center text-sm mt-5">
              Don&apos;t have an account?
              <Link to="/login" className="underline underline-offset-4 ml-2">
                Login
              </Link>
            </div>
          </form>
        </AuthCard>
      </div>
    </div>
  );
};

export default SchoolRegistor;
