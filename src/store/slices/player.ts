import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "players",
  initialState: [],
  reducers: {
    setPlayers: (state, action) => action.payload,
  },
});

export const { setPlayers } = playerSlice.actions;
export default playerSlice.reducer;
