"use client";

import { createContext, useEffect, useState } from "react";
import axios from "@/configs/api";

export const AuthContext = createContext("");

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    status: false,
    id: "",
    role: "",
    accountBalance: 0,
    fullName: "",
  });
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      const result = await axios.post("/user/refresh-token", null, {
        withCredentials: true,
      });

      if (result.data.success) {
        setAuthState({
          status: true,
          id: result.data.id,
          role: result.data.role,
          accountBalance: result.data.profile.accountBalance,
          fullName: result.data.profile.fullName,
        });
        sessionStorage.setItem("token", result.data.accessToken);
      } else {
        setAuthState({
          status: false,
          id: "",
          role: "",
          accountBalance: 0,
          fullName: "",
        });
      }
    } catch (error) {
      console.log(error);
      setAuthState({
        status: false,
        id: "",
        role: "",
        accountBalance: 0,
        fullName: "",
      });
    }
  };
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
