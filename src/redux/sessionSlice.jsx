import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};
const sessionSlice = createSlice({
  name: "fatchAllSession",
  initialState,
  reducers: {
    setSession(state, action) {
      state.list = action.payload;
    },
  },
});
export const { setSession } = sessionSlice.actions;
export default sessionSlice.reducer;
