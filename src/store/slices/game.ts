import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../../models";

export interface GamesState {
  list: Game[];
  loading: boolean;
  error: string | null;
}

const initialState: GamesState = {
  list: [],
  loading: false,
  error: null,
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    fetchGamesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchGamesSuccess(state, action: PayloadAction<Game[]>) {
      state.loading = false;
      state.error = null;
      state.list = action.payload;
    },
    fetchGamesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchGamesStart, fetchGamesSuccess, fetchGamesFailure } = gamesSlice.actions;
export default gamesSlice.reducer;