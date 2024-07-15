import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  username: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  username: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.username = action.payload;
    },
    clearAuthenticated(state) {
      state.isAuthenticated = false;
      state.username = null;
    },
    login(state, action: PayloadAction<{ username: string; password: string }>) {
      // Saga will handle this
    },
    loginSuccess(state, action: PayloadAction<{ username: string }>) {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isAuthenticated = false;
      state.username = null;
      state.error = action.payload;
    },
    register(state, action: PayloadAction<{ username: string; password: string }>) {
      // Saga will handle this
    },
    registerSuccess(state, action: PayloadAction<{ username: string }>) {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.error = null;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.isAuthenticated = false;
      state.username = null;
      state.error = action.payload;
    },
  },
});

export const {
  setAuthenticated,
  clearAuthenticated,
  login,
  loginSuccess,
  loginFailure,
  register,
  registerSuccess,
  registerFailure,
} = authSlice.actions;

export default authSlice.reducer;