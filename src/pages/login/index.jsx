import React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/login-form";
const Login = () => {
  return (
    <div className="dark:bg-[#1C2736] flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
