import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};
const levelSlice = createSlice({
  name: "fatchAllLevel",
  initialState,
  reducers: {
    setLevel(state, action) {
      state.list = action.payload;
    },
  },
});
export const { setLevel } = levelSlice.actions;
export default levelSlice.reducer;
