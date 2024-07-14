import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "games",
  initialState: [],
  reducers: {
    setGames: (state, action) => action.payload,
  },
});

export const { setGames } = gameSlice.actions;
export default gameSlice.reducer;
