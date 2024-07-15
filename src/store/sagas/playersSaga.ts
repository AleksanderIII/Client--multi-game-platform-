import { call, put, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {
  fetchPlayers,
  fetchPlayersFailure,
  fetchPlayersSuccess,
} from "../slices/player";
import PlayersService from "../../services/PlayerService/PlayerService";

function* handleFetchPlayers(playersService: PlayersService): SagaIterator {
  try {
    const players = yield call(() => playersService.fetchPlayers());
    yield put(fetchPlayersSuccess(players));
  } catch (error) {
    yield put(fetchPlayersFailure("Failed to fetch players"));
  }
}

export function* playersSaga(playersService: PlayersService): SagaIterator {
  yield takeLatest(fetchPlayers.type, function* () {
    yield handleFetchPlayers(playersService);
  });
}