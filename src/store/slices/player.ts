import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../models";

export interface PlayersState {
  list: Player[];
  loading: boolean;
  error: string | null;
}

const initialState: PlayersState = {
  list: [],
  loading: false,
  error: null,
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    fetchPlayers(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPlayersSuccess(state, action: PayloadAction<Player[]>) {
      state.loading = false;
      state.list = action.payload;
    },
    fetchPlayersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPlayers, fetchPlayersSuccess, fetchPlayersFailure } = playersSlice.actions;
export default playersSlice.reducer;