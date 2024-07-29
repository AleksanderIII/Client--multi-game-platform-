import { useEffect, useState } from "react";
import { Input, Button, List, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useWebSocket } from "../../context/WebSocketContext";
import { v4 as uuidv4 } from "uuid"; // Импортируем библиотеку для генерации уникальных идентификаторов

const { TextArea } = Input;

interface IMessage {
  id: string;
  text: string;
  player: string;
  time: string;
}

const Chat = ({
  player,
  id,
  game,
}: {
  game: string;
  player: string;
  id: string;
}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const { sendMessage, addMessageListener, removeMessageListener } =
    useWebSocket();

  useEffect(() => {
    sendMessage({
      type: "START_CHAT",
      game: decodeURIComponent(id || ""),
      player,
    });
  }, [id, player, sendMessage]);

  useEffect(() => {
    const handleChatUpdate = (message: MessageEvent) => {
      const data = JSON.parse(message.data);
      if (data.type === "NEW_MESSAGE") {
        setMessages((prevMessages) => {
          if (prevMessages.some((msg) => msg.id === data.message.id)) {
            return prevMessages;
          }
          return [...prevMessages, data.message];
        });
      }
    };

    addMessageListener(handleChatUpdate);

    return () => {
      removeMessageListener(handleChatUpdate);
    };
  }, [addMessageListener, removeMessageListener]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage: IMessage = {
        id: uuidv4(), // Генерация уникального id для сообщения
        text: message,
        player,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");

      sendMessage({
        type: "SEND_MESSAGE",
        message: newMessage,
        game,
      });
    }
  };

  return (
    <div style={{ marginTop: "20px", padding: "20px" }}>
      <div
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "4px",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
          marginBottom: "20px",
        }}
      >
        <List
          dataSource={messages}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>{item.player}</span>
                    <span style={{ fontSize: "12px", color: "grey" }}>
                      {item.time}
                    </span>
                  </div>
                }
                description={item.text}
              />
            </List.Item>
          )}
        />
      </div>
      <TextArea
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        style={{ marginBottom: "10px" }}
      />
      <Button type="primary" onClick={handleSendMessage} block>
        Send
      </Button>
    </div>
  );
};

export default Chat;
