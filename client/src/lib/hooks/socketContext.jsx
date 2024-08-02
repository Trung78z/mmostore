// socketContext.js
"use client";
import { API_URL } from "@/configs/api";
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthProvider";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { authState } = useAuthContext();
  useEffect(() => {
    if (authState.status) {
      const newSocket = io(API_URL, {
        path: "/chat",
        query: { userId: authState.id },
      });
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    } else {
      if (socket) {
        socket.disconnect();
      }
      setSocket(null);
    }
  }, [authState.id, authState.status]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
