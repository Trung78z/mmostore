"use client";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext("");

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    status: false,
  });
  useEffect(() => {
    const sta = localStorage.getItem("accessToken");
    if (sta === "1") {
      setAuthState({ status: true });
    } else {
      setAuthState({ status: false });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
