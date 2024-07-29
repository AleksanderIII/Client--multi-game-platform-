import React, { createContext, useContext, useRef } from "react";

interface WebSocketContextType {
  sendMessage: (message: any) => void;
  addMessageListener: (listener: (event: MessageEvent) => void) => void;
  removeMessageListener: (listener: (event: MessageEvent) => void) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const wsRef = useRef<WebSocket | null>(null);

  const connect = () => {
    const ws = new WebSocket("ws://localhost:5000"); // Adjust URL as per your WebSocket server
    wsRef.current = ws;

    const sendMessage = (message: any) => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(message));
      }
    };

    const addMessageListener = (listener: (event: MessageEvent) => void) => {
      if (wsRef.current) {
        wsRef.current.addEventListener("message", listener);
      }
    };

    const removeMessageListener = (listener: (event: MessageEvent) => void) => {
      if (wsRef.current) {
        wsRef.current.removeEventListener("message", listener);
      }
    };

    return {
      sendMessage,
      addMessageListener,
      removeMessageListener,
    };
  };

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        sendMessage: connect().sendMessage,
        addMessageListener: connect().addMessageListener,
        removeMessageListener: connect().removeMessageListener,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
