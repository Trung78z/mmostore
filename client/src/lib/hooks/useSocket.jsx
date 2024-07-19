// useSocket.js
"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useContext } from "react";
import { AuthContext } from "./AuthContext"; // Thay đổi đường dẫn nếu cần

const useSocket = (slug) => {
  const { authState } = useContext(AuthContext);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:8080", { path: "/chat" }); // Thay đổi URL nếu cần

    const onConnect = () => {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name || "N/A");

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });

      socket.on("chatMessage", (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      socket.emit("joinRoom", { roomId: slug, userId: authState.id });
    };

    const onDisconnect = () => {
      setIsConnected(false);
      setTransport("N/A");
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, [slug, authState.id]);

  return { isConnected, transport, messages };
};

export default useSocket;
