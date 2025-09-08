import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
const userAuth = createSlice({
  name: "userAuth2",
  initialState,
  reducers: {
    setUserInformation(state, action) {
      state.school_id = action.payload.school_id;
      state.role_id = action.payload.role_id;
      state.user_id = action.payload.user_id;
      state.gender_name = action.payload.gender_name;
      state.school_name = action.payload.school_name;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.role_name = action.payload.role_name;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});
export const { setUserInformation } = userAuth.actions;
export default userAuth.reducer;
