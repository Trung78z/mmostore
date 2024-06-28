"use client";
import SidebarGiaoDich from "@/components/Sidebar";
import React from "react";
import { IoMdMenu } from "react-icons/io";
import { BsChatDots } from "react-icons/bs";
import { Button } from "@headlessui/react";
import { toast } from "react-toastify";
export default function GiaoDichLayout({ children }) {
  function handleLogout() {
    toast("Đăng xuất thành công!");
  }
  return (
    <>
      <SidebarGiaoDich />
      <div className="ml-0 md:ml-60">
        <div className="card hidden items-center justify-end rounded-none py-3 md:flex">
          {/* <IoMdMenu className="h-8 w-8" /> */}
          <div className="flex items-center gap-x-4">
            <BsChatDots className="h-6 w-6" />
            <div className="flex items-center gap-x-2">
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <h5>Hoàng vương</h5>{" "}
              <Button className="px-2 py-0 text-sm" onClick={handleLogout}>
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
