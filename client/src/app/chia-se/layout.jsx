import PostProvider from "@/lib/hooks/ContextPost";
import React from "react";
export const metadata = {
  title: "Chia sẻ",
};
export default function SharePost({ children }) {
  return (
    <div>
      <PostProvider>{children}</PostProvider>
    </div>
  );
}
