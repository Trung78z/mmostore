import React from "react";
export const metadata = {
  title: "Doanh mục",
};
export default function DoanhmucLayout({ children }) {
  return (
    <>
      <div className="mx-auto max-w-screen-2xl">{children}</div>
    </>
  );
}
