import SidebarGiaoDich from "@/components/quan-li-cua-hang/Sidebar";
import React from "react";
import { IoMdMenu } from "react-icons/io";
import { BsChatDots } from "react-icons/bs";
import Image from "next/image";
export default function GiaoDichLayout({ children }) {
  return (
    <>
      <SidebarGiaoDich />
      <div className="ml-0 md:ml-60">
        <div className="card hidden items-center justify-between rounded-none py-3 md:flex">
          <IoMdMenu className="h-8 w-8" />
          <div className="flex items-center gap-x-4">
            <BsChatDots className="h-6 w-6" />
            <div className="flex items-center gap-x-2">
              <Image
                height={8}
                width={8}
                className="inline-block rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <h5>Hoàng vương</h5>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
