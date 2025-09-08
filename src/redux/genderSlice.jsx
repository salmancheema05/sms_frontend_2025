import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};
const genderSlice = createSlice({
  name: "fatchAllGender",
  initialState,
  reducers: {
    setGender(state, action) {
      state.list = action.payload;
    },
  },
});
export const { setGender } = genderSlice.actions;
export default genderSlice.reducer;
