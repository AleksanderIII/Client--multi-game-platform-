import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Games from "./pages/Games/Games";
import Players from "./pages/Players/Players";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Game from "./pages/Game/Game";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import AppLayout from "./components/Layout/Layout";
import "./App.less";
import { WebSocketProvider } from "./context/WebSocketContext"; // импорт WebSocketProvider
import TicTacToe from "./pages/Game/TIcTacToe/TicTacToe";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const App: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <WebSocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="1" element={<TicTacToe player="sss" />} />
            <Route
              path="games"
              element={
                isAuthenticated ? (
                  <ErrorBoundary>
                    {" "}
                    <Games />
                  </ErrorBoundary>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="games/:id" element={<Game />} />
            <Route
              path="players"
              element={isAuthenticated ? <Players /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </WebSocketProvider>
  );
};

export default App;
