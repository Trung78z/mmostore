"use client";
import { AuthContext } from "@/lib/hooks/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

export default function AuthCheck({ children }) {
  const { authState } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (authState.status === false || authState.role === "USER") {
      router.push("/");
    }
  }, [authState, router]);
  return <>{children}</>;
}
