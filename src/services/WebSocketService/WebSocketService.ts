import { Message } from "./types";

export default class WebSocketService {
  private ws: WebSocket | null = null;

  connect(
    url: string,
    onMessage: (message: Message) => void,
    onClose?: () => void,
    onError?: (error: Event) => void
  ) {
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log("WebSocket connected");
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    this.ws.onclose = () => {
      console.log("WebSocket connection closed");
      onClose && onClose();
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      onError && onError(error);
    };
  }

  send(message: Message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not open");
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}