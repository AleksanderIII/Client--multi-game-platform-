import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  username: localStorage.getItem('username'),
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<{ token: string, username: string }>) {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.username);
    },
    clearToken(state) {
      state.token = null;
      state.username = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
    login(state, action: PayloadAction<{ username: string; password: string }>) {
      // Saga will handle this
    },
    loginSuccess(state, action: PayloadAction<{ token: string, username: string }>) {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.username);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.token = null;
      state.username = null;
      state.isAuthenticated = false;
      state.error = action.payload;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
    register(state, action: PayloadAction<{ username: string; password: string }>) {
      // Saga will handle this
    },
    registerSuccess(state, action: PayloadAction<{ token: string, username: string }>) {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.username);
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.token = null;
      state.username = null;
      state.isAuthenticated = false;
      state.error = action.payload;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
  },
});

export const { setToken, clearToken, login, loginSuccess, loginFailure, register, registerSuccess, registerFailure } = authSlice.actions;
export default authSlice.reducer;