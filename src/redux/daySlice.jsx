import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};
const daySlice = createSlice({
  name: "fatchAllDay",
  initialState,
  reducers: {
    setDay(state, action) {
      state.list = action.payload;
    },
  },
});
export const { setDay } = daySlice.actions;
export default daySlice.reducer;
