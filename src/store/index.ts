import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import authSaga from "./sagas/authSaga";
import gameReducer from "./slices/game";
import playerReducer from "./slices/player";
import authReducer from "./slices/auth";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    games: gameReducer,
    players: playerReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(authSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;