import { put, takeLatest, call } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {
  fetchGamesFailure,
  fetchGamesStart,
  fetchGamesSuccess,
} from "../slices/game";
import GameService from "../../services/GameService/GameService";

function* fetchGamesWorker(gameService: GameService): SagaIterator {
  try {
    const games = yield call(() => gameService.fetchGames());
    yield put(fetchGamesSuccess(games));
  } catch (error) {
    yield put(fetchGamesFailure("Failed to fetch games."));
  }
}

export function* gamesSaga(gameService: GameService): SagaIterator {
  yield takeLatest(fetchGamesStart.type, function* () {
    yield fetchGamesWorker(gameService);
  });
}