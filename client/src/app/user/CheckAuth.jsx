"use client";
import { AuthContext } from "@/lib/hooks/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
export default function CheckAuth({ children }) {
  const router = useRouter();
  const { authState } = useContext(AuthContext);
  useEffect(() => {
    const shouldRedirect = true;

    if (!authState.status) {
      router.push("/"); // Replace "/target-page" with your actual target page
    }
  }, [router, authState]);
  return <div>{children}</div>;
}
