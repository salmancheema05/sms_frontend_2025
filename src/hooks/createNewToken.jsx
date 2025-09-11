import { setUserInformation } from "@/redux/userAuth";
import { useCreateNewTokenapiMutation } from "@/services/userAuth";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
const useCreateToken = () => {
  const [createNewTokenapi] = useCreateNewTokenapiMutation();
  const dispatch = useDispatch();
  const createNewToken = async ({ refreshToken, token }) => {
    try {
      const result = await createNewTokenapi({
        refreshToken: refreshToken,
        token: token,
      });

      const decoded = jwtDecode(result.data.message);

      const userData = {
        school_id: decoded.school_id,
        role_id: decoded.role_id,
        user_id: decoded.user_id,
        gender_name: decoded.gender_name,
        school_name: decoded.school_name,
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        role_name: decoded.role_name,
        token: result.data.message,
        refreshToken: result.data.refreshToken,
      };
      dispatch(setUserInformation(userData));
      return result;
    } catch (err) {
      console.error("Error in createNewToken:", err);
      throw err; // Rethrow to handle errors in the caller
    }
  };
  return { createNewToken };
};
export default useCreateToken;
