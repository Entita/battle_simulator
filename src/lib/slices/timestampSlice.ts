import { TimestampsState } from "@/types/controls";
import { createSlice } from "@reduxjs/toolkit";

export const getNewTimestamp = () => new Date().getTime()

const initialState: TimestampsState = {
  value: [{ state: 'paused', timestamp: getNewTimestamp() }],
  state: 'paused',
};

const timestampSlice = createSlice({
  name: "timestamps",
  initialState,
  reducers: {
    setTimestamps: (state, action) => {
      state.value = action.payload.value
      state.state = action.payload.state
    },
    // addTimestamp: (state, action) => {
    //   state.value.push(action.payload)
    // },
    // changeTimestampState: (state, action) => {
    //   state.state = action.payload
    // },
    // clearTimestamps: (state) => {
    //   state.value = initialState.value
    //   state.state = initialState.state
    // },
  },
});

export const { setTimestamps } = timestampSlice.actions;
export default timestampSlice.reducer;