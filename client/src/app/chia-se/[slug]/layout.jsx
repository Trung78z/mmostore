import SidebarPost from "@/components/posts/SidebarPost";
import { API_URL } from "@/configs/api";
import { subCategory } from "@/lib/data/post";
import React from "react";
async function getData() {
  const response = await fetch(API_URL + "/categories/postShares");
  return response.json();
}

export default async function LayoutPost({ children }) {
  const Category = await getData();
  return (
    <div className="mx-auto w-full max-w-screen-xl p-4">
      <div className="col-span-1 grid grid-flow-row md:grid-cols-4">
        <div className="col-span-3"> {children}</div>
        <div className="static top-0 col-span-1 hidden md:block">
          <SidebarPost subCategory={Category} />
        </div>
      </div>
    </div>
  );
}
