import { LogsState } from "@/types/log";
import { createSlice } from "@reduxjs/toolkit";

const initialState: LogsState = {
  value: []
};

const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    setLogs: (state, action) => {
      state.value = action.payload
    },
    // addLog: (state, action) => {
    //   state.value.push(action.payload)
    // },
    // clearLogs: (state) => {
    //   state.value = initialState.value
    // },
  },
});

export const { setLogs } = logSlice.actions;
export default logSlice.reducer;