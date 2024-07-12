import React from "react";
export const metadata = {
  title: "Doanh mục",
};
export default function DoanhmucLayout({ children }) {
  return <div className="max-w-screen-3xl mx-auto">{children}</div>;
}
