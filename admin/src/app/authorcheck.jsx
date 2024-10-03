"use client";
import { AuthContext } from "@/lib/hooks/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

export default function AuthCheck({ children }) {
  const { authState } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (authState.role !== "ADMIN") {
      router.push("/dang-nhap");
    } else {
      router.push("/kiem-duyet/san-pham");
    }
  }, [authState]);
  return <>{children}</>;
}
