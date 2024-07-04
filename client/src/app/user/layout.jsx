import React from "react";
export const metadata = {
  title: "Quản lí bài viết",
};
export default function LayoutUser({ children }) {
  return <div className="mx-auto max-w-screen-xl py-4">{children}</div>;
}
