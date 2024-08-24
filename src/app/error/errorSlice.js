import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    message: null,
  },
  reducers: {
    setErrorInfo: (state, action) => {
      state.message = action.payload;
    },
    removeErrorInfo: (state) => {
      state.message = null;
    },
  },
});

export const { setErrorInfo, removeErrorInfo } = errorSlice.actions;
export default errorSlice.reducer;

export const selectErrorMessage = (state) => state.error.message;
