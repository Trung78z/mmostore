import SidebarPost from "@/components/posts/SidebarPost";
import React from "react";
const subCategory = [
  {
    title: "Facebook",
    values: [{ title: "Hello" }],
    length: 5,
  },
  {
    title: "Nội dung khác",
    values: [{ title: "Hello" }],
    length: 33,
  },
  {
    title: "Tiktok",
    values: [{ title: "Hello" }],
    length: 31,
  },
  {
    title: "Telegram",
    values: [{ title: "Hello" }],
    length: 10,
  },
  {
    title: "Marketing",
    values: [{ title: "Hello" }],
    length: 8,
  },
  {
    title: "TapHoaMMO",
    values: [{ title: "Hello" }],
    length: 5,
  },
  {
    title: "Youtube",
    values: [{ title: "Hello" }],
    length: 1,
  },
  {
    title: "Zalo",
    values: [{ title: "Hello" }],
    length: 1,
  },
];
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
