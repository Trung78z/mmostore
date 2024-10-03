// socketContext.js
"use client";
import { API_URL } from "@/configs/api";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthProvider";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { authState } = useAuthContext();
  const socketRef = useRef(null);

  useEffect(() => {
    if (authState.status) {
      if (!socketRef.current) {
        socketRef.current = io(API_URL, {
          path: "/chat",
          query: { userId: authState.id },
        });
        setSocket(socketRef.current);

        return () => {
          socketRef.current.disconnect();
          socketRef.current = null;
        };
      } else {
        socketRef.current.io.opts.query = { userId: authState.id };
      }
    } else {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    }
  }, [authState.id, authState.status]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
