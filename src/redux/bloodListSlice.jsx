import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};
const bloodGroupListSlice = createSlice({
  name: "storeBloodList",
  initialState,
  reducers: {
    setBloodGroup(state, action) {
      state.list = action.payload;
    },
  },
});
export const { setBloodGroup } = bloodGroupListSlice.actions;
export default bloodGroupListSlice.reducer;
