import { setBloodGroup } from "@/redux/bloodListSlice";
import { setGender } from "@/redux/genderSlice";
import { setLevel } from "@/redux/level";
import { setMaritalStatus } from "@/redux/maritalStatus";
import { setSession } from "@/redux/sessionSlice";
import { setUserInformation } from "@/redux/userAuth";
import { useDispatch } from "react-redux";

const useAuth = () => {
  const dispatch = useDispatch();
  const userAuthSliceUpdated = async () => {
    try {
      const userData = {
        school_id: "",
        role_id: "",
        user_id: "",
        gender_name: "",
        school_name: "",
        first_name: "",
        last_name: "",
        role_name: "",
        token: "",
        refreshToken: "",
      };
      dispatch(setUserInformation(userData));
      dispatch(setGender([]));
      dispatch(setSession([]));
      dispatch(setBloodGroup([]));
      dispatch(setMaritalStatus([]));
      dispatch(setLevel([]));
    } catch (err) {
      console.error("user Auth updated hook ", err);
    }
  };
  return { userAuthSliceUpdated };
};
export default useAuth;
