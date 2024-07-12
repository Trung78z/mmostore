import { AuthContext } from "@/lib/hooks/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

export default function AuthCheck({ children }) {
  const { authState } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (authState.role !== "ADMIN") {
      router.push("/dang-nhap");
    }
  }, [authState]);
  return <>{children}</>;
}
