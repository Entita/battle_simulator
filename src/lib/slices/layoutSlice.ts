import { LayoutState } from "@/types/layout";
import { createSlice } from "@reduxjs/toolkit";

const initialState: LayoutState = {
  menuBar: 'top',
  panels: 'right',
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    changeMenuBarPosition: (state, action) => {
      state.menuBar = action.payload
    },
    changePanelsPosition: (state, action) => {
      state.panels = action.payload
    },
    resetLayout: (state) => {
      state.menuBar = initialState.menuBar
      state.panels = initialState.panels
    },
  },
});

export const { changeMenuBarPosition, changePanelsPosition, resetLayout } = layoutSlice.actions;
export default layoutSlice.reducer;