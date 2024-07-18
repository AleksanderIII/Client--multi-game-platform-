import { call, put, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {
  login,
  loginSuccess,
  loginFailure,
  register,
  registerSuccess,
  registerFailure,
} from "../slices/auth";
import AuthService from "../../services/AuthService/AuthService";
import { PayloadAction } from "@reduxjs/toolkit";

function* handleLogin(authService: AuthService, action: PayloadAction<{ username: string; password: string }>): SagaIterator {
  try {
    const response = yield call([authService, authService.login], action.payload);
    yield put(loginSuccess({ username: action.payload.username }));
  } catch (error) {
    yield put(loginFailure("Failed to login"));
  }
}

function* handleRegister(authService: AuthService, action: PayloadAction<{ username: string; password: string }>): SagaIterator {
  try {
    const response = yield call(authService.register, action.payload);
    yield put(registerSuccess({ username: action.payload.username }));
  } catch (error) {
    yield put(registerFailure("Failed to register"));
  }
}

export function* authSaga(authService: AuthService): SagaIterator {
  yield takeLatest(login.type, function* (action) {
    yield handleLogin(authService, action);
  });
  yield takeLatest(register.type, function* (action) {
    yield handleRegister(authService, action);
  });
}