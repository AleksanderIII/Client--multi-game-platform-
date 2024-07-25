import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TicTacToeState {
  board: string[];
  currentPlayer: string | null;
  winner: string | null;
  gameStarted: boolean;
  gameId: string | null;
  playerSymbols: { [key: string]: string };
}

const initialState: TicTacToeState = {
  board: Array(15 * 15).fill(''),
  currentPlayer: null,
  winner: null,
  gameStarted: false,
  gameId: null,
  playerSymbols: {}
};

const ticTacToeSlice = createSlice({
  name: "ticTacToe",
  initialState,
  reducers: {
    startGame(state) {
      state.gameStarted = true;
    },
    setGameId(state, action: PayloadAction<string>) {
      state.gameId = action.payload;
    },
    updateBoard(state, action: PayloadAction<string[]>) {
      state.board = action.payload;
    },
    setCurrentPlayer(state, action: PayloadAction<string>) {
      state.currentPlayer = action.payload;
    },
    setWinner(state, action: PayloadAction<string | null>) {
      state.winner = action.payload;
    },
    setPlayerSymbols(state, action: PayloadAction<{ [key: string]: string }>) {
      state.playerSymbols = action.payload;
    },
    resetGame(state) {
      state.board = Array(15 * 15).fill('');
      state.currentPlayer = null;
      state.winner = null;
      state.gameStarted = false;
      state.playerSymbols = {};
    }
  }
});

export const {
  startGame,
  setGameId,
  updateBoard,
  setCurrentPlayer,
  setWinner,
  setPlayerSymbols,
  resetGame
} = ticTacToeSlice.actions;

export default ticTacToeSlice.reducer;