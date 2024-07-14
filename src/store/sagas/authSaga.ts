import { call, put, takeLatest } from "redux-saga/effects";
import { login, loginSuccess, loginFailure, register, registerSuccess, registerFailure } from "../slices/auth";
import { PayloadAction } from "@reduxjs/toolkit";

// Обработчик для логина
function* handleLogin(action: PayloadAction<{ username: string; password: string }>) {
  try {
    const response = yield call(fetch, "http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    });

    if (response.ok) {
      const data = yield response.json();
      yield put(loginSuccess({ token: data.token, username: action.payload.username }));
    } else {
      const errorData = yield response.json();
      yield put(loginFailure(errorData.message));
    }
  } catch (error) {
    yield put(loginFailure("Network error"));
  }
}

// Обработчик для регистрации
function* handleRegister(action: PayloadAction<{ username: string; password: string }>) {
  try {
    const response = yield call(fetch, "http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    });

    if (response.ok) {
      const data = yield response.json();
      yield put(registerSuccess({ token: data.token, username: action.payload.username }));
    } else {
      const errorData = yield response.json();
      yield put(registerFailure(errorData.message));
    }
  } catch (error) {
    yield put(registerFailure("Network error"));
  }
}

// Главная сага
function* authSaga() {
  yield takeLatest(login.type, handleLogin);
  yield takeLatest(register.type, handleRegister);
}

export default authSaga;