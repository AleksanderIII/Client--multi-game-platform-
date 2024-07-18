import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import authReducer from "./slices/auth";
import gameReducer from "./slices/game";
import playerReducer from "./slices/player";
import lobbyReducer from "./slices/lobby";

import authService from "../services/AuthService";
import gameService from "../services/GameService";
import playersService from "../services/PlayerService";

import { authSaga } from "./sagas/authSaga";
import { gamesSaga } from "./sagas/gamesSaga";
import { playersSaga } from "./sagas/playersSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    games: gameReducer,
    players: playerReducer,
    lobby: lobbyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disable serializableCheck as needed
    }).concat(sagaMiddleware),
});

// Запуск всех саг
sagaMiddleware.run(authSaga, authService);
sagaMiddleware.run(gamesSaga, gameService);
sagaMiddleware.run(playersSaga, playersService);

// Явное указание типов RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store as typeof store & {
  dispatch: AppDispatch;
};