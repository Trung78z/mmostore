"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "@/configs/api";

export const AuthContext = createContext("");
export const useAuthContext = () => {
  return useContext(AuthContext);
};
function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    status: false,
    id: null,
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
          id: 0,
          role: "",
          accountBalance: 0,
          fullName: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
