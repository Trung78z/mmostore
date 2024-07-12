import SidebarPost from "@/components/posts/SidebarPost";
import { API_URL } from "@/configs/api";
import React from "react";

async function getData() {
  const response = await fetch(API_URL + "/categories/postShares", {
    cache: "no-cache",
  });

  return response.json();
}

export default async function LayoutPost({ children }) {
  const Category = await getData();
  return (
    <div className="mx-auto w-full max-w-screen-xl pt-4">
      <div className="px-4">
        <h1>Kinh nghiệm MMO</h1>
        <p>
          Nơi chia sẻ kiến thức, kinh nghiệm, và trải nghiệm về kiếm tiền
          online.
        </p>
      </div>
      <div className="col-span-1 grid grid-flow-row md:grid-cols-4">
        <div className="static top-0 col-span-1 hidden md:block">
          <SidebarPost subCategory={Category} />
        </div>
        <div className="col-span-3"> {children}</div>
      </div>
    </div>
  );
}
