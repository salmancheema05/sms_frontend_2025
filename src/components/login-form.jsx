import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorShow from "./custom/errorShow";
import { useUserLoginDataMutation } from "@/services/userAuth";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserInformation } from "@/redux/userAuth";
import { InputWithValidate } from "./custom/inputs";
import { AuthCard } from "./custom/cards";
import DefaultButton from "./custom/button";
const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
export function LoginForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userLoginData] = useUserLoginDataMutation();
  const userLogin = async (formData) => {
    try {
      const res = await userLoginData(formData).unwrap();
      const decoded = jwtDecode(res.message);
      const userData = {
        school_id: decoded.school_id,
        role_id: decoded.role_id,
        user_id: decoded.user_id,
        gender_name: decoded.gender_name,
        school_name: decoded.school_name,
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        role_name: decoded.role_name,
        token: res.message,
        refreshToken: res.refreshToken,
      };
      dispatch(setUserInformation(userData));
      navigate("/");
    } catch (err) {
      console.error("login error", err);
      if (err?.data?.error) {
        alert(err?.data?.message);
      }
    }
  };
  return (
    <AuthCard title="Pak Smart Edu">
      <form onSubmit={handleSubmit(userLogin)}>
        <div className="grid gap-6">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <InputWithValidate
                label="Email"
                type="email"
                {...register("email")}
                placeholder="m@example.com"
              />
              {errors.email && <ErrorShow error={errors.email.message} />}
            </div>
            <div className="grid gap-3">
              <InputWithValidate
                label="Password"
                type="password"
                {...register("password")}
                placeholder="Password"
              />
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
              {errors.password && <ErrorShow error={errors.password.message} />}
            </div>
            <DefaultButton type="submit" variant="default" label="Login" />
          </div>
          <div className="text-center text-sm mt-5">
            Don&apos;t have an account?
            <Link
              to="/school-registor"
              className="underline underline-offset-4 ml-2"
            >
              School Register
            </Link>
          </div>
        </div>
      </form>
    </AuthCard>
  );
}
