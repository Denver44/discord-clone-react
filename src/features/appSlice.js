import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    channelId: null,
    channelName: null,
  },
  reducers: {
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
  },
});

export const { setChannelInfo } = appSlice.actions; // here we are importing the actions
export const selectChannelId = (state) => state.app.channelId; // selector help us to select the action login or logout.
export const selectChannelName = (state) => state.app.channelName; // selector help us to select the action login or logout.
export default appSlice.reducer;
