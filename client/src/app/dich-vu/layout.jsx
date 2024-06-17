import LeftDoanhMuc from "@/components/danh-muc/LeftDoanhMuc";
import React from "react";

export default function DoanhmucLayout({ children }) {
  return (
    <>
      <div className="grid max-w-screen-2xl grid-cols-1 py-4 lg:grid-cols-7">
        <div className="col-span-1 hidden lg:block">
          <LeftDoanhMuc />
        </div>
        <div className="col-span-1 lg:col-span-6">{children}</div>
      </div>
    </>
  );
}
