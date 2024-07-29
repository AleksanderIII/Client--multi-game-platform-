import { put, takeLatest, call } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {
  fetchGamesFailure,
  fetchGamesStart,
  fetchGamesSuccess,
  removeGameStart,
  removeGameSuccess,
  removeGameFailure,
} from "../slices/game";
import GameService from "../../services/GameService/GameService";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchGamesWorker(gameService: GameService): SagaIterator {
  try {
    const games = yield call(() => gameService.fetchGames());
    yield put(fetchGamesSuccess(games));
  } catch (error) {
    yield put(fetchGamesFailure("Failed to fetch games."));
  }
}

function* removeGameWorker(
  action: PayloadAction<number>,
  gameService: GameService
): SagaIterator {
  try {
    yield call(() => gameService.deleteGame(action.payload));
    yield put(removeGameSuccess(action.payload));
  } catch (error) {
    yield put(removeGameFailure("Failed to delete game."));
  }
}

export function* gamesSaga(gameService: GameService): SagaIterator {
  yield takeLatest(fetchGamesStart.type, function* () {
    yield fetchGamesWorker(gameService);
  });
  yield takeLatest(
    removeGameStart.type,
    function* (action: PayloadAction<number>) {
      yield removeGameWorker(action, gameService);
    }
  );
}
