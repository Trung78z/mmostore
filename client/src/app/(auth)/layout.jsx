"use client";

import { AuthContext } from "@/lib/hooks/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function AuthLayoutPage({ children }) {
  const { authState } = useContext(AuthContext);
  const router = useRouter();
  if (authState.status) {
    router.push("/");
  }

  return <div>{children}</div>;
}
