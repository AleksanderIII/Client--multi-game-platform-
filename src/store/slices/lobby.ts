import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LobbyState {
  players: string[];
  selectedOpponent: string | null;
  personalLobbyId: string | null;
  isPlayerReady: boolean;
  gameReady: boolean;
}

const initialState: LobbyState = {
  players: [],
  selectedOpponent: null,
  personalLobbyId: null,
  isPlayerReady: false,
  gameReady: false,
};

const lobbySlice = createSlice({
  name: "lobby",
  initialState,
  reducers: {
    setPlayers(state, action: PayloadAction<string[]>) {
      state.players = action.payload;
    },
    setSelectedOpponent(state, action: PayloadAction<string | null>) {
      state.selectedOpponent = action.payload;
    },
    startPersonalLobby(state, action: PayloadAction<string>) {
      state.personalLobbyId = action.payload;
    },
    setPlayerReady(state, action: PayloadAction<string>) {
      if (state.players.includes(action.payload)) {
        state.isPlayerReady = true;
      }
    },
    startGame(state) {
      state.gameReady = true;
    },
    playerJoined(state, action: PayloadAction<string>) {
      if (!state.players.includes(action.payload)) {
        state.players.push(action.payload);
      }
    },
    playerLeft(state, action: PayloadAction<string>) {
      state.players = state.players.filter(
        (player) => player !== action.payload
      );
    },
  },
});

export const {
  setPlayers,
  setSelectedOpponent,
  startPersonalLobby,
  setPlayerReady,
  startGame,
  playerJoined,
  playerLeft,
} = lobbySlice.actions;
export default lobbySlice.reducer;