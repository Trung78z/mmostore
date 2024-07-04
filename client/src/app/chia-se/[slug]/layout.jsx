import SidebarPost from "@/components/posts/SidebarPost";
import { subCategory } from "@/lib/data/post";
import React from "react";

export default function LayoutPost({ children }) {
  return (
    <div className="mx-auto w-full max-w-screen-xl p-4">
      <div className="col-span-1 grid grid-flow-row md:grid-cols-4">
        <div className="col-span-3"> {children}</div>
        <div className="static top-0 col-span-1 hidden md:block">
          <SidebarPost subCategory={subCategory} />
        </div>
      </div>
    </div>
  );
}
