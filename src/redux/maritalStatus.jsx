import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};
const MaritalStatusSlice = createSlice({
  name: "storeMaritalStatus",
  initialState,
  reducers: {
    setMaritalStatus(state, action) {
      state.list = action.payload;
    },
  },
});
export const { setMaritalStatus } = MaritalStatusSlice.actions;
export default MaritalStatusSlice.reducer;
